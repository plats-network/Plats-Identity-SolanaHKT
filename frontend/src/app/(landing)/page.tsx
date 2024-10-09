
import { cookies } from "next/headers";
import ProfileView from "@/components/ProfileView";
import Header from "@/components/shared/Header";
import HomePage from "@/app/(landing)/HomePage";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  
  return (
    <>
     {accessToken && <Header/>} 
      {accessToken ? (
        <ProfileView />
      ) : (
        <HomePage/>
      )}
    </>
  );
}
