import MenuIcon from '@mui/icons-material/Menu';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navigationItemsData from '../../../assets/datas/navigationItems';
import Logo from '../../../assets/images/logo.png';

const SideBar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      onClick={toggleDrawer(anchor, false)}
    >
      <Link onClick={toggleDrawer(anchor, false)} to="/home">
        <Box
          component="img"
          sx={{
            width: 220,
            height: 'auto',
            m: 4,
          }}
          src={Logo}
        />
      </Link>
      <Divider />
      {navigationItemsData.map((item, index) => (
        <ItemList
          key={item.id}
          onClick={toggleDrawer(anchor, false)}
          item={item}
        ></ItemList>
      ))}
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer('left', true)}>
        <MenuIcon sx={{ fontSize: 40 }}></MenuIcon>
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </>
  );
};

const ItemList = ({ item, onClick }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClick();
    navigate(path);
  };

  return (
    <>
      <ListItemButton onClick={() => handleNavigate(item.to)}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={item.navName} />
      </ListItemButton>
    </>
  );
};

export default SideBar;
