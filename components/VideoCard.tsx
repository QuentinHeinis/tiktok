import { Video } from '@/types'
import React, { useState, useRef, useEffect } from 'react'
import { NextPage } from 'next'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { SpeakerWaveIcon, SpeakerXMarkIcon, PlayIcon, PauseIcon, } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
interface IProps {
    post: Video,
    play: boolean
}
const VideoCard: NextPage<IProps> = ({ post, play }) => {
    const [ isHover, setIsHover ] = useState(false)
    const [ playing, setPlaying ] = useState(false)
    const [ isVideoMuted, setIsVideoMuted ] = useState(false)
    const [ autoPlay, setAutoPlay ] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const duration = videoRef.current?.duration
    const currentTime = videoRef.current?.currentTime
    const [ timeRemaining, setTimeRemaining ] = useState(0)

    const onVideoPress = () => {
        if (playing) {
            console.log(duration, currentTime)
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
            }, 1000);
        }
        const observer = new IntersectionObserver(onIntersection, { threshold: 0.5 });

        if (video) {
            observer.observe(video);
        }

        return () => {
            if (video) {
                observer.unobserve(video);
            }
        };
    }, []);
    const onIntersection = (entries: any) => {
        entries.forEach((entry: any) => {

            if (entry.isIntersecting) {
                // start playing the video
                const video: any = videoRef.current;
                video.currentTime = 0;
                video.play();
                setPlaying(true)
            } else {
                // pause the video
                videoRef?.current?.pause();
                setPlaying(false)
            }
        });
    }

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
            play = isVideoMuted
        }
    }, [ isVideoMuted ]);

    return (
        <div className='flex flex-col h-[88vh] border-b-2 border-gray-200 pb-6 snap-center snap-always'>
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
            <div className='lg:ml-20 flex h-full gap-4 relative'>
                <div className='rounded-3xl h-full relative bg-red-300' onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
                    <Link href={`/detail/${post._id}`}>
                        <video src={post.video.asset.url} ref={videoRef} loop className='lg:w-[600px] h-[75vh] md:h-[400px] lg:h-[528px] w-full rounded-2xl cursor-pointer bg-black'>

                        </video>
                    </Link>
                    {isHover && (
                        <div className='absolute bottom-2 flex lg:w-[600px] w-full px-5 justify-between '>
                            <div className='w-[90%] absolute left-[5%] -bottom-2 rounded-full bg-gray-700 h-1'><div className='h-1 rounded-l-full bg-red-400' style={{ width: `${timeRemaining}%` }}></div></div>
                            {playing ? (
                                <button onClick={onVideoPress}><PauseIcon className='h-6 stroke-white lg:h-10' /></button>
                            ) : (
                                <button onClick={onVideoPress}><PlayIcon className='h-6 stroke-white lg:h-10' /></button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => { setIsVideoMuted(false) }}><SpeakerXMarkIcon className='h-6 stroke-white lg:h-10' /></button>
                            ) : (
                                <button onClick={() => { setIsVideoMuted(true) }}><SpeakerWaveIcon className='h-6 stroke-white lg:h-10' /></button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default VideoCard