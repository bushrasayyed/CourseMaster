import React from 'react';
import { Box } from '@mui/material';
import Appbar from './Appbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Appbar />
        <Box sx={{ padding: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
