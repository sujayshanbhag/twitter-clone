import React from 'react'
import Image from 'next/image'
import {FaRegComment,FaRetweet} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {IoMdStats} from 'react-icons/io'
import {FiUpload} from 'react-icons/fi'

const FeedCard : React.FC = () => {
    return (
    <div className='grid grid-cols-8 p-1 border border-l-0 -r-0 border-t-0 border-gray-700 hover:bg-slate-900 transition-all'>
        <div className='col-span-1 '>
            <Image className='rounded-full p-1 mx-auto' src="https://avatars.githubusercontent.com/u/127194126?v=4" alt="image" height={50} width={50}/>
        </div>
        <div className='col-span-7'>
            <h5>Sujay Shanbhag</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eos hic veniam ad eum eligendi repellat eveniet
            </p>
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