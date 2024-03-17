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
    getPostAndComments: builder.query({
      query: (permalink) => `${permalink}.json`,
      transformResponse: (response) => {
        const postData = response[0]?.data?.children?.[0]?.data;
        const commentsData = response[1]?.data?.children.map((child) => child.data);
        return { post: postData, comments: commentsData };
      }
    }),
    getSearchResults: builder.query({
      query: (searchTerm) => `search.json?q=${searchTerm}`
    })
  })
});

export const {
  useGetPopularPostsQuery,
  useGetSubredditPostsQuery,
  useGetPostAndCommentsQuery,
  useGetSearchResultsQuery
} = redditApi;
