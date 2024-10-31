
import React, { useEffect, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { getUserInfo } from '@/services/authService';
import { drawerItems } from '@/utils/dwaerItems';
import { UserRole } from '@/types';
import SidebarItem from './SideBarItem';
import Link from 'next/link';
import Image from 'next/image';
import assets from "@/assets";

const drawerWidth = 240;

const Sidebar = ({handleLinkClick}:any) => {
    const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);
  return (
    <Box>
          <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
        >
          PH Health Care
        </Typography>
      </Stack>
        <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} handleLinkClick={handleLinkClick} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
