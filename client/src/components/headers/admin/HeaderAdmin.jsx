import { Autocomplete, Menu, MenuItem, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {
  MdMenuOpen,
  MdNotificationsNone,
  MdOutlineAccountCircle,
  MdOutlineExpandMore,
  MdOutlineLogout,
  MdOutlineWbSunny,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userActions';
import Logo from '../../../assets/images/logo.png';
import Avatar from '../../../assets/images/default_avatar.png';

const pages = [
  {
    label: 'Dashboard',
    value: '/admin/dashboard',
  },
  {
    label: 'Customer',
    value: '/admin/customers',
  },
  {
    label: 'Order',
    value: '/admin/orders',
  },
  {
    label: 'Discount',
    value: '/admin/discounts',
  },
  {
    label: 'Advertisement',
    value: '/admin/advertisements',
  },
  {
    label: 'Category',
    value: '/admin/categories',
  },
  {
    label: 'Add Product',
    value: '/admin/product',
  },
  {
    label: 'Product List',
    value: '/admin/products',
  },
  {
    label: 'Add Author',
    value: '/admin/author',
  },
  {
    label: 'Author List',
    value: '/admin/authors',
  },
];

const HeaderAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
    enqueueSnackbar('Logout successfully!', { variant: 'success' });
  };

  return (
    <div className="grid grid-cols-10 shadow-md ">
      <div className="grid grid-cols-8 col-span-2 px-6 py-4 shadow-md">
        <img
          src={Logo}
          alt="Logo"
          className="w-full h-[40px] col-span-4 object-contain"
        />
        <MdMenuOpen className="w-6 h-6 col-start-8 m-auto text-gray-500 co-span-1"></MdMenuOpen>
      </div>
      <div className="grid grid-cols-12 col-span-8 px-6 py-3 items-center">
        <Autocomplete
          popupIcon={false}
          options={pages}
          onChange={(event, value) => navigate(value.value)}
          className="col-span-3"
          size="small"
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        <div className="grid grid-cols-4 col-span-2 col-start-11 text-gray-500">
          <MdOutlineWbSunny className="w-6 h-6 col-span-1 m-auto "></MdOutlineWbSunny>
          <MdNotificationsNone className="w-6 h-6 col-span-1 m-auto "></MdNotificationsNone>
          <img
            src={(user && user.avatar.url) || Avatar}
            alt={user && user.name}
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
              <div
                onClick={() => navigate('/admin/profile')}
                className="flex flex-row justify-between w-24"
              >
                <span>Profile</span>
                <MdOutlineAccountCircle className="items-center w-5 h-5"></MdOutlineAccountCircle>
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div
                onClick={handleLogout}
                className="flex flex-row justify-between w-24"
              >
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
