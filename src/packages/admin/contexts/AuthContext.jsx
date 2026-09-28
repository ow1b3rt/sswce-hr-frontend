"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useApi, useGet } from "./ApiContext.jsx";
import { isBackendDown } from "../lib/errors.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isServiceDown, setIsServiceDown] = useState(false);

  const { data, error, isLoading, mutate } = useGet("/auth/me");

  const { post } = useApi();
  const router = useRouter();


  useEffect(() => {
    if (isLoading) return;

    if (error) {
      setUser(null);

      if (isBackendDown(error)) {
        setIsServiceDown(true);
      } else {
        setIsServiceDown(false);
        router.replace("/admin/login");
      }
      return;
    }

    if (!data) return;

    setIsServiceDown(false);

    if (!data.success) {
      setUser(null);
      router.replace("/admin/login");
      return;
    }

    setUser(data.user);
  }, [data, error, isLoading, router]);


  const checkAuth = async () => {
    const result = await mutate();

    if (!result) {
      setUser(null);
      setIsServiceDown(true);

      return false;
    }

    setIsServiceDown(false);

    if (!result.success) {
      setUser(null);
      router.replace("/admin/login");

      return true;
    }

    setUser(result.user);

    return true;
  };

  const logout = async () => {
    const res = await post("/auth/logout");

    if (res?.success) {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isServiceDown,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
