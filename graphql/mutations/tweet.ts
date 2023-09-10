import { graphql } from "@/gql";

export const createCommentMutation = graphql(`#graphlql 
    mutation CommentMutation($payload : CreateCommentData) {
        addComment(payload : $payload){
            id
        }
    }
`);


export const createTweetMutation = graphql(`
    mutation Mutation($payload: CreateTweetData!) {
        createTweet(payload: $payload) {    
            id
        }   
    }
`);