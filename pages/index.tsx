import Image from 'next/image'
import { useCallback, useState } from 'react'
import { BsFillImageFill} from 'react-icons/bs'
import FeedCard from '@/components/FeedCard'
import toast from 'react-hot-toast'
import { graphqlClient } from '@/clients/api'
import { useCurrentUser } from '@/hooks/user'
import { useQueryClient } from '@tanstack/react-query'
import {useCreateTweet} from '@/hooks/tweet'
import { Tweet } from '@/gql/graphql'
import Twitterlayout from '@/components/Layout/TwitterLayout'
import { GetServerSideProps } from 'next'
import { getAllTweetsQuery, getSignedURLForTweetQuery } from '@/graphql/queries/tweet'
import axios from 'axios'


interface HomeProps {
  tweets? : Tweet[]
}

export default function Home(props :HomeProps) {

  const {user} = useCurrentUser();
  const {mutate} = useCreateTweet();
  const queryClient = useQueryClient();

  const [content,setContent]= useState('');
  const [imageURL, setImageURL] = useState("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery,{
        imageName: file.name,
        imageType: file.type
      })

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Completed", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleImageSelection = useCallback(() => {
    const input=document.createElement('input');
    console.log('image clicked');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*');

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  },[]);

  const handleCreateTweet = useCallback( ()=> {
    mutate({
      content,
      imageURL
    })
    setContent("");
    setImageURL("");
  },[content,mutate,imageURL]);

  

  return (
    <div>
      <Twitterlayout>
        <div className='border-b-2 border-slate-600'>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                  placeholder="What's happening?"
                  rows={3}
                ></textarea>
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2 flex justify-between items-center">
                  <BsFillImageFill onClick={handleImageSelection} className="text-xl text-sky-400" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Twitterlayout>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps<HomeProps> = async(context) => {
  const allTweets= await graphqlClient.request(getAllTweetsQuery);
  return {
    props : {
      tweets : allTweets.getAllTweets as Tweet[],
    }
  }
}
