import React from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
  return (
    <div className="container">
      <h1>Create Post foge</h1>
      <PostCreate />
      <hr />
      <h2>Post List dd</h2>
      <PostList />
    </div>
  );
}

export default App;
