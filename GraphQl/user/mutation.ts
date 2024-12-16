import { graphql } from "@/src/gql";

export const followUser=graphql(
    `
    mutation Mutation1($to: ID!) {
  followUser(to: $to)
}
    `
)

export const unfollowUser=graphql(
    `
    mutation UnfollowUser($to: ID!) {
  unfollowUser(to: $to)
}

    `
)