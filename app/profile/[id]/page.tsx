"use client"
import ProfilePage from "@/app/Components/ProfilePage";

import TwitterLayout from "@/app/Layout/TwitterLayout";
import { gclient } from "@/Client/graphql";
import { getUserById } from "@/GraphQl/user/query";
import { User } from "@/src/gql/graphql";
import { useEffect, useState } from "react";

const Page=({params}:{params:{
    id:string
}})=>{
    
    const [data,setData]=useState<User|null>(null);
  


    useEffect(()=>{
        fetchData();

    },[]);
    const fetchData=async()=>{
try{
    
    console.log("fetchData---->");
    const data=await gclient.request(getUserById,{getUserByIdId:params.id});

    setData(data?.getUserById!);
}
catch(err){
    console.log("Error message",err);
}
    }
    
    return(
       <TwitterLayout>
       {data && <ProfilePage user={data} fetchData={fetchData}/>}
       </TwitterLayout>
    )
}
export default Page;


