import { cookies } from "next/headers";
import { ClientServerData } from "@/components/init/ClientServerData";

export default function InitServerData() {
  const cookieStore = cookies();
  const isAuth = cookieStore.has("token");

  return <ClientServerData isAuth={isAuth} />;
}
