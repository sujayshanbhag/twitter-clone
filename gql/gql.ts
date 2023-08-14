/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {    \n            id\n        }   \n    }\n": types.MutationDocument,
    "#graphql \n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n": types.FollowUserDocument,
    "#graphql \n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n": types.UnfollowUserDocument,
    "#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                profileImageURL\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GetAllTweetsDocument,
    "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n": types.GetSignedUrlDocument,
    "#graphql\nquery VerifyUserGoogleToken($token : String!){\n    verifyGoogleToken(token: $token)\n}": types.VerifyUserGoogleTokenDocument,
    "\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            followers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n": types.GetCurrentUserDocument,
    "#graphql\n\nquery GetUserById($id: ID!) {\n  \n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        content\n        id\n        imageURL\n        author {\n        id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {    \n            id\n        }   \n    }\n"): (typeof documents)["\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {    \n            id\n        }   \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"): (typeof documents)["#graphql \n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n"): (typeof documents)["#graphql \n    mutation UnfollowUser($to: ID!) {\n        unfollowUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                profileImageURL\n                firstName\n                lastName\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                profileImageURL\n                firstName\n                lastName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"): (typeof documents)["#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery VerifyUserGoogleToken($token : String!){\n    verifyGoogleToken(token: $token)\n}"): (typeof documents)["#graphql\nquery VerifyUserGoogleToken($token : String!){\n    verifyGoogleToken(token: $token)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            followers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            profileImageURL\n            email\n            firstName\n            lastName\n            recommendedUsers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            followers {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n            following {\n              id\n              firstName\n              lastName\n              profileImageURL\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\nquery GetUserById($id: ID!) {\n  \n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        content\n        id\n        imageURL\n        author {\n        id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n}\n"): (typeof documents)["#graphql\n\nquery GetUserById($id: ID!) {\n  \n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        content\n        id\n        imageURL\n        author {\n        id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;