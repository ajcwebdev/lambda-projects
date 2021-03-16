import React, { useState } from "react";
import Comment from "./Comment";
import "./Comment.css";

const CommentSection = props => {
  const [comments] = useState(props.comments)

  return (
    <div>
      {comments.map(
        (comment, index) => {
          return <Comment key={index} comment={comment} />
        }
      )}
      <form className="comment-form">
        <input
          type="text"
          placeholder="Add comment... "
        />
    </form>
    </div>
  );
};

export default CommentSection;
