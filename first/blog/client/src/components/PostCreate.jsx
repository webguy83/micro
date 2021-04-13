import React, { useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const createPost = () => {
    fetch("http://posts.com/posts/create", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((res) => res.json())
      .then(() => {
        setTitle("");
      })
      .catch(console.log);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPostSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return <form onSubmit={onPostSubmit}>
    <div className="form-group">
      <label htmlFor="form-control">Title</label>
      <input
        type="text"
        className="form-control"
        value={title}
        onChange={(e) => onTitleChange(e)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>;
};

export default PostCreate;
