import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import {
  HiOutlineDeviceMobile,
  HiOutlineHeart,
  HiOutlineLocationMarker,
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingCart,
  HiOutlineSwitchHorizontal,
  HiOutlineUser,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleClick = (event) => {
    if (isAuthenticated) {
      navigate('/profile/dashboard');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {}, []);

  return (
    <>
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
            <span className="cursor-pointer hover:text-orange-600">
              <a href="http://google.com">
                <HiOutlineLocationMarker className="w-5 h-5"></HiOutlineLocationMarker>
              </a>
            </span>
            <span className="cursor-pointer hover:text-orange-600">
              <a href="http://google.com">
                <HiOutlineSwitchHorizontal className="w-5 h-5"></HiOutlineSwitchHorizontal>
              </a>
            </span>
            <span className="cursor-pointer hover:text-orange-600">
              <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
            </span>
            <span className="cursor-pointer hover:text-orange-600">
              <HiOutlineUser
                onClick={handleClick}
                className="w-5 h-5"
              ></HiOutlineUser>
            </span>
            <span className="relative cursor-pointer hover:text-orange-600">
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
