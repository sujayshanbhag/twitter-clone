import TwitterLayout from '@/components/Layout/TwitterLayout';
import type {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router'
import Image from 'next/image';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { graphqlClient } from '@/clients/api';
import { getUserByIdQuery } from '@/graphql/queries/user';
import { Tweet, User } from '@/gql/graphql';
import FeedCard from '@/components/FeedCard';
import { useCurrentUser } from '@/hooks/user';
import { useCallback, useMemo } from 'react';
import { followUserMutation, unfollowUserMutation } from '@/graphql/mutations/user';
import { useQueryClient } from '@tanstack/react-query';

interface ServerProps {
    user? : User
}

const UserProfilePage : NextPage<ServerProps> = (props) => {
    const router = useRouter();
    const {user}= props;
    const {user : currentUser} = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if(!user) return false;
        return (
            (currentUser?.following?.findIndex(el => el?.id=== user?.id) ?? -1) >= 0
        );
    },[user,currentUser?.following])

    const handleFollowUser = useCallback(async () => {
        if(!user){
            return;
        }
        await graphqlClient.request(followUserMutation,{to : user.id});
        await queryClient.invalidateQueries(["current-user"]);
    },[]);

    const handleUnfollowUser = useCallback(async () => {
        if(!user){
            return;
        }
        await graphqlClient.request(unfollowUserMutation,{to : user.id});
        await queryClient.invalidateQueries(["current-user"]);
    },[]);

    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className='px-2 flex gap-4 border-b-[1px] border-slate-600 '>
                        <AiOutlineArrowLeft className='text-3xl' />
                        <div>
                        {user && <h2 className='text-xl font-bold'>{user.firstName} {user.lastName}</h2>}   
                        {user && user.tweets && <h4 className='text-sm text-slate-500'>{user.tweets.length} Tweets</h4>}  
                        </div>               
                    </nav>
                    <div className='border-b-[1px] border-slate-600 p-3'>
                        {user && user.profileImageURL &&
                        <Image className='rounded-full' src={user?.profileImageURL} height={100} width={100} alt='profile'/>}
                        {user && <h1 className='text-lg font-bold'>{user.firstName} {user.lastName}</h1>}
                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex gap-4  text-sm font-semibold text-gray-400'>
                                <span>{props.user?.followers?.length}  followers</span>
                                <span>{props.user?.following?.length}  following</span>
                            </div>
                            {currentUser?.id!=user?.id &&
                                <>
                                {
                                    amIFollowing?
                                    <button onClick={handleUnfollowUser} className='bg-white text-black text-sm px-2 py-1 rounded-full'>Unfollow</button> 
                                        :
                                        <button onClick={handleFollowUser} className='bg-white text-black text-sm px-2 py-1 rounded-full'>Follow</button>
                                }
                                </>
                            }
                        </div>
                    </div>
                    {
                        user?.tweets && user?.tweets.map(tweet => <FeedCard data={tweet as Tweet}/>)
                    }
                    
                </div>
            </TwitterLayout>
        </div>
    );
};

export const getServerSideProps : GetServerSideProps<ServerProps> = async(context) => {
    const id = context.query.id as string | undefined;
    if(!id) return {
        notFound: true,
        props: {user : undefined}
    };
    const userInfo = await graphqlClient.request(getUserByIdQuery,{id:id})
    if(!userInfo?.getUserById) return {
        notFound: true,
        props: {user : undefined}
    };
    return ({
        props : {
            user : userInfo.getUserById as User
        }
    });
}

export default UserProfilePage;