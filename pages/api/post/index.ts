import { client } from '@/composable/client'
import { allPostsQuery } from '@/composable/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = allPostsQuery()
        const data = await client.fetch(query)
        res.status(200).json(data)
    }
    if (req.method === 'POST') {
        const document = req.body
        client.create(document)
            .then(() => res.status(201).json('Video created'))
    }
}
