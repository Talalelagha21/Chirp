import { fetchUserPost } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'
import ChirpCard from '../cards/ChirpCard';


interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string
}

const ChirpsTab = async ({currentUserId, accountId, accountType}: Props) => {

  let result = await fetchUserPost(accountId);
  
  if(!result) redirect('/')

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.chirps.map((chirp: any)=>(
        <ChirpCard
        key={chirp._id}
        id={chirp._id}
        currentUserId={currentUserId}
        parentId={chirp.parentId}
        content={chirp.text}
        author={
          accountType === 'User'
            ? {name: result.name, image: result.image, id: result.id} : 
              {name: chirp.author.name, image: chirp.author.image, id: chirp.author.id }
        } 
        community={chirp.community}
        createdAt={chirp.createdAt}
        comments={chirp.children}
    />
      ))}

    </section>
  )
}

export default ChirpsTab