import { Box, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import MyPostWidget from "widgets/MyPostWidget";
import PostsWidget from "widgets/PostsWidget";
import { AuthContext } from "context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
          <MyPostWidget userId={user?.id} />
         
          <PostsWidget userId={user?.id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
