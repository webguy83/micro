import React, { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://posts.com/posts").then((res) => res.json()).then(
      (posts) => {
        setPosts(posts);
      },
    )
      .catch(console.log);
  }, []);

  const renderPosts = (data) => {
    if (data.length === 0) {
      return <div>Loading!!!</div>;
    } else {
      return data.map(({ id, title, comments }) => {
        return <div
          key={id}
          className="card"
          style={{
            width: "30%",
            marginBottom: "20px",
          }}
        >
          <div className="card-body">
            <h3>{title}</h3>
            <CommentList comments={comments} />
            <CommentCreate id={id} />
          </div>
        </div>;
      });
    }
  };

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts(posts)}
    </div>
  );
};

export default PostList;
