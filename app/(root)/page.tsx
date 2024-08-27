"use server"

import ChirpCard from "@/components/cards/ChirpCard";
import { fetchPosts } from "@/lib/actions/chirp.actions";
import { currentUser } from "@clerk/nextjs";

 
export default async function Home() {
  const result = await fetchPosts(1, 30)
  const user = await currentUser()

  console.log(result)
  return (
    <>
    <h1 className='head-text mb-10'>Home</h1>
a
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length === 0 ? (
        <p className="text-center !text-base-regular text-light-3"> No Chirps found</p>
      ) : (
        <>
        
          {result.posts.map((post) => (
            <ChirpCard 
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ""} 
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              />
          ))}
        </>
      )

      }
    </section>
    </>
  )
}


