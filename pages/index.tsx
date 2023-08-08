import Image from 'next/image'
import { useCallback, useState } from 'react'
import { BsFillImageFill, BsTwitter} from 'react-icons/bs'
import {BiHomeCircle,BiHash,BiEnvelope} from 'react-icons/bi'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {PiBookmarkSimple} from 'react-icons/pi'
import {FaRegUser} from 'react-icons/fa'
import {CiCircleMore} from 'react-icons/ci'
import {FiMoreHorizontal} from 'react-icons/fi'
import {LuVerified} from 'react-icons/lu'
import FeedCard from '@/components/FeedCard'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { graphqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/queries/user'
import { useCurrentUser } from '@/hooks/user'
import { useQueryClient } from '@tanstack/react-query'
import {useCreateTweet, useGetAllTweets} from '@/hooks/tweet'
import { Tweet } from '@/gql/graphql'


interface TwitterSidebarButton {
  title : string;
  icon : React.ReactNode;
}
const sidebarMenuItems : TwitterSidebarButton[]= [
  {
    title : 'Home',
    icon : <BiHomeCircle />
  },
  {
    title : 'Explore',
    icon : <BiHash/>
  },
  {
    title : 'Notifications',
    icon : <IoMdNotificationsOutline/>
  },
  {
    title : 'Messages',
    icon : <BiEnvelope/>
  },
  {
    title : 'Twitter Blue',
    icon : <LuVerified/>
  },
  {
    title : 'Bookmarks',
    icon : <PiBookmarkSimple/>
  },
  {
    title : 'Profile',
    icon : <FaRegUser/>
  },
  {
    title : 'More',
    icon : <CiCircleMore/>
  }
  
]

export default function Home() {

  const {user} = useCurrentUser();
  const {tweets= []} = useGetAllTweets();
  const {mutate} = useCreateTweet();
  const queryClient = useQueryClient();

  const [content,setContent]= useState('');

  const handleImageSelection = useCallback(() => {
    const input=document.createElement('input');
    console.log('image clicked');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*');
    input.click();
  },[]);

  const handleCreateTweet = useCallback( ()=> {
    mutate({
      content,
    })
  },[content,mutate]);

  const handleLoginWithGoogle = useCallback(
    async (cred : CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken){
      return toast.error('Google token not found');
    }
  
    const {verifyGoogleToken} = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      {token : googleToken});
    
      toast.success('Verified success');
      console.log('got token',verifyGoogleToken);
      if(verifyGoogleToken){
        window.localStorage.setItem("__twitter_token",verifyGoogleToken);

        await queryClient.invalidateQueries(["current-user"]);
      }
  },[])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>
        <div className='col-span-3 pt-4 px-4 '>
          <div className='h-fit w-fit hover:bg-gray-900 rounded-full cursor-pointer transition-all'>
            <BsTwitter className='text-6xl p-3'/>
          </div>
          <div className='text-xl font-medium'>
            <ul>
              {sidebarMenuItems.map(item => 
              <li className='flex w-fit justify-start items-center gap-4 cursor-pointer hover:bg-gray-800 rounded-full px-4 py-2' 
                key={item.title}>
                  <span className='text-3xl'>{item.icon}</span>
                  <span>{item.title}</span>
                </li>)}
            </ul>
            <button className='bg-sky-500 px-4 py-2 mt-2 rounded-full w-full cursor-pointer'>Tweet</button>
            {user && 
            <div className='absolute flex gap-4 hover:bg-gray-800 transition-all rounded-full bottom-3 p-2 '>
              {user.profileImageURL && <Image className='rounded-full' src={user?.profileImageURL} alt="image" width={50} height={50} />}
              <h3 className='text-sm'>{user.firstName} {user.lastName}</h3>
              <FiMoreHorizontal className='my-auto ml-4 text-2xl '/>
            </div>
            }
          </div>
        </div>
        <div className='col-span-6 h-screen  no-scrollbar overflow-y-scroll border-r-[1px] border-l-[1px] border-gray-700'>
        {user && 
        <div className='grid grid-cols-8 p-4 border border-l-0 -r-0 border-t-0 border-gray-700 hover:bg-slate-900 transition-all'>
          <div className='col-span-1 '>
              {user.profileImageURL &&
              <Image className='rounded-full p-1 mx-auto' src={user?.profileImageURL} alt="image" height={50} width={50}/>}
          </div>
          <div className='col-span-7'>
                <textarea className='w-full bg-transparent text-lg focus:outline-none px-3 resize-none no-scrollbar border-gray-600 border-b-[1px]' 
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={3} placeholder="What's happening" />
                <div className='mt-2 flex justify-between px-1'>
                  <BsFillImageFill onClick={handleImageSelection} className='text-xl text-sky-400 my-auto' />
                  <button onClick={handleCreateTweet}
                  className='bg-sky-500 rounded-full w-fit py-1 px-2 cursor-pointer'>Tweet</button>
                </div>
          </div>
        </div>}
        {
          tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
        }
        </div>
        <div className='col-span-3 p-5'>
          { !user && 
          <div className='border p-5 bg-slate-900 rounded-lg w-fit'>
            <h1 className='my-2 text-xl'>New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
          }
        </div>
      </div>
    </div>
  )
}
