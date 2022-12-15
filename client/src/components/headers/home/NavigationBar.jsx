import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { HiOutlineMenu, HiSearch, HiX } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import navigationItemsData from '../../../assets/datas/navigationItems';
import Logo from '../../../assets/images/logo.png';
import SideBar from './SideBar';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/search/${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <>
      <div className="grid h-20 border-b border-gray-300 border-x">
        <div className="grid items-center w-full h-full grid-cols-12 px-12 mx-auto xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 gap-x-5">
          <div className="flex items-center justify-center col-span-2 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2">
            <span className="w-auto h-auto">
              {/* <HiOutlineMenu
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="w-8 h-8"
              ></HiOutlineMenu>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {navigationItemsData &&
                  navigationItemsData.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => {
                        navigate(item.to);
                        handleClose();
                      }}
                    >
                      <span className='w-full px-2 my-2 text-lg border-b-2 border-transparent mx-14 hover:text-orange-600 hover:border-orange-600'>{item.navName}</span>
                    </MenuItem>
                  ))}
              </Menu> */}
              <SideBar></SideBar>
            </span>
          </div>
          <div className="flex items-center justify-center col-span-2 xl:col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-2">
            <img className="w-full h-auto" src={Logo} alt="Logo" />
          </div>
          <div className="items-center justify-center hidden h-full gap-8 text-xl text-center xl:col-span-7 xl:col-start-3 xl:flex lg:col-span-7 lg:col-start-3 lg:flex md:hidden sm:hidden">
            {navigationItemsData &&
              navigationItemsData.map((item, index) => (
                <NavLink
                  key={item.id}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center h-full px-2 transition-all text-orange-600 border-b-2 border-orange-600'
                      : 'flex items-center h-full px-2 transition-all hover:text-orange-600 hover:border-b-2 hover:border-orange-600'
                  }
                  to={item.to}
                >
                  {item.navName}
                </NavLink>
              ))}
          </div>
          <div className="col-span-8 xl:col-span-3 xl:col-start-10 lg:col-span-3 lg:col-start-10 md:col-span-6 md:col-start-7 sm:col-span-8">
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="flex flex-row bg-[#f6f5f3] p-3 justify-between"
            >
              <button type="submit" className="w-8">
                <HiSearch></HiSearch>
              </button>
              <input
                className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full"
                type="text"
                placeholder="Search for Books by Keyword ..."
                value={keyword}
                onChange={handleChangeSearch}
              />
              <HiX
                className={`text-blue-700 text-base my-auto cursor-pointer ${
                  keyword === '' ? 'hidden' : 'block'
                }`}
                onClick={() => setKeyword('')}
              ></HiX>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
