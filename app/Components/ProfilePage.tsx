"use client"
import Image from "next/image";
import { useCurrentUser } from "../Hooks/user";
import { FaArrowLeft } from "react-icons/fa";
import TweetC from "./Tweet";
import { Tweet, User } from "@/src/gql/graphql";
import { gclient } from "@/Client/graphql";
import { followUser, unfollowUser } from "@/GraphQl/user/mutation";
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';


const ProfilePage=({user,fetchData}:{user:User,fetchData:()=>void})=>{


    const queryClient=useQueryClient();

   
    const {data}=useCurrentUser();
    

    let followed=-1;
    if(data?.following?.length){

      

    
    for(let i=0;i<=data?.following?.length-1;i++){
        if(data?.following[i]?.id==user.id){
            followed=1;
        }


    }
}
  const handlefollow=async()=>{
    try{
        const data=await gclient.request(followUser,{
            to:user.id!
        })
        toast.success(`followed ${user.name} `);
        await queryClient.invalidateQueries({queryKey:['current-user']});
        fetchData();


    }
    catch(err){

    }

  }

  const handleUnfollow=async()=>{
    try{
        const data=await gclient.request(unfollowUser,{
            to:user.id!
        })
        toast.success(`Un-followed ${user.name} `)
        await queryClient.invalidateQueries({queryKey:['current-user']});
        fetchData();

    }
    catch(err){

    }

  }
   
    return(
        <div>
            <div className="min-h-[150px] border-b-[1.5px] p-2">
          <div className="flex gap-2 p-2 items-center">
          <FaArrowLeft className="text-xl" />
          {
           <h1 className="text-xl font-bold">{user.name}</h1>
          }

          </div>
         <div className="mt-2">
         {
         <><Image src={user?.profileImage!} alt="profile-image" className="rounded-full" width={100} height={100}/>
         <h3 className="font-bold">{user?.name}</h3>
         </>
        }
         </div>
         <div className="flex justify-between items-center">
         <div className="flex gap-4 mt-2">
            <span>{user?.follower?.length || 0} followers</span>
            <span>{user?.following?.length || 0 } following</span>
         </div>
         <div>
           {
          data?.id!==user.id &&  followed==1?<button className="rounded-full p-1 bg-white text-black" onClick={handleUnfollow}>Unfollow</button>:<button onClick={handlefollow} className="rounded-full p-1 bg-green-700">follow</button>
           }
         </div>
         </div>

            </div>
            {
                user?.tweets?.map((tweet:any,i)=>{
                    return <TweetC tweet={tweet} key={i}/>
                })
            }
    
            
        </div>
    )
}
export default ProfilePage;