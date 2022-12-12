import { Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropsTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { HiOutlineHeart, HiSwitchHorizontal } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../../../actions/cartActions';
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../../../actions/wishlistActions';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const ProductCardGrid = ({ product }) => {
  // Destructuring information of product
  const { _id, name, format, soldPrice, author, discount } = product;

  // Declare value hover when hover product card
  const [hover, setHover] = useState(false);

  // Declare function redirect url when click to product card
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [isWishlist, setIsWishList] = useState(false);
  useEffect(() => {
    const isItemExist = wishlistItems.find((i) => i.product === _id);
    if (isItemExist) {
      setIsWishList(true);
    } else {
      setIsWishList(false);
    }
  }, [_id, wishlistItems]);

  const handleAddToWishlist = () => {
    if (!isWishlist) {
      dispatch(addItemToWishlist(_id));
      setIsWishList((prev) => !prev);
    } else {
      dispatch(removeItemFromWishlist(_id));
      setIsWishList((prev) => !prev);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(_id, 1));
    enqueueSnackbar('Item added to cart!', { variant: 'success' });
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full h-[430PX] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black relative"
      >
        <img className="px-16 mt-8 h-[225px]" src={Slider1} alt="Book" />
        <div
          className={`flex flex-col w-full gap-1 absolute px-8 mb-8 pt-3 transition-all duration-500 bg-white ${
            hover ? '-translate-y-10' : 'bottom-0'
          }`}
        >
          <h6 className="text-sm text-red-600 uppercase">{format}</h6>
          <h5 className="text-base font-medium">{name}</h5>
          <h5 className="text-base text-gray-500">{author.name}</h5>
          <h5 className="text-lg font-medium">${soldPrice}</h5>
        </div>
        <div
          className={`grid grid-cols-5 absolute transition-all duration-500 bottom-0 px-8 mb-8 w-full ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="col-span-3 font-semibold uppercase transition-all duration-300 border-b-2 hover:border-gray-900"
          >
            Add to card
          </button>
          <div className="flex flex-row items-center justify-end col-span-2 gap-1">
            <Tooltip title="View Detail" placement="bottom">
              <span className="p-2 rounded-full w-9 h-9 hover:bg-red-500">
                <HiSwitchHorizontal
                  className="w-full h-full cursor-pointer"
                  onClick={() => navigate(`/shop/product/${_id}`)}
                ></HiSwitchHorizontal>
              </span>
            </Tooltip>
            <Tooltip
              title={isWishlist ? 'Remove From Wishlist' : 'Add To Wishlist'}
              placement="bottom"
            >
              <span
                className={`p-2 rounded-full w-9 h-9 ${
                  isWishlist ? 'bg-red-500' : ''
                } hover:bg-red-500`}
              >
                <HiOutlineHeart
                  onClick={handleAddToWishlist}
                  className="w-full h-full cursor-pointer"
                ></HiOutlineHeart>
              </span>
            </Tooltip>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

// Check type props input
ProductCardGrid.PropsTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string,
    name: PropsTypes.string,
    format: PropsTypes.string,
    soldPrice: PropsTypes.number,
    author: PropsTypes.object,
    discount: PropsTypes.object,
  }),
};

// Callback component when error
const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};
export default withErrorBoundary(ProductCardGrid, FallbackComponent);
