import { gclient } from '@/Client/graphql'
import { createTweet } from '@/GraphQl/Tweet/mutation'
import { getAllTweets } from '@/GraphQl/Tweet/query'
import { CreateTweetData } from '@/src/gql/graphql'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import toast from 'react-hot-toast'
export const useCreateTweet=()=>{
    const query=useQueryClient();
    const mutation=useMutation({
        onMutate:()=>toast.loading("tweet is getting created",{id:"2"}),
        mutationFn:(payload:CreateTweetData)=>{
            return gclient.request(createTweet,{payload});
        },
        onSuccess:()=>
            {
                toast.success("tweet created successfully",{id:"2"});
                query.invalidateQueries({queryKey:["tweet-all"]})

            },
            onError:(err:any)=>{
                  console.log("err",err.response.errors[0].message);
                toast.error("cannot create the tweet before 10 seconds",{id:"2"});

            }
    })
    return mutation;
}
export const useGetAllTweet=()=>{
    const query=useQuery({
        queryKey:["tweet-all"],
        queryFn:()=>gclient.request(getAllTweets)
    })
    return {
        ...query,
        tweets:query.data?.getAllTweet

    }
}