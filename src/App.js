import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Posts from './features/posts/Posts';
import Post from './features/post/Post';
const SearchResults = lazy(() => import('./features/SearchResults/SearchResults'));
import LoadingSpinner from './common/LoadingSpinner';

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
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
