import React from 'react'
import Image from 'next/image'
import {FaRegComment,FaRetweet} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {IoMdStats} from 'react-icons/io'
import {FiUpload} from 'react-icons/fi'
import { Tweet } from '@/gql/graphql'
import Link from 'next/link'

interface FeedCardProps {
    data : Tweet
}

const FeedCard : React.FC<FeedCardProps> = (props) => {
    const {data} = props
    return (
    <div className='grid grid-cols-8 p-1 border border-l-0 -r-0 border-t-0 border-gray-700 hover:bg-slate-900 transition-all'>
        <div className='col-span-1 '>
            {data.author?.profileImageURL && 
            <Image className='rounded-full p-1 mx-auto' src={data.author?.profileImageURL} alt="image" height={50} width={50}/>}
        </div>
        <div className='col-span-7'>
            <h5>
                <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
            </h5>
            <p>{data.content}</p>
            {
                data.imageURL &&
                <div className='border mx-auto my-2 w-4/6 rounded-lg flex justify-center'>
                    <Image src={data.imageURL} width={300} height={200} alt='image' />
                </div>
            }
            <div className='flex justify-between my-2 text-lg text-gray-500  pr-8'>
                <div className='hover:text-blue-500'>
                    <FaRegComment />
                </div>
                <div className='hover:text-green-500 '>
                    <FaRetweet />
                </div>
                <div className='hover:text-pink-500'>
                    <AiOutlineHeart />
                </div>
                <div className='hover:text-blue-500'>
                    <IoMdStats />
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