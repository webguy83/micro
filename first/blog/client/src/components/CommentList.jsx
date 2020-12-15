import React from "react";

const CommentList = ({ comments }) => {
  const renderList = (list) => {
    if (comments.length === 0) {
      return null;
    }
    return <ul>
      {list.map(({ id, content, status }) => {
        let newContent = '';
        if(status === 'approved') {
          newContent = content
        }
        if(status === 'pending') {
          newContent = 'This content is waiting for pending'
        }
        if(status === 'rejected') {
          newContent = 'This content is not valid'
        }
        return <li key={id}>{newContent}</li>
      })}
    </ul>;
  };

  return renderList(comments);
};

export default CommentList;
