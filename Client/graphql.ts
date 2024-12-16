import { GraphQLClient } from 'graphql-request'
const client=typeof window !==undefined;

export const gclient = new GraphQLClient('http://localhost:3001/graphql',{
    headers:()=>(
        {
            Authorization:client ?`Bearer ${window.localStorage.getItem("twitter-p-token")}` :""
        }
    )
});