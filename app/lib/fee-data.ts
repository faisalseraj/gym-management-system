import { usePathname, useRouter } from 'next/navigation';

import {
  Revenue,
} from './definitions';
import { call } from '.';
import { getSession } from 'next-auth/react';
import { sql } from '@vercel/postgres';

export async function fetchFeeStatistics() {

  try {

    
 const statistics =   await call<any>({
      method: 'GET',
      path:`v1/fee/statistics`,
    });
return statistics
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    
  } catch (error) {
    console.error('Database Error:', error);
  }
}
