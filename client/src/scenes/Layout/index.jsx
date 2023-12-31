import { Box, useMediaQuery } from '@mui/material';
import Navbar from '@/components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar.jsx';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '@/state/api.js';

function Layout() {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
