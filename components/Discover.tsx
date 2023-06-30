import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from '@/composable/constants'

const Discover = () => {

    const router = useRouter()
    const { topic } = router.query
    const activeTopicStyle = "xl:border-2 bg-gray-50 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]"

    const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

    return (
        <div className='xl:border-b-2 border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Popular topics</p>
            <div className='flex gap-3 flex-wrap'>
                {topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                        <div className={topic == item.name ? activeTopicStyle : topicStyle}>
                            <span className='font-bold text-2xl xl:text-lg'>
                                {item.icon}
                            </span>
                            <span className='font-medium text-lg hidden xl:block'>
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover