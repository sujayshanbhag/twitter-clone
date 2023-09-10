import { graphqlClient } from "@/clients/api";
import { CreateCommentData, CreateTweetData } from "@/gql/graphql";
import {  createCommentMutation, createTweetMutation } from "@/graphql/mutations/tweet";
import { getAllTweetsQuery } from "@/graphql/queries/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn : (payload : CreateCommentData) => graphqlClient.request(createCommentMutation,{payload}),
        onMutate: (payload) => toast.loading('Creating Comment',{id : '2'}),
        onSuccess: async (payload) => {
            queryClient.invalidateQueries(["all-tweets"]),
            toast.success('Comment posted',{id : '2'})
        },
        onError : () => {
            toast.error('Something went wrong',{id : '2'})
        }
    })
    return mutation;
}

// export const useAddLike= () => {
//     const queryClient= useQueryClient();

//     const mutation = useMutation({
//         mutationFn : (to : string) => graphqlClient.request(addLikeMutation,{to})
//     })
// }

export const useCreateTweet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload : CreateTweetData) => graphqlClient.request(createTweetMutation,{payload}),
        onMutate: (payload) => toast.loading('Creating Tweet',{id : '1'}),
        onSuccess : async(payload) => {
            queryClient.invalidateQueries(["all-tweets"]),
            toast.success('Tweet posted',{id : '1'})
        },
        onError : () => {
            toast.error('Please wait..',{id : '1'})
        }
    })
    return mutation;
};

export const useGetAllTweets= () => {
    const query = useQuery({
        queryKey : ['all-tweets'],
        queryFn : () => graphqlClient.request(getAllTweetsQuery),
    })
    return {...query,tweets: query.data?.getAllTweets}
}

