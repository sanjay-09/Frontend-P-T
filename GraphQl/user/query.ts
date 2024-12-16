import { gql } from 'graphql-request'
import { graphql } from '@/src/gql';
export const getCurrentUser=graphql(`
query GetCurrentUser {
  getCurrentUser {
    id
    name
    email
    profileImage
    recommmendedUsers {
      id
      name
      email
      profileImage
    }
    tweets {
      id
      content
      imageUrl
       author {
        name
        profileImage
      }
    
    }
    follower {
      id
      name
      profileImage
      email
      id
    }
    following {
      id
      name
      email
      profileImage
    }
  }
}
`);

export const getJWTToken=graphql(`
    query Query($token: String!) {
  getJwtToken(token: $token)
}

    `)


export const getUserById=graphql(`
  query GetUserById($getUserByIdId: String!) {
  getUserById(id: $getUserByIdId) {
    id
    name
    email
    profileImage
   
    tweets {
      id
      content
      imageUrl
       author {
        name
        profileImage
      }
    }
    follower {
      id
      name
      email
      profileImage
    }
    following {
      id
      name
      email
      profileImage
    }
  }
}`);

