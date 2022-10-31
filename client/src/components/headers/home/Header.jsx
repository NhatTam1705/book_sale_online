import { Popover } from '@mui/material';
import { useState } from 'react';
import {
  HiOutlineDeviceMobile,
  HiOutlineHeart,
  HiOutlineLocationMarker,
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingCart,
  HiOutlineSwitchHorizontal,
  HiOutlineUser,
} from 'react-icons/hi';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [form, setForm] = useState('signIn');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOverlay(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOverlay(false);
  };

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {overlay && (
        <div className="absolute z-10 inset-0 bg-black bg-opacity-50 overlay"></div>
      )}
      <div className="grid h-10 border border-gray-300">
        <div className="grid items-center justify-between w-full grid-cols-10 px-12 mx-auto xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-6 gap-y-5">
          <a
            href="http://google.com"
            className="flex items-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 gap-x-1 hover:text-orange-600"
          >
            <HiOutlineQuestionMarkCircle className="w-5 h-5"></HiOutlineQuestionMarkCircle>
            <p className="hidden lg:block xl:block md:block sm:block">
              Can we help you?
            </p>
          </a>
          <a
            href="http://google.com"
            className="flex items-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 gap-x-1 hover:text-orange-600"
          >
            <HiOutlineDeviceMobile className="w-5 h-5"></HiOutlineDeviceMobile>
            <p className="hidden lg:block xl:block md:block sm:block">
              +84 334 193 816
            </p>
          </a>
          <div className="grid items-center w-full grid-cols-5 col-span-4 col-start-7 sm:col-start-5 sm:col-span-2 md:col-span-3 md:col-start-10 lg:col-span-2 xl:col-span-2 xl:col-start-11 lg:col-start-11 ">
            <span className="hover:text-orange-600">
              <a href="http://google.com">
                <HiOutlineLocationMarker className="w-5 h-5"></HiOutlineLocationMarker>
              </a>
            </span>
            <span className="hover:text-orange-600">
              <a href="http://google.com">
                <HiOutlineSwitchHorizontal className="w-5 h-5"></HiOutlineSwitchHorizontal>
              </a>
            </span>
            <span className="hover:text-orange-600">
              <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
            </span>
            <span className="hover:text-orange-600">
              <HiOutlineUser
                aria-describedby={id}
                onClick={handleClick}
                className="w-5 h-5"
              ></HiOutlineUser>
              <Popover
                id={id}
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 0, left: 10000 }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={handleClose}
                className=""
              >
                <div className="w-[500px] h-[680px]">
                  {form === 'signIn' ? (
                    <SignInForm
                      setForm={setForm}
                      onClick={handleClose}
                    ></SignInForm>
                  ) : form === 'signUp' ? (
                    <SignUpForm
                      setForm={setForm}
                      onClick={handleClose}
                    ></SignUpForm>
                  ) : (
                    <ForgotPasswordForm
                      setForm={setForm}
                      onClick={handleClose}
                    ></ForgotPasswordForm>
                  )}
                </div>
              </Popover>
            </span>
            <span className="relative hover:text-orange-600">
              <a href="http://google.com">
                <HiOutlineShoppingCart className="w-5 h-5"></HiOutlineShoppingCart>
              </a>
              <span className="absolute top-0 left-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-black rounded-full translate-x-3/4 -translate-y-2/4">
                0
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
