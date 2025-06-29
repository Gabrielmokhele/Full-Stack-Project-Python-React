import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post.id}
          postId={post.id}
          postUserId={post.owner_id}
          title={post.title}
          content={post.content}
        />
      ))}
    </>
  );
};

export default PostsWidget;
