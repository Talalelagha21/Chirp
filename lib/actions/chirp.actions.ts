"use server";

import { connectToDB } from "../mongoose";
import Chirp from "../models/chirp.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createChirp({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const createdChirp = await Chirp.create({
      text,
      author,
      community: null,
    });

    //Update user model
    await User.findByIdAndUpdate(author, {
      $push: { chirps: createdChirp._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating Chirp: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //Calculate the number of posts to skip depending on what page we are on
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch the posts that have no parents(original posts)
  const postsQuery = Chirp.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      //this is populating the comments (children)
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Chirp.countDocuments({parentId: { $in: [null, undefined] }})
  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;
  
  return {posts, isNext}
}


export async function fetchChirpById(chirpId: string) {
  connectToDB();

  try{
    const chirp = await Chirp.findById(chirpId)
      .populate({
        path: 'author',
        model: User,
        select: "_id id name image"
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: "_id id name parentId image"
          },
          {
            path: 'children',
            model: Chirp,
            populate: {
              path: 'author',
              model: User,
              select: "_id id name parentId image"
            }
          }
        
        ]
      }).exec();

      return chirp
  }catch(error: any) {
    throw new Error(`Error fetching chirp: ${error.message}`)

  }
}

export async function addCommentToChirp(
  chirpId: string, 
  commentText: string, 
  userId: string, 
  path: string
  ) {
    connectToDB();

    try{ 
      //Find original chirp by its id
      const originalChirp = await Chirp.findById(chirpId);

      if(!originalChirp) {
        throw new Error("Chirp not found")
      }

      //Create new chirp with the comment text
      const commentChirp = new Chirp({
        text: commentText, 
        author: userId, 
        parentId: chirpId
      })

      //save new chirp
      const savedCommentChirp = await commentChirp.save();

      //update the original chirp to include the new comment
      originalChirp.children.push(savedCommentChirp._id);

      //Save the original chirp
      await originalChirp.save();

      revalidatePath(path)

    } catch(error: any) {
      throw new Error(`Error adding comment to chirp: ${error.message}`)
    }
}