import React, { useState } from "react";

const CommentCreate = ({ id }) => {
  const [comment, setComment] = useState("");

  const sendComment = (content) => {
    fetch(`http://posts.com/posts/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  };

  const onCommentSubmit = (e) => {
    e.preventDefault();
    sendComment(comment);
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={onCommentSubmit}>
      <div className="form-group">
        <label htmlFor="form-control">Comment</label>
        <input
          type="text"
          className="form-control"
          value={comment}
          onChange={(e) => onCommentChange(e)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default CommentCreate;
