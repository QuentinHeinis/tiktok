import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { Bars2Icon, HomeIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Discover from './Discover'
import SuggestedAccount from './SuggestedAccount'
import Footer from './Footer'


const SideBar = () => {
    const [ showSideBar, setShowSideBar ] = useState(true)

    const userProfile = false
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start font-semibold text-[#f51997] rounded-full'

    return (
        <div className=''>
            <div className="block xl:hidden m-2 ml-4 mt-3 text-xl " onClick={() => setShowSideBar((prev) => !prev)}>
                {showSideBar ? <XCircleIcon className='h-5 mx-auto' /> : <Bars2Icon className='h-10 mx-auto' />}
            </div>
            {showSideBar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                        <Link href='/'>
                            <div className={normalLink}>
                                <p className='flex items-center gap-3 text-xl'><HomeIcon className='h-8 mx-auto' /> <span className='hidden xl:block'>For you</span></p>
                            </div>
                        </Link>

                    </div>
                    {!userProfile && (
                        <div className='px-2 py-4 hidden xl:block'>
                            <p className='text-gray-400'>Log in to like and comment on videos</p>
                            <div className='pr-4'>
                                <GoogleLogin
                                    clientId=''
                                    render={(renderProps) => (
                                        <button className='bg-white text-lg text-[#f51997] border border-[#f51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#f51997] cursor-pointer'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}>
                                            Log in
                                        </button>
                                    )}
                                    onSuccess={() => { }}
                                    onFailure={() => { }}
                                    cookiePolicy='single_host_origin'
                                />
                            </div>
                        </div>
                    )}
                    <Discover />
                    <SuggestedAccount />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default SideBar