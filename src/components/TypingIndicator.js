import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const TypingIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, ml: 1 }}>
      <CircularProgress size={10} sx={{ mr: 1 }} />
      <CircularProgress size={10} sx={{ mr: 1 }} />
      <CircularProgress size={10} />
    </Box>
  );
};

export default TypingIndicator;