import { graphql } from "@/src/gql";

export const createTweet=graphql(`
    mutation CreateTweet($payload: CreateTweetData) {
  createTweet(payload: $payload) {
    id
    content
    imageUrl
    author {
      name
      email
      profileImage
    }
  }
}`);
