import { Box, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MyPostWidget from "widgets/MyPostWidget";
import PostsWidget from "widgets/PostsWidget";
import { AuthContext } from "context/AuthContext";

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (token) fetchPosts();
  }, [token]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  if (!user) return null;

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget userId={user?.id} onPostCreated={handlePostCreated} />

          <PostsWidget
            posts={posts}
            setPosts={setPosts}
            userId={user?.id}
            isProfile
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
