import {
  addSortByToParamToUrl,
  getQueryParamFromUrl
} from '@/app/lib/queryParams';

import { AccessAndRefreshTokens } from './types/token.interface';
import { User } from './types';
import { auth } from '@/auth';
import omitBy from 'lodash/omitBy';
import { routes } from './Routes';

export type RegionPaginatedParams = {
  pageSize?: number;
  artRegionPageKey?: string;
  writingRegionPageKey?: string;
  pageNo?: number;
  status?: string;
};
export type PaginatedParams = {
  pageSize?: number;
  pageKey?: string;

  pageNo?: number;
  limit?: number;
  page?: number;
};

export type PaginationPureResponse = {
  limit?: number;
  page?: string;
  totalPages?: number;
  search?: string;
  totalResults?: number;
  filters?: any;
};

export type PaginatedResponse<T> = PaginationPureResponse & {
  results: T[];
};

export const filterQueryParams = (filters: any) => {
  if (filters?.sortBy) {
    addSortByToParamToUrl(filters?.sortBy); // addQueryParamToUrl()
  } else {
    const sortBy = getQueryParamFromUrl('sortBy');
    if (sortBy) {
      filters.sortBy = sortBy;
    }
  }
  return {
    ...omitBy(filters, (value) => !value || value == undefined)
  };
};

export const paginatedQueryParams = ({
  limit,
  page,
  search,
  filters
}: PaginationPureResponse) => {
  if (filters?.sortBy) {
    addSortByToParamToUrl(filters?.sortBy); // addQueryParamToUrl()
  } else {
    const sortBy = getQueryParamFromUrl('sortBy');
    if (sortBy) {
      filters.sortBy = sortBy;
    }
  }
  return {
    ...{ limit: `${limit ?? 10}` },
    ...{ page: `${page ?? 1}` },
    ...(search ? { search: `${encodeURIComponent(search)}` } : {}),
    ...omitBy(filters, (value) => !value || value == undefined)
  };
};

export const call = async <T>(options: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  query?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  public?: boolean;
  formData?: FormData;
  defaultHeaderType?: string;
  noHeaders?: boolean;
}): Promise<T | null> => {
  const headers = new Headers();
  if (!options?.noHeaders) {
    headers.append(
      'Content-Type',
      options?.defaultHeaderType ?? 'application/json'
    );
  }

  try {
    
    if (!options.public) {

      // const isImpersonated = localStorage.getItem('isImpersonated');
      // const loggedInUser = localStorage.getItem('loggedInUser');
      // if (isImpersonated) {
      //   headers.append('x-impersonated', 'true');
      // }
      // if (loggedInUser) {
      //   const user = JSON.parse(loggedInUser) as unknown as User & {id:string;};
      //   headers.append('x-impersonated-by', user?.id);
      // }
      let accessToken = '';
      try {

        const tokens = await auth() as unknown as {accessToken:string};

            accessToken = tokens?.accessToken;
      } catch (e) {
        console.log(e, 'eeeeeee');
        // localStorage.clear();
        throw new Error('SOMETHING WENT WRONG WHILE FETCHING REFRESH TOKEN');
      }
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const method = options.method ?? 'GET';

    const url = `${process.env.API_URL}/${options.path}${
      options.query ? `?${new URLSearchParams(options.query).toString()}` : ''
    }`;


    const body = options.data ? JSON.stringify(options.data) : undefined;

    const res = await fetch(url, {
      mode: 'cors',
      method,
      headers,
      body: options?.formData ? options.formData : body
    });


    // if (res.status === 204) {
    //   return null;
    // }
    // if (
    //   res.status === 401 &&
    //   options.path !== 'v1/self' &&
    //   !window.location.href.includes('sign-in')
    // ) {
    //   localStorage.clear();
    //   window.location.href = routes.auth.login;
    // }

    console.log(res, "response is  here")

    const resData = await res?.json();
    console.log(resData, "response ishere")

    // Commenting this code because I believe error handling is performed  on backend now, unComment if anything breaks
    // if (res.status !== 200 && res.status !== 201) {
    //   const errorData = resData as { code?: string; message?: string };

    //   // Ideally the server should throw error codes so that we can output a localized
    //   // error message.  This isn't currently the case.
    //   if (errorData.message !== undefined) throw new Error(errorData.message);
    //   if (errorData.code !== undefined) throw new Error(errorData.code);
    //   throw new Error(`ERR_${res.status}`);
    // }

    return resData ?? null;
  } catch (err:any) {
    console.log(err, "error is here");
    // Auth.currentSession throws undefined errors when calling Auth.currentSession when not authenticated...
    // if (err === undefined)
      return {
        status: 400,
        message: err.message
      } as any
      // throw new Error('ERR_UNKNOWN_ERROR_CALLING_ENDPOINT', err.message);

    throw err;
  }
};
