"use client";
import { useConfig } from "@/state/config";
import { useEffect } from "react";

export const ClientServerData = ({ isAuth }: { isAuth?: boolean }) => {
  const { setIsAuth } = useConfig();

  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  
  return null;
};
