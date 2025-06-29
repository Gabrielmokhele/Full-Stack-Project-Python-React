import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import PostFilterWidget from "./PostFilterWidget";
import PostWidget from "./PostWidget";
import { Typography } from "@mui/material";

const PostsWidget = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(null);

   useEffect(() => {
    const getAllPosts = async () => {
      if (!token) {
        setPosts([]);
        setFilteredPosts(null);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/posts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(null); 
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getAllPosts();
  }, [token]);


  const handleFilteredPosts = (filtered) => {
    setFilteredPosts(filtered.length === posts.length ? null : filtered);
  };

  const postsToRender = filteredPosts !== null ? filteredPosts : posts;

  const handleDeletePost = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post.id !== deletedId));
    setFilteredPosts((prev) =>
      prev ? prev.filter((post) => post.id !== deletedId) : null
    );
  };

  const handleEditPost = (editedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
    setFilteredPosts((prev) =>
      prev
        ? prev.map((post) => (post.id === editedPost.id ? editedPost : post))
        : null
    );
  };

  return (
    <>
      <PostFilterWidget
        posts={posts}
        onFilteredPosts={handleFilteredPosts}
      />
      {postsToRender.length > 0 ? (
        postsToRender.map((post) => (
          <PostWidget
            key={post.id}
            postId={post.id}
            postUserId={post.owner_id}
            title={post.title}
            content={post.content}
            onPostDeleted={handleDeletePost}
            onPostEdited={handleEditPost}
          />
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No posts found.
        </Typography>
      )}
    </>
  );
};

export default PostsWidget;
