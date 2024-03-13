import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/'
  }),
  endpoints: (builder) => ({
    getPopularPosts: builder.query({
      query: () => `r/popular.json`
    }),
    getSubredditPosts: builder.query({
      query: (subreddit) => `r/${subreddit}/hot.json`
    }),
    getCommentsForPost: builder.query({
      query: (subreddit, postId) => `r/${subreddit}/comments/${postId}.json`
    }),
    getSearchResults: builder.query({
      query: (searchTerm) => `search.json?q=${searchTerm}`
    })
  })
});

export const {
  useGetPopularPostsQuery,
  useGetSubredditPostsQuery,
  useGetCommentsForPostQuery,
  useGetSearchResultsQuery
} = redditApi;
