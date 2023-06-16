import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  login: SigninResponse;
  registerUser: RegisterResponse;
};


export type MutationLoginArgs = {
  signinRequest: SigninRequest;
};


export type MutationRegisterUserArgs = {
  registerRequest: RegisterRequest;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
};

export type RegisterRequest = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  id: Scalars['Int']['output'];
};

export type SigninRequest = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
};

export type RegisterUserMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterResponse', id: number } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SigninResponse', id: number, email: string, firstName: string, lastName: string, accessToken: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string } };

const test = graphql.link('http://localhost:9998/graphql')

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRegisterUserMutationTest((req, res, ctx) => {
 *   const { firstName, lastName, email, password } = req.variables;
 *   return res(
 *     ctx.data({ registerUser })
 *   )
 * })
 */
export const mockRegisterUserMutationTest = (resolver: ResponseResolver<GraphQLRequest<RegisterUserMutationVariables>, GraphQLContext<RegisterUserMutation>, any>) =>
  test.mutation<RegisterUserMutation, RegisterUserMutationVariables>(
    'RegisterUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLoginMutationTest((req, res, ctx) => {
 *   const { email, password } = req.variables;
 *   return res(
 *     ctx.data({ login })
 *   )
 * })
 */
export const mockLoginMutationTest = (resolver: ResponseResolver<GraphQLRequest<LoginMutationVariables>, GraphQLContext<LoginMutation>, any>) =>
  test.mutation<LoginMutation, LoginMutationVariables>(
    'Login',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMeQueryTest((req, res, ctx) => {
 *   return res(
 *     ctx.data({ me })
 *   )
 * })
 */
export const mockMeQueryTest = (resolver: ResponseResolver<GraphQLRequest<MeQueryVariables>, GraphQLContext<MeQuery>, any>) =>
  test.query<MeQuery, MeQueryVariables>(
    'Me',
    resolver
  )
