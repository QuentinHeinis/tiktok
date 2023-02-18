import React from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useRouter } from 'next/router'
import Logo from '@/utils/tiktik-logo.png'
import { createOrGetUser } from '@/utils'
import useAuthStore from '@/store/authStore'
import { PlusIcon, } from '@heroicons/react/24/outline'
import { AiOutlineLogout } from 'react-icons/ai'
const NavBar = () => {
    const { userProfile, addUser, removeUser } = useAuthStore()
    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-28 md:w-36 flex font-bold text-2xl'>
                    {/* <Image src={Logo} alt="tiktik" layout='responsive' /> */}
                    <div className='first-letter:text-[#f51997]'>Tik</div><div className='first-letter:text-[#f51997]'>Tok</div>
                </div>
            </Link>
            <div>SEARCH</div>
            <div>
                {userProfile ? (
                    <div className='flex gap-5 md:gap-10 items-center'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 md:px-4 rounded-lg text-lg flex gap-2 items-center font-semibold'>
                                <PlusIcon className='h-6' />
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href="/">
                                <div className='overflow-hidden rounded-full w-12 h-12'>
                                    <Image width={62} height={62} layout='responsive' src={userProfile.image} alt="Profile Photo" />
                                </div>
                            </Link>
                        )}
                        <button type='button' className='text-2xl text-red-500' onClick={() => {
                            googleLogout()
                            removeUser()
                        }} >
                            <AiOutlineLogout />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response) => {
                            createOrGetUser(response, addUser)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }} />
                )}
            </div>
        </div>
    )
}

export default NavBar