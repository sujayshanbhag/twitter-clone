import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo, useState } from "react";
import Image from 'next/image'
import { BiEnvelope, BiHash, BiHomeCircle, BiUserPlus } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import {FaFeatherAlt} from 'react-icons/fa'
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuVerified } from "react-icons/lu";
import { PiBookmarkSimple } from "react-icons/pi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import Link from "next/link";

interface TwitterLayoutProps {
    children: React.ReactNode
}
interface TwitterSidebarButton {
    title : string;
    icon : React.ReactNode;
    link : string;
}
  

const TwitterLayout : React.FC<TwitterLayoutProps> = (props) => {
    const {user} = useCurrentUser();
    const queryClient = useQueryClient(); 

    const sidebarMenuItems: TwitterSidebarButton[] = useMemo(() => 
    [
      {
        title : 'Home',
        icon : <BiHomeCircle />,
        link : "/"
      },
      {
        title : 'Explore',
        icon : <BiHash/>,
        link : "/"
      },
      {
        title : 'Notifications',
        icon : <IoMdNotificationsOutline/>,
        link : "/"
      },
      {
        title : 'Messages',
        icon : <BiEnvelope/>,
        link : "/"
      },
      {
        title : 'Twitter Blue',
        icon : <LuVerified/>,
        link : "/"
      },
      {
        title : 'Bookmarks',
        icon : <PiBookmarkSimple/>,
        link : "/"
      },
      {
        title : 'Profile',
        icon : <FaRegUser/>,
        link : `/${user?.id}`
      },
      {
        title : 'More',
        icon : <CiCircleMore/>,
        link : "/"
      }
      
    ],[])

    const handleLoginWithGoogle = useCallback(
        async (cred : CredentialResponse) => {
        const googleToken = cred.credential
        if(!googleToken){
            return toast.error('Google token not found');
        }
      
        const {verifyGoogleToken} = 
        await graphqlClient.request(
            verifyUserGoogleTokenQuery,
            {token : googleToken});
    
        toast.success('Verified success');
        console.log('got token',googleToken);
        if(verifyGoogleToken){
            window.localStorage.setItem("__twitter_token",verifyGoogleToken);
            await queryClient.invalidateQueries(["current-user"]);
        }
    },[])

      
    return (
        <div className="overflow-hidden">
            <div className='grid grid-cols-12 h-screen w-screen px-0 lg:px-48'>
                <div className='col-span-2 md:col-span-3 pt-4 md:pr-2 flex text-center justify-center md:justify-end '>
                    <div>
                        <div className='h-fit w-fit hover:bg-gray-900 rounded-full cursor-pointer transition-all'>
                            <BsTwitter className='text-6xl p-3'/>
                        </div>
                        <div className='text-xl font-medium'>
                            <ul>
                            {sidebarMenuItems.map(item => 
                            <li 
                                key={item.title}>
                                <Link className='flex w-fit justify-start items-center gap-4 cursor-pointer hover:bg-gray-800 rounded-full px-4 py-2' 
                                 href={item.link}>
                                  <span className='text-3xl'>{item.icon}</span>
                                  <span className="hidden md:flex">{item.title}</span>
                                </Link>
                            </li>)}
                            </ul>
                            <button className='bg-sky-500  mt-2 rounded-full md:w-full cursor-pointer text-center'>
                                <div className="hidden md:flex justify-center px-4  py-2">Tweet</div>
                                <div className='mx-auto p-3 flex text-xl md:hidden' >
                                <FaFeatherAlt  />
                                </div>
                            </button>
                        </div>
                            {user ? ( 
                            <div className='absolute flex gap-1 hover:bg-gray-800 transition-all rounded-full bottom-3 p-2 '>
                            {user.profileImageURL && <Image className='rounded-full' src={user?.profileImageURL} alt="image" width={50} height={50} />}
                            <div className="hidden md:flex gap-1">
                            <h3 className='hidden lg:flex text-sm'>{user.firstName} {user.lastName}</h3>
                            <FiMoreHorizontal className='my-auto text-2xl '/>
                            </div>
                            </div>
                            ) :
                            <div className='absolute rounded-full flex hover:bg-gray-800 transition-all bottom-3 p-2'>
                              <div className="rounded-lg  w-10 border-white overflow-hidden" >
                                <GoogleLogin onSuccess={handleLoginWithGoogle} />
                              </div>
                            </div>
                            }
                    </div>
                </div>
                <div className='col-span-10 md:col-span-5 h-screen  no-scrollbar overflow-y-scroll border-r-[1px] border-l-[1px] border-gray-700'>
                {props.children}
                </div>
                <div className='col-span-0 md:col-span-3 no-scrollbar p-5'>
                { !user ? (
                  <div className='border p-5 bg-slate-900 rounded-lg w-fit'>
                      <h1 className='my-2 text-xl'>New to Twitter?</h1>
                      <GoogleLogin onSuccess={handleLoginWithGoogle} />
                  </div>
                  ) : 
                  <div className='border-slate-300 border-2 px-2 py-2 w-full bg-slate-800 rounded-lg'>
                    <h1 className='my-2 text-xl font-semibold'>Who to follow</h1>
                    {
                      user?.recommendedUsers?.map(el => 
                      <div key={el?.id}  >
                        <div className="flex items-center  py-2 gap-2">
                        {el?.profileImageURL &&
                          <Image className="rounded-full" src={el.profileImageURL} width={48} height={48} alt="image" />
                        }
                        <div>
                        <h3>{el?.firstName} {el?.lastName}</h3>
                        <Link href={`/${el?.id}`}>
                          <button className="bg-white text-black text-sm font-semibold px-2 py-[2px] rounded-full">View</button>
                        </Link>
                        </div>
                        </div>
                        </div>)
                    }
                  </div>
                  
                }
                </div>
            </div>
            </div>
    );
}
export default TwitterLayout;