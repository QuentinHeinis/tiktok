import axios from "axios"
import { NextPage } from "next"
import { Video } from "@/types"
import VideoCard from "@/components/VideoCard"
import NoResult from "@/components/NoResult"
import { BASE_URL } from "@/composable"

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)
  return (
    <>
      <div className='flex flex-col pr-6 gap-10 videos h-full snap-y snap-proximity'>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResult text={'No videos'} />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`)
  return {
    props: {
      videos: data
    }
  }
}

export default Home