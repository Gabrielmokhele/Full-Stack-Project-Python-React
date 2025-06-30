import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Typography,
  Alert,
  Box
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { AuthContext } from "context/AuthContext";
import FlexBetween from "components/FlexBetween";

const PostActionsDialog = ({ post, onDeleteSuccess, onEditSuccess }) => {
  const { user, token } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [alert, setAlert] = useState("");

  const isOwner = user?.id === post.owner_id;

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        const updated = await res.json();
        onEditSuccess(updated);
        setAlert("Post edited successfully!");
        setTimeout(() => setAlert(""), 3000);
        setOpenEdit(false);
      } else {
        setAlert("Failed to edit post.");
        setTimeout(() => setAlert(""), 3000);
      }
    } catch (err) {
      console.error("Edit failed", err);
      setAlert("An error occurred while editing.");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTimeout(() => {
          onDeleteSuccess(post.id);
        }, 2000);
        setAlert("Post deleted successfully!");
        setTimeout(() => setAlert(""), 3500);
        setOpenDelete(false);
      } else {
        setAlert("Failed to delete post.");
        setTimeout(() => setAlert(""), 3500);
      }
    } catch (err) {
      console.error("Delete failed", err);
      setAlert("An error occurred while deleting.");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  const handleClick = (type) => {
    if (type === "edit") setOpenEdit(true);
    if (type === "delete") setOpenDelete(true);
  };


  return (
    <>
      {(isOwner && token) && (
        <FlexBetween gap="0.5rem" >
          <IconButton size="small" onClick={() => handleClick("edit")}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleClick("delete")}>
            <DeleteOutlinedIcon />
          </IconButton>
        </FlexBetween>
      )}

      {alert && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Alert severity="warning" sx={{ width: "fit-content" }}>
            {alert}
          </Alert>
        </Box>
      )}


      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostActionsDialog;
