import { Box, useMediaQuery } from "@mui/material";
import {  useEffect, useState } from "react";
import PostWidget from "widgets/PostWidget";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          
          {posts.map((post) => (
            <PostWidget key={post.id} {...post} />
          ))}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
