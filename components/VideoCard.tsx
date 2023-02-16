import { Video } from '@/types'
import React, { useState, useRef, useEffect } from 'react'
import { NextPage } from 'next'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { SpeakerWaveIcon, SpeakerXMarkIcon, PlayIcon, PauseIcon, } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
interface IProps {
    post: Video
}
const VideoCard: NextPage<IProps> = ({ post }) => {
    const [ isHover, setIsHover ] = useState(false)
    const [ playing, setPlaying ] = useState(false)
    const [ isVideoMuted, setIsVideoMuted ] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)

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
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [ isVideoMuted ]);

    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                    <div className='md:w-16 md:h-16 h-10 w-10'>
                        <Link href="/">
                            <div className='overflow-hidden rounded-full'>
                                <Image width={62} height={62} className='object-cover' layout='responsive' src={post.postedBy.image} alt="Profile Photo" />
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <div className='flex'>
                                <p>{post.postedBy.userName}</p>
                                <CheckBadgeIcon className='h-5 fill-blue-400' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='lg:ml-20 flex gap-4 relative'>
                <div className='rounded-3xl' onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <Link href={`/detail/${post._id}`}>
                        <video src={post.video.asset.url} ref={videoRef} loop className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'>

                        </video>
                    </Link>
                    {isHover && (
                        <div className='absolute bottom-2 flex lg:w-[600px] w-[200px] px-5 justify-between'>
                            {playing ? (
                                <button onClick={onVideoPress}><PauseIcon className='h-6 lg:h-10' /></button>
                            ) : (
                                <button onClick={onVideoPress}><PlayIcon className='h-6 lg:h-10' /></button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => { setIsVideoMuted(false) }}><SpeakerXMarkIcon className='h-6 lg:h-10' /></button>
                            ) : (
                                <button onClick={() => { setIsVideoMuted(true) }}><SpeakerWaveIcon className='h-6 lg:h-10' /></button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default VideoCard