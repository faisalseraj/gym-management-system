import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(
    req: NextApiRequest
) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET as  string } as any);
// console.log(token, "token is here")
  return NextResponse.json({ token})
}