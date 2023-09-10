import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`#graphql
    query GetAllTweets {
      getAllTweets {
        id
        content
        imageURL
        author {
          id
          profileImageURL
          firstName
          lastName
        }
        comment {
          id
          content
          author {
            id
            profileImageURL
            firstName
            lastName
          }
        }
        likes {
            author {
              email
            }
        }
      }
    }
`);

export const getSignedURLForTweetQuery = graphql(`#graphql
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);