'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import { getRuntimeConfig } from '../lib/runtime.config.js';
import { useToast } from './ToastContext.jsx';

import { isBackendDown } from '../lib/errors.js';

export function useHost() {
  return getRuntimeConfig().host;
}

const ApiContext = createContext(null);

export function useGet(path) {
  const toast = useToast();
  const { apiBaseUrl: BASE_URL } = getRuntimeConfig();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  const fetch_ = useCallback(async () => {
    if (!path) return null;

    setLocalLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL + path, {
        credentials: 'include',
        signal: AbortSignal.timeout(8000), // otherwise a hung backend never errors
      });

      if (!res.ok) {
        const responseData = await res.json().catch(() => ({}));
        setData(responseData);

        const err = new Error(
          responseData.message || `Request failed (${res.status})`,
        );
        err.status = res.status;
        err.data = responseData;
        throw err;
      }

      const responseData = await res.json();
      setData(responseData);
      setError(null);
      return responseData;
    } catch (err) {
      setError(err);
      console.error(err);

      // null = backend unreachable; otherwise return the server's response body
      return isBackendDown(err) ? null : (err.data ?? null);
    } finally {
      setLocalLoading(false);
    }
  }, [path, BASE_URL]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);

  return {
    data,
    error,
    isLoading: localLoading,
    mutate: fetch_,
  };
}

async function request(method, path, body, baseUrl) {
  const options = {
    method,
    credentials: 'include',
    headers: {},
  };

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
  }

  try {
    let res = await fetch(`${baseUrl}${path}`, options);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Request failed (${res.status})`);
    }
    if (res.status === 204) return null;
    return { ok: res.ok, status: res.status, ...(await res.json()) };
  } finally {
  }
}

export function ApiProvider({ baseUrl, children }) {
  const router = useRouter();
  const toast = useToast();

  const handle = useCallback(
    async (fn, options = {}) => {
      try {
        const data = await fn();
        if (options.success) options.success(data);
        if (options.redirect) {
          await router.push(options.redirect);
        }
        return data;
      } catch (err) {
        toast.error(err);
        console.error(err);
        return null;
      }
    },
    [router],
  );

  const post = useCallback(
    (path, body, options) =>
      handle(() => request('POST', path, body, baseUrl), options),
    [handle],
  );
  const patch = useCallback(
    (path, body, options) =>
      handle(() => request('PATCH', path, body, baseUrl), options),
    [handle],
  );
  const del = useCallback(
    (path, options) =>
      handle(() => request('DELETE', path, undefined, baseUrl), options),
    [handle],
  );

  const value = useMemo(() => ({ post, patch, del }), [post, patch, del]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi must be used inside <ApiProvider>');
  return ctx;
}
