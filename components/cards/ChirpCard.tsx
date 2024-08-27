import Link from "next/link"
import Image from "next/image"

interface Props {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string
    },
    community: {
        id: string,
        name: string,
        image: string
    } | null,
    createdAt: string,
    comments: {
        author: {
            image: string
        }
    }[]
    isComment?: boolean;
}

const ChirpCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}: Props) => {
    return (
        <article className={`flex w-full flex-col ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7 rounded-xl'} shadow-sm`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image
                                src={author.image}
                                alt="Profile Image"
                                fill
                                className="cursor-point rounded-full" />
                        </Link>

                        <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name} </h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2"> {content}</p>
                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                            <div className={`flex ${isComment ? 'gap-4' : 'gap-10'} `}>
                                <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain" />
                                <Link href={`/chirp/${id}`}>
                                    <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain" />
                                </Link>
                                <Image src="/assets/repost.svg" alt="reposts" width={24} height={24} className="cursor-pointer object-contain" />
                                <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain" />
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/chirp/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )

}

export default ChirpCard;