'use client';

import { useGet } from '../contexts/ApiContext.jsx';

export function useFetchEntity(name, params) {
  const { data, isLoading,  mutate } = useGet(`/${name}?${params?.toString()}`);

  return {
    data,
    mutate,
    isLoading,
  };
}
