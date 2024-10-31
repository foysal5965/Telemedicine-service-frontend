import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <CircularProgress color="primary" size={60} />
      </motion.div>
    </Box>
  );
};

export default Loader;
