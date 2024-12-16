"use client";
import { gclient } from '@/Client/graphql';
import { getJWTToken } from '@/GraphQl/user/query';
import { GoogleCredentialResponse, GoogleLogin,useGoogleLogin } from '@react-oauth/google'
import toast, { Toaster } from 'react-hot-toast';
import { useCurrentUser } from '../Hooks/user';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { followUser } from '@/GraphQl/user/mutation';
import { User } from '@/src/gql/graphql';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { DialogDemo } from '../Components/Dialog';
const TwitterLayout=({children}:{children:React.ReactNode})=>{
    const {data}=useCurrentUser();
    const router=useRouter();
    const queryClient=useQueryClient();

    const handlefollow=async(user:User)=>{
        try{
            const data=await gclient.request(followUser,{
                to:user.id!
            })
            toast.success(`followed ${user.name} `);
            await queryClient.invalidateQueries({queryKey:['current-user']});
            
    
    
        }
        catch(err){
    
        }
    
      }
    
   
    return(
        <div className="min-h-screen w-[100%] flex">
             <div className="sm:w-[30%] w-[8%] px-2 border-r-[0.5px] text-center border-gray-400 min-h-screen relative">
                 <h1 className='text-4xl font-extrabold font-[cursive] cursor-pointer' onClick={()=>{
                    console.log("clicked");
                    router.push("/");
                 }} ><FaSquareXTwitter className='sm:inline'/>
                   <span className="hidden sm:inline ml-2">Twitter</span>
                 </h1>
                {
                    data &&
                    <div className='absolute bottom-0 w-full  '>
                       <div className='sm:hidden block text-white'>
                        <DialogDemo/>

                       </div>
                        <div>
                        <div className='flex gap-2 justify-center items-center'>
                            <Image src={data.profileImage!} alt="profile-image" className='rounded-md' width={30} height={30} onClick={()=>{
                                router.push(`/profile/${data.id}`)
                            }} />
                            <h1 className='font-bold text-xl'>  <span className="hidden sm:inline ml-2">{data.name}</span></h1>
                        </div>

                        </div>
                       

                 </div>
                }
             </div>
             <div className="sm:w-[40%] w-[92%] border-r-[0.5px] border-gray-400 ">
                {children}

             </div>
             <div className="sm:w-[30%] hidden sm:block">
                <h1 className='px-2 text-2xl'>Recommended Users</h1>

                {
                    data && data.recommmendedUsers?.map((user)=>{
                        return (<div className='border-gray-800 min-h-[120px] w-[250px] flex p-2 items-center gap-2'>
                            <Image src={user?.profileImage!} alt="profileImage" width={30} height={30} className=' w-[50px] h-[50px] rounded-full' />
                           <div>
                           <p className='text-2xl' >{user?.name}</p>
                           <div className='flex gap-4 mt-2'>
                           <button className='bg-white text-black p-2 rounded-full' onClick={()=>{
                            router.push(`/profile/${user?.id}`)
                           }}>View</button>
                         
                           </div>
                           </div>
                               

                            </div>)
                    })
                }
             


             </div>


        </div>
    )
}
export default TwitterLayout;