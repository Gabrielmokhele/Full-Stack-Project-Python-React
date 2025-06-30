import React, { useContext, useState } from "react";
import {
  Box,
  Divider,
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { AuthContext } from "context/AuthContext";

const MyPostWidget = ({ onPostCreated, userId }) => {
  const { user, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { palette } = useTheme();

  const handlePost = async () => {
    const postData = {
      title,
      content,
      owner_id: user?.id,
    };

    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const newPost = await response.json();
        if (onPostCreated) onPostCreated(newPost);
        setTitle("");
        setContent("");
      } else {
        console.error("Post creation failed");
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">

        <Box sx={{ width: "100%" }}>
          <InputBase
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1.5rem",
              mb: "0.5rem",
            }}
          />
          <InputBase
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </Box>
      </FlexBetween>


      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem">
        </FlexBetween>
        <Button
          disabled={!title || !content}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
