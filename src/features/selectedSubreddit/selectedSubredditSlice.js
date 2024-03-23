import { createSlice } from '@reduxjs/toolkit';

export const selectedSubredditSlice = createSlice({
  name: 'selectedSubreddit',
  initialState: 'popular',
  reducers: {
    setSelectedSubreddit: (state, action) => action.payload
  }
});

export const { setSelectedSubreddit } = selectedSubredditSlice.actions;
export default selectedSubredditSlice.reducer;
