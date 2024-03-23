import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';
import Post from './features/post/Post';
// import SearchResults from './features/searchResults/SearchResults';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/r/:subreddit" element={<Posts />} />
        {/* <Route path="/search/:searchTerm" element={<SearchResults />} /> */}
        <Route path="/post/:encodedPermalink" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
