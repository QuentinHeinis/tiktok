import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import Logo from '@/utils/tiktik-logo.png'

const NavBar = () => {
    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-28 md:w-36'>
                    <Image src={Logo} alt="tiktik" />
                </div>
            </Link>
        </div>
    )
}

export default NavBar