import { graphql } from "@/gql";

export const createCommentMutation = graphql(`#graphlql 
    mutation CommentMutation($payload : CreateCommentData) {
        addComment(payload : $payload){
            id
        }
    }
`);

export const addLikeMutation = graphql(`#graphlql 
    mutation AddLikeMutation($to : ID!) {
        addLike(to : $to)
    }
`);

export const removeLikeMutation = graphql(`#graphlql 
    mutation RemoveLikeMutation($to : ID!) {
        removeLike(to : $to)
    }
`);


export const createTweetMutation = graphql(`
    mutation Mutation($payload: CreateTweetData!) {
        createTweet(payload: $payload) {    
            id
        }   
    }
`);