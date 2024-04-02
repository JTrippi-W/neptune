import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';
import Post from './features/post/Post';
import SearchResults from './features/SearchResults/SearchResults';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/r/:subreddit" element={<Posts />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route path="/post/:encodedPermalink" element={<Post />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
