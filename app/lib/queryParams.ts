'use client'

import { useRouter } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const setQueryParams = (key: string, value: string) => {
    // router.replace({
    //   query: { ...router.query, [key]: value }
    // });
  };

  return {
    setQueryParams
  };
};

export function addSortByToParamToUrl(sortBy: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('sortBy', sortBy);
  const newUrl = url.toString();

  // Update the URL without causing a page refresh
  window?.history?.pushState({ path: newUrl }, '', newUrl);
}

export const getQueryParamFromUrl = (paramKey: string): string | null => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const paramValue = urlSearchParams.get(paramKey);

  if (paramValue !== null) {
    return paramValue;
  } else {
    return null;
  }
};
