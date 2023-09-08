// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import cheerio from "cheerio";

type Data = {
data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await axios.get('https://trickcal.com/');
    const html = response.data;
    const $ = cheerio.load(html);

    const data = $('p.el.count').text();

    res.status(200).json({data});
  } catch (error) {
    console.error(error);
  }
}
