import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import PostActionsDialog from "./PostActionsDialog";

const PostWidget = ({
  postId,
  postUserId,
  title,
  content,
  likes = {},
  comments = [],
  onPostDeleted, 
  onPostEdited
}) => {
  const { user } = useContext(AuthContext);
  const loggedInUserId = user?.id || user?._id;
  const [isComments, setIsComments] = useState(false);
  const [localComments, setLocalComments] = useState(comments);
  const [localLikes, setLocalLikes] = useState(likes);
  const [newComment, setNewComment] = useState("");
  const post = { id: postId, owner_id: postUserId, title, content };

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const togglePostLike = () => {
    setLocalLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes };
      if (updatedLikes[loggedInUserId]) {
        delete updatedLikes[loggedInUserId];
      } else {
        updatedLikes[loggedInUserId] = true;
      }
      return updatedLikes;
    });
  };

  const isLiked = Boolean(localLikes?.[loggedInUserId]);
  const likeCount = Object.keys(localLikes || {}).length;

  const toggleCommentLike = (commentId) => {
    setLocalComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id !== commentId) return comment;

        const alreadyLiked = comment.likes?.[loggedInUserId];
        const updatedLikes = { ...comment.likes };

        if (alreadyLiked) {
          delete updatedLikes[loggedInUserId];
        } else {
          updatedLikes[loggedInUserId] = true;
        }

        return {
          ...comment,
          likes: updatedLikes,
        };
      })
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(), 
      text: newComment.trim(),
      likes: {},
    };

    setLocalComments((prev) => [...prev, newCommentObj]);
    setNewComment("");
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
         <PostActionsDialog
          post={post}
          onDeleteSuccess={onPostDeleted}
          onEditSuccess={onPostEdited}
        />
      </Box>
      <Typography color={main} sx={{ mt: "0.5rem" }}>
        {content}
      </Typography>

      

      <FlexBetween mt="0.75rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={togglePostLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{localComments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          <Box sx={{ display: "flex", gap: "0.5rem", p: "0 1rem", mb: "0.5rem" }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Post
            </Button>
          </Box>

          {localComments.map((comment, i) => {
            const isLiked = comment.likes?.[loggedInUserId];
            const likeCount = Object.keys(comment.likes || {}).length;

            return (
              <Box key={comment.id || i}>
                <Divider />
                <FlexBetween sx={{ p: "0.5rem 1rem" }}>
                  <Typography sx={{ color: main }}>{comment.text}</Typography>
                  <FlexBetween gap="0.3rem">
                    <IconButton
                      onClick={() => toggleCommentLike(comment.id)}
                      size="small"
                    >
                      {isLiked ? (
                        <FavoriteOutlined
                          sx={{ fontSize: "18px", color: primary }}
                        />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: "18px" }} />
                      )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                  </FlexBetween>
                </FlexBetween>
              </Box>
            );
          })}
          <Divider />
        </Box>
      )}
      
    </WidgetWrapper>
  );
};

export default PostWidget;
