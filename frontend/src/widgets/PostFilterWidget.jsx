import React, { useState, useContext } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import { AuthContext } from 'context/AuthContext';

const PostFilterWidget = ({ posts, onFilteredPosts }) => {
  const [filter, setFilter] = useState('all');
  const { user } = useContext(AuthContext);
  const { palette } = useTheme();

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      
      let filteredPosts;
      if (newFilter === 'my-posts') {
        filteredPosts = posts.filter(post => post.owner_id === user?.id);
      } else {
        filteredPosts = posts;
      }
      
      onFilteredPosts(filteredPosts);
    }
  };

  const myPostsCount = posts.filter(post => post.owner_id === user?.id).length;
  const allPostsCount = posts.length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 2,
        mt: 2,
        p: 2,
        backgroundColor: palette.background.alt,
        borderRadius: '8px',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" color={palette.neutral.dark}>
          Filter Posts
        </Typography>
        
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="posts filter"
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              borderColor: palette.primary.light,
              color: palette.neutral.medium,
              '&.Mui-selected': {
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': {
                  backgroundColor: palette.primary.dark,
                },
              },
              '&:hover': {
                backgroundColor: palette.primary.light,
                color: palette.primary.main,
              },
            },
          }}
        >
          <ToggleButton value="all" aria-label="all posts">
            All Posts
          </ToggleButton>
          <ToggleButton value="my-posts" aria-label="my posts">
            My Posts
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip
          label={`All: ${allPostsCount}`}
          size="small"
          variant={filter === 'all' ? 'filled' : 'outlined'}
          color={filter === 'all' ? 'primary' : 'default'}
          sx={{
            backgroundColor: filter === 'all' ? palette.primary.main : 'transparent',
            color: filter === 'all' ? palette.background.alt : palette.neutral.medium,
            borderColor: palette.primary.light,
          }}
        />
        <Chip
          label={`Mine: ${myPostsCount}`}
          size="small"
          variant={filter === 'my-posts' ? 'filled' : 'outlined'}
          color={filter === 'my-posts' ? 'primary' : 'default'}
          sx={{
            backgroundColor: filter === 'my-posts' ? palette.primary.main : 'transparent',
            color: filter === 'my-posts' ? palette.background.alt : palette.neutral.medium,
            borderColor: palette.primary.light,
          }}
        />
      </Box>
    </Box>
  );
};

export default PostFilterWidget;
