"use client";
import { useState } from "react";
import { useCreateTweet } from "../Hooks/tweet";
import { useCurrentUser } from "../Hooks/user";
import { IoMdCloudUpload } from "react-icons/io";
import Image from "next/image";
import { uploadImage } from "@/Utilities/upload";
import { setDefaultHighWaterMark } from "stream";
import toast from "react-hot-toast";

const CreatePost=()=>{
    const {data}=useCurrentUser();
    const {mutate}=useCreateTweet();
    const [imageLoading,setImageLoading]=useState(false);

    const handleImageClick=()=>{
        const input=document.createElement("input");
        input.setAttribute("type","file");
        input.setAttribute("accept","image/*");
        input.addEventListener("change",async(e:any)=>{
            console.log(e.target.files);
            setImageLoading(true);
            const url=await uploadImage(e.target.files[0]);
            if(!url){
                 return toast.error("Errpr uploading the image");
            }
            setImageLoading(false);
            setTweetData({
                ...tweetData,
                imageUrl:url

            })
        })
        input.click();
    }
    const [tweetData,setTweetData]=useState({
        content:"",
        imageUrl:""

    })

    const handleCreateTweet=async()=>{
        mutate({
            content:tweetData.content,
            imageUrl:tweetData.imageUrl
        })
        setTweetData({
             content:"",
        imageUrl:""

        })

    }

    return(
        <div>
            <div className="min-h-[120px] grid grid-cols-12 gap-2 p-2 m-2 border-b-[1.5px] border-gray-400">
                <div className="col-span-1">
                    {
                        data && <Image src={data?.profileImage!} alt="profile-image" width={50} height={50} className="rounded-full"/>
                    }


                </div>
                <div className="col-span-10">
                    <textarea rows={4} className=" w-full bg-transparent p-2 min-h-[50px]" placeholder="What happening???" value={tweetData.content} onChange={(e)=>{
                         setTweetData({
                            ...tweetData,
                            content:e.target.value
                         })

                    }}/>
                    <div className="flex justify-between items-center">
                    <IoMdCloudUpload className="text-2xl cursor-pointer" onClick={handleImageClick} />
                    <div className="flex">
                    {
                        tweetData.imageUrl && <Image src={tweetData.imageUrl} alt="profile-imasge" width={200}   height={200}/>
                    }
                    </div>
                  {
                    !imageLoading &&   <button className="bg-blue-400 rounded-full px-2 h-[30px]" onClick={handleCreateTweet}>Tweet</button>
                  }
                    </div>
                    

                   

                </div>

            </div>

        </div>
    )
    
}
export default CreatePost;