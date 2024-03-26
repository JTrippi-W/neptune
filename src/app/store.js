import { configureStore } from '@reduxjs/toolkit';
import { redditApi } from '../api/redditApi';
import selectedSubredditReducer from '../features/selectedSubreddit/selectedSubredditSlice';
import searchTermReducer from '../features/SearchResults/searchTermSlice';

export const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    subreddit: selectedSubredditReducer,
    search: searchTermReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redditApi.middleware)
});
