import Link from 'next/link';
import {
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from '@mui/material';
import { DrawerItem } from '@/types';
import { usePathname } from 'next/navigation';

type IProps = {
   item: DrawerItem;
   handleLinkClick:any
};

const SidebarItem = ({ item ,handleLinkClick}: IProps) => {
   const linkPath = `/dashboard/${item.path}`;
   const pathname = usePathname();

  
   return (
      <Link href={linkPath} onClick={handleLinkClick}>
         <ListItem
            disablePadding
            sx={{
               ...(pathname === linkPath
                  ? {
                       borderRight: '3px solid #1586FD',
                       '& svg': {
                          color: '#1586FD',
                       },
                    }
                  : {}),
               mb: 1,
            }}
         >
            <ListItemButton>
               <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
               <ListItemText primary={item.title} />
            </ListItemButton>
         </ListItem>
      </Link>
   );
};

export default SidebarItem;
