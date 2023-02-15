import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'

export default function App({ Component, pageProps }: AppProps) {
  const [ isSSR, setIsSSR ] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  if (isSSR) return null

  return (
    <div>
      <NavBar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <SideBar />
        </div>
        <div className='mt-4 flex flex-col overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}