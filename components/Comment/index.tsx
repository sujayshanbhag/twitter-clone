import { Comments } from '@/gql/graphql'
import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/image'
interface CommentProps {
    data : Comments
}

const CommentCard : React.FC<CommentProps> = (props) => {
    const {data} = props;
    const [content,setContent]=useState('')
    return (
        <div className='grid grid-cols-10 gap-1 p-1  border-gray-700 hover:bg-slate-900 transition-all'>
            <div className='col-span-1 '>
                {data.author?.profileImageURL && 
                <Image className='rounded-full  mx-auto' src={data.author?.profileImageURL} alt="image" height={35} width={35}/>}
            </div>
            <div className='col-span-9'>
                <h5>
                    <Link className="text-slate-200" href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
                </h5>
                <p className='mt-1'>{data.content}</p>
                
            </div>
        </div>
    );
}
export default CommentCard;