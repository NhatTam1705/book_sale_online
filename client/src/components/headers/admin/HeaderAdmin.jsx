import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import {
  MdMenuOpen,
  MdNotificationsNone,
  MdOutlineAccountCircle,
  MdOutlineExpandMore,
  MdOutlineLogout,
  MdOutlineWbSunny,
  MdSearch,
} from 'react-icons/md';
import Logo from '../../../assets/images/Slider_1.png';

const HeaderAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="grid grid-cols-10 shadow-md ">
      <div className="grid grid-cols-8 col-span-2 px-6 py-4 shadow-md">
        <img src={Logo} alt="" className="w-full h-[40px] col-span-4" />
        <MdMenuOpen className="w-6 h-6 col-start-8 m-auto text-gray-500 co-span-1"></MdMenuOpen>
      </div>
      <div className="grid grid-cols-12 col-span-8 px-6 py-3">
        <form
          action=""
          className="grid grid-cols-12 col-span-3 px-2 border border-gray-300 rounded-md"
        >
          <MdSearch className="w-5 h-5 col-span-1 m-auto text-gray-500"></MdSearch>
          <input type="text" className="col-span-11 ml-2" placeholder='Search...' />
        </form>
        <div className="grid grid-cols-4 col-span-2 col-start-11 text-gray-500">
          <MdOutlineWbSunny className="w-6 h-6 col-span-1 m-auto "></MdOutlineWbSunny>
          <MdNotificationsNone className="w-6 h-6 col-span-1 m-auto "></MdNotificationsNone>
          <img
            src={Logo}
            alt=""
            className="w-10 h-10 col-span-1 m-auto rounded-full "
          />
          <MdOutlineExpandMore
            className="w-6 h-6 col-span-1 m-auto "
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          ></MdOutlineExpandMore>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <div className="flex flex-row justify-between w-24">
                <span>Profile</span>
                <MdOutlineAccountCircle className="items-center w-5 h-5"></MdOutlineAccountCircle>
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div className="flex flex-row justify-between w-24">
                <span>Logout</span>
                <MdOutlineLogout className="items-center w-5 h-5"></MdOutlineLogout>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
