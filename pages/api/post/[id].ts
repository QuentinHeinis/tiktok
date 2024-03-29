import { client } from '@/composable/client'
import { postDetailQuery } from '@/composable/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query
        const query = postDetailQuery(id)
        const data = await client.fetch(query)
        res.status(200).json(data[ 0 ])
    }
}
