import { User, UserWithTokens } from './app/lib/types';

import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { call } from './app/lib';
import { z } from 'zod';

async function getUser(data: {email: string, password: string}): Promise<UserWithTokens  | undefined> {
  try {
   
    const user =   await call<any>({
      method: 'POST',
      path:`v1/auth/emailLogin`,
      data,
      public: true
    });

    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request)  {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser({email, password});
            if (!user || !user?.tokens?.access?.token) return null;
            // const passwordsMatch = await bcrypt.compare(password, user.password);
 
             return {...user.user,      accessToken: user.tokens.access.token,
              refreshToken: user.tokens.refresh.token,};
          }
   
          return null;
  
      },
    }),
  ],



});