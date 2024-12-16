"use client";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import Main from "./Components/Main";
import TwitterLayout from "./Layout/TwitterLayout";
import { gclient } from "@/Client/graphql";
import { getJWTToken } from "@/GraphQl/user/query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter();

  const handleLogin2=async(credentialResponse:GoogleCredentialResponse)=>{
    console.log("response",credentialResponse.credential);
    const googleToken=credentialResponse.credential;
    if(!googleToken){
        toast.error("Problem with the GoogleToken...")
        return;
    }
    const data=await gclient.request(getJWTToken,{token:googleToken});
    if(!data.getJwtToken){
        toast.error("Problem extracting the data....")
        return;
    }
    window.localStorage.setItem("twitter-p-token",data.getJwtToken);
    toast.success("Logined in successfully....");
    router.push("/");

  

}


  if(!window?.localStorage.getItem("twitter-p-token")){
        return <div className="w-full h-screen flex justify-center items-center">
        <GoogleLogin onSuccess={handleLogin2} />
      </div>

  }
  return (

    
   
    

<TwitterLayout>
  <Main/>
  </TwitterLayout>

    

    

   
  );
}
