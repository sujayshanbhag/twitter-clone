import Image from 'next/image'
import {BsTwitter} from 'react-icons/bs'
import {BiHomeCircle,BiHash,BiEnvelope} from 'react-icons/bi'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {PiBookmarkSimple} from 'react-icons/pi'
import {FaRegUser} from 'react-icons/fa'
import {CiCircleMore} from 'react-icons/ci'
import {LuVerified} from 'react-icons/lu'
import FeedCard from '@/components/FeedCard'



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
            <button className='bg-sky-500 px-4 py-2 mt-2 rounded-full w-full'>Tweet</button>
          </div>
        </div>
        <div className='col-span-6 h-screen  no-scrollbar overflow-y-scroll border-r-[1px] border-l-[1px] border-gray-500'>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className='col-span-3'></div>
      </div>
    </div>
  )
}
