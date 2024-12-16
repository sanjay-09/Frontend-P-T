import { Tweet } from "@/src/gql/graphql";
import Link from "next/link";
import Image from "next/image";

const TweetC=({tweet}:{tweet:Tweet})=>{



    return(
        <div className="min-h-[100px] grid grid-cols-12 border-b-[1.5px] border-gray-400 p-2 m-2">
            <div className="col-span-1">
               <Image src={tweet.author?.profileImage!} width={40} height={40} alt="profile-image" className="rounded-full" />

            </div>
            <div className="col-span-10">
                <h1 className="font-bold"><Link href={`/profile/${tweet.author?.id}`}>{tweet.author?.name}</Link></h1>
                <p>{tweet.content}</p>
               {tweet.imageUrl && <img src={tweet.imageUrl} alt="tweet-image" className="w-[100px] h-[100px]"/>}
                

            </div>
            

        </div>
    )
}
export default TweetC;