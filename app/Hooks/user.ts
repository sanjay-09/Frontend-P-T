import { gclient } from '@/Client/graphql';
import { getCurrentUser, getUserById } from '@/GraphQl/user/query';
import { graphql } from '@/src/gql';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'


export const useCurrentUser=()=>{
    const queryClient = useQueryClient();
    const query=useQuery({
        queryKey:['current-user'],
        queryFn:()=>gclient.request(getCurrentUser)
    })
    return {
        ...query,
        data:query.data?.getCurrentUser
    }
}
export const useGetUserById=(id:string)=>{
    const queryClient=useQueryClient();
    const query=useQuery({
        queryKey:["user-based-onId",id],
        queryFn:()=>gclient.request(getUserById,{getUserByIdId:id}),
        enabled: !!id
    })
    return{
        ...query,
        data:query?.data?.getUserById
    }

}