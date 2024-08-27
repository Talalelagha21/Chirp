"use client"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form" //
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';


import { CommentValidation } from '@/lib/validations/chirp';
import { addCommentToChirp } from '@/lib/actions/chirp.actions';
//import { createChirp } from '@/lib/actions/chirp.actions';


interface Props {
  chirpId: string,
  currentUserImg: string,
  currentUserId: string
}



const Comment = ({ chirpId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname()


  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      chirp: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToChirp(chirpId, values.chirp, JSON.parse(currentUserId), pathname);

    form.reset();
   
  }


  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important;"
      >
        <FormField
          control={form.control}
          name="chirp"
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image src={currentUserImg} alt="Profile picture" width={48} height={48} className='rounded-full object-cover'/>
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type="text"
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full !important'>Reply</Button>
      </form>
    </Form>
  )
}

export default Comment