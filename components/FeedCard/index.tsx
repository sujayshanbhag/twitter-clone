import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import {FaRegComment,FaRetweet} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {IoMdStats} from 'react-icons/io'
import {FiUpload} from 'react-icons/fi'
import { Comments, Tweet } from '@/gql/graphql'
import Link from 'next/link'
import CommentCard from '../Comment'
import { useCreateComment } from '@/hooks/tweet'
import { addLikeMutation, removeLikeMutation } from '@/graphql/mutations/tweet'
import { graphqlClient } from '@/clients/api'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useCurrentUser } from '@/hooks/user'

interface FeedCardProps {
    data : Tweet
}

const FeedCard : React.FC<FeedCardProps> = (props) => {
    const {data} = props;
    const [content,setContent]=useState('');
    const [box,showBox]=useState(false);
    const queryClient= useQueryClient();
    const {user} = useCurrentUser();

    const {mutateAsync} = useCreateComment();
    
    const handleCreateComment = useCallback(async ()=> {
        await mutateAsync({
            content,
            to: data.id
        });
        setContent("");
        showBox(!box);
    },[content,mutateAsync,data.id]);

    

    const handleCommentClick =() => {
        showBox(!box);
    }
    
    const handleTweetLike = useCallback(async () => {
        await graphqlClient.request(addLikeMutation,{to : data.id});
        await queryClient.invalidateQueries(["all-tweets"]);
        toast.success('Tweet Liked');
    },[queryClient]);

    const handleTweetUnlike = useCallback(async () => {
        await graphqlClient.request(removeLikeMutation,{to : data.id});
        await queryClient.invalidateQueries(["all-tweets"]);
        toast.success('Tweet Unliked');
    },[queryClient]);

    const handleLikeClicked = () => {
        if(data.likes?.find((like) =>{
            return like?.author?.id===user?.id; })){
                handleTweetUnlike();
        }
        else {
            handleTweetLike();
        }
    }

    return (
    <div className='grid grid-cols-8 gap-1 p-1 border border-l-0 -r-0 border-t-0 border-gray-700 hover:bg-slate-900 transition-all'>
        <div className='col-span-1 '>
            {data.author?.profileImageURL && 
            <Image className='rounded-full  mx-auto' src={data.author?.profileImageURL} alt="image" height={50} width={50}/>}
        </div>
        <div className='col-span-7'>
            <h5>
                <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
            </h5>
            <p className='mt-1 mb-2'>{data.content}</p>
            {
                data.imageURL &&
                <div className='border mx-auto my-2 w-4/6 rounded-lg flex justify-center'>
                    <Image src={data.imageURL} width={300} height={200} alt='image' />
                </div>
            }
            {
                data.comment && data.comment?.length!=0 && 
                <div>
                    <h4 className='font-semibold text-slate-400'>Comments</h4>
                    {data?.comment.map((comment) =>
                        comment ? <CommentCard key={comment?.id} data={comment as Comments} /> : null
                    )}
                </div>  
            }
            {
                box &&
                <div className='flex gap-1'>
                    <div className='w-4/5'>
                        <textarea name="comment" id="comment" rows={2}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        className="w-full bg-transparent text-sm resize-none outline-none no-scrollbar rounded-lg  pl-1 border border-slate-500"
                        placeholder="write comment.."></textarea>
                    </div>
                    <div className='w-1/5 flex items-center justify-center'>
                        <button onClick={handleCreateComment} className='bg-sky-500 py-1 px-2 rounded-full'>post</button>
                    </div>
                </div>
            }
            <div className='flex justify-between my-2 text-lg text-gray-500  pr-8'>
                <div className='hover:text-blue-500 flex gap-1' onClick={handleCommentClick}>
                    <FaRegComment  />
                    <h4 className='text-sm'>{data.comment?.length}</h4>
                </div>
                <div className='hover:text-green-500 '>
                    <FaRetweet />
                </div>
                <div onClick={handleLikeClicked} className='hover:text-pink-500 flex gap-1'>
                    <AiOutlineHeart />
                    <h4 className='text-sm'>{data.likes?.length}</h4>
                </div>
                <div className='hover:text-blue-500'>
                    <FiUpload />
                </div>
            </div>
        </div>
    </div>
    );
} ;
export default FeedCard;