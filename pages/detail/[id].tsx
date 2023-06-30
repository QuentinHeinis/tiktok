import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { SpeakerWaveIcon, SpeakerXMarkIcon, PlayIcon, PauseIcon, } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { BASE_URL } from '@/composable'
import { Video } from '@/types'
import { postDetailQuery } from '@/composable/queries'
interface IProps {
    postDetails: Video
}
const Detail = ({ postDetails }: IProps) => {
    const [ post, setPost ] = useState(postDetails)
    const [ playing, setPlaying ] = useState(true)
    const [ isVideoMuted, setIsVideoMuted ] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const duration = videoRef.current?.duration
    const currentTime = videoRef.current?.currentTime
    const [ timeRemaining, setTimeRemaining ] = useState(0)

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play()
            setPlaying(true)
        }

    }
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            setInterval(() => {
                const remaining = (video.currentTime / video.duration) * 100
                setTimeRemaining(remaining);
            }, 100);
        }


    }, [])

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [ isVideoMuted ]);

    if (!post) return null
    return (
        <div className='flex w-full absolute top-0 left-0 bg-white flex-wrap lg:flex-nowrap'>
            <div className='relative flex-1 w-[1000px] lg:w-9/12 flex justify-center items-center bg-[#101010]'>
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50"><p className='text-white border-2 border-white rounded-full h-10 w-10 flex items-center justify-center'>X</p></div>
                <div className='relative '>
                    <div className='h-screen flex items-center'>
                        <video ref={videoRef} loop onClick={onVideoPress} autoPlay src={post.video.asset.url} className="w-full bg-black">

                        </video>

                    </div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        {!playing && (
                            <button onClick={onVideoPress}>
                                <PlayIcon className='h-16 lg:h-20 stroke-white fill-white cursor-pointer ' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='absolute bottom-5 lg:bottom-5 right-5 lg:right-10 cursor-pointer'>
                    {isVideoMuted ? (
                        <button onClick={() => { setIsVideoMuted(false) }}><SpeakerXMarkIcon className='h-10 lg:h-15 stroke-white' /></button>
                    ) : (
                        <button onClick={() => { setIsVideoMuted(true) }}><SpeakerWaveIcon className='h-10 lg:h-15 stroke-white' /></button>
                    )}
                </div>
            </div>
            <div className='w-[90%] absolute left-[5%]  bottom-2 rounded-full bg-gray-700 h-1'><div className='h-1 rounded-l-full bg-red-400' style={{ width: `${timeRemaining}%` }}></div></div>
        </div>
    )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)
    return {
        props: { postDetails: data }
    }
}

export default Detail