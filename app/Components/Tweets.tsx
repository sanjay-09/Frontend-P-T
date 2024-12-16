import { Tweet } from "@/src/gql/graphql";
import { useGetAllTweet } from "../Hooks/tweet";
import TweetC from "./Tweet";


const Tweets=()=>{
    const {tweets}=useGetAllTweet();
    return(
        <div>
            {
                tweets?.map((tweet:any,i)=>{
                    return <TweetC tweet={tweet} key={i}/>
                })
            }

        </div>
    )
}
export default Tweets;