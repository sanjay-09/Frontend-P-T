import { graphql } from "@/src/gql";
export const getAllTweets=graphql(`
    query Query2 {
  getAllTweet {
    id
    content
    imageUrl
    author {
      id
      name
      email
      profileImage
    }
  }
}
    `)