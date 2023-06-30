import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'
import useAuthStore from '@/store/authStore'
import { client } from '@/composable/client'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { topics } from '@/composable/constants'
import { BASE_URL } from '@/composable'

const Upload = () => {
    const [ isLoading, setisLoading ] = useState(false)
    const [ videoAsset, setVideoAsset ] = useState<SanityAssetDocument | undefined>()
    const [ caption, setCaption ] = useState('')
    const [ category, setCategory ] = useState(topics[ 0 ].name)
    const [ savingPost, setSavingPost ] = useState(false)

    const { userProfile }: { userProfile: any } = useAuthStore()
    const router = useRouter()

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[ 0 ]
        client.assets.upload('file', selectedFile, {
            contentType: selectedFile.type,
            filename: selectedFile.name,
        }).then((data) => {
            setVideoAsset(data)
            setisLoading(false)
        })
    }
    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true)
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category,
            }

            await axios.post(`${BASE_URL}/api/post`, document)
            router.push('/')
        }
    }
    return (
        <div className='flex w-full h-full'>
            <div className='bg-white rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>Upload Video</p>
                    <p className='text-gray-400 mt-1'>Post a video to your account</p>
                </div>
                <div className='flex items-center gap-20 flex-wrap'>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[256px] h-[460px] p-10 cursor-pointer hover:border-red-200 hover:bg-gray-100'>
                        {isLoading ? (
                            <p>Uploading....</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'></video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full text-gray-500 text-xs leading-8'>
                                            <div className='flex flex-col items-center justify-center mb-10'>
                                                <CloudArrowUpIcon className='h-14 fill-gray-300' />
                                                <p className='text-xl text-center text-gray-600 font-semibold leading-normal'>Upload video</p>
                                            </div>
                                            <p>MP4 or WebM or ogg</p>
                                            <p>720x1280 or higher</p>
                                            <p>Up to 10min</p>
                                            <p>Less than 2GB</p>
                                            <p className='bg-[#F51997] text-center mt-10 text-white rounded font-semibold text-base w-52 p-2'>
                                                Select File
                                            </p>
                                        </div>
                                        <input type="file" name='upload-video' className='w-0 h-0' onChange={uploadVideo} accept="video/mp4, video/ogg, video/webm" />
                                    </label>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-3 pb-10'>
                        <label className='font-medium'>Caption</label>
                        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="rounded outline-none border-2 border-gray-200 p-2" />
                        <label className='font-medium'>Choose a category</label>
                        <select onChange={(e) => setCategory(e.target.value)} className="outline-none border-2 border-gray-200 p-2 rounded bg-white  "   >
                            {topics.map((topic) => (
                                <option key={topic.name} className="outline-none capitalize bg-white text-gray-700 p-2 hover:bg-slate-300" value={topic.name}>{topic.name}</option>
                            ))}
                        </select>
                        <div className='flex gap-6 mt-10'>
                            <button onClick={() => { }} className="border-gray-300 border-2 font-medium p-2 rounded w-28 lg:w-44 outline-none">Discard</button>
                            <button onClick={handlePost} className="bg-[#F51997] text-white  font-medium p-2 rounded w-28 lg:w-44 outline-none">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload