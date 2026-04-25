'use client';
import { useState, useEffect, useRef } from 'react';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void;
}

export const useFetch = <T>(fetchFn: () => Promise<{ data: T }>): UseFetchReturn<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  });

  const execute = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetchFnRef.current();
      setState({ data: res.data, isLoading: false, error: null });
    } catch (err) {
      setState({ data: null, isLoading: false, error: (err as Error).message });
    }
  };

  const executeRef = useRef(execute);
  useEffect(() => {
    executeRef.current = execute;
  });

  useEffect(() => {
    executeRef.current();
  }, []);

  const refetch = () => execute();

  return { ...state, refetch };
};
