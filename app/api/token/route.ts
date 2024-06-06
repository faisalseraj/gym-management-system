import type { NextApiRequest, NextApiResponse } from 'next'

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getToken } from 'next-auth/jwt';

type ResponseData = {
  message: string
}
 
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const tokens = await auth();
//   console.log(details, "details are here")
//     const token = await getToken({ req, secret: process.env.AUTH_SECRET as  string } as any);

// console.log( token, "token is heree")
  return NextResponse.json({ tokens})
}