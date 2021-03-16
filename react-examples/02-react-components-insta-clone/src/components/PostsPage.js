import React, { useState } from "react";
import Post from "./Post";
import "./Posts.css";
import dummyData from "../dummy-data.js";

const PostsPage = () => {
  const [posts] = useState(dummyData);

  return (
    <div className="posts-container-wrapper">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default PostsPage;
