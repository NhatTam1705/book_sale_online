import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropsTypes, { bool } from 'prop-types';
import { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiSwitchHorizontal,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../../../actions/cartActions';
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../../../actions/wishlistActions';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const ProductCardList = ({ product }) => {
  // Destructuring information of product
  const {
    name,
    format,
    _id,
    soldPrice,
    description,
    author,
    discount,
    images,
  } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="grid grid-cols-2 gap-8 p-8 border border-gray-300 xl:grid-cols-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-3 hover:shadow-md hover:border-black relative">
      <div className="col-span-2">
        <img src={images[0].url} alt={name} className="h-full" />
      </div>
      {discount && (
        <div className="w-20 h-10 top-0 left-0 bg-red-500 absolute flex items-center justify-center">
          <span className="text-lg text-white">
            - {discount && discount.percent} %
          </span>
        </div>
      )}
      <div className="flex flex-col justify-center col-span-8 gap-1">
        <h6 className="text-sm text-red-600 uppercase">{format}</h6>
        <h5 className="text-base font-medium">{name}</h5>
        <h5
          onClick={() => navigate(`/author/${author._id}`)}
          className="text-base text-gray-500 cursor-pointer hover:text-orange-600"
        >
          {author.name}
        </h5>
        <h6 className="text-base truncate">{description}</h6>
        <div className="flex flex-row text-lg font-medium row-span-1 gap-5">
          <h5 className={` ${discount ? 'text-red-600 line-through' : ''}`}>
            ${soldPrice}
          </h5>
          {discount && (
            <h5 className="">
              ${soldPrice - (soldPrice * discount.percent) / 100}
            </h5>
          )}
        </div>
      </div>
      <div className="grid items-center justify-center grid-cols-3 col-span-2">
        <Tooltip className="col-span-1" title="Add To Cart" placement="bottom">
          <span className="p-2 rounded-full w-9 h-9 hover:bg-red-500">
            <HiOutlineShoppingBag
              className="w-full h-full cursor-pointer"
              onClick={handleAddToCart}
            ></HiOutlineShoppingBag>
          </span>
        </Tooltip>
        <Tooltip className="col-span-1" title="View Detail" placement="bottom">
          <span className="p-2 rounded-full w-9 h-9 hover:bg-red-500">
            <HiSwitchHorizontal
              className="w-full h-full cursor-pointer"
              onClick={() => navigate(`/shop/product/${_id}`)}
            ></HiSwitchHorizontal>
          </span>
        </Tooltip>
        <Tooltip
          className="col-span-1"
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
    </div>
  );
};

export const ProductCardListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-8 p-8 border border-gray-300 xl:grid-cols-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-3 hover:shadow-md hover:border-black relative">
      <div className="col-span-2 h-[200px] skeleton"></div>
      <div className="flex flex-col justify-center w-full col-span-8 gap-1">
        <div className="skeleton h-7 w-24"></div>
        <div className="skeleton h-7 w-[80%]"></div>
        <div className="skeleton h-7 w-[30%]"></div>
        <div className="skeleton h-7 w-[100%]"></div>
        <div className="skeleton h-7 w-10"></div>
      </div>
      <div className="grid items-center justify-center grid-cols-3 col-span-2">
        <span className="p-2 rounded-full w-9 h-9 skeleton"></span>
        <span className="p-2 rounded-full w-9 h-9 skeleton"></span>

        <span className={`p-2 rounded-full w-9 h-9 skeleton`}></span>
      </div>
    </div>
  );
};

// Check type props input
ProductCardList.PropsTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string,
    name: PropsTypes.string,
    format: PropsTypes.string,
    description: PropsTypes.string,
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
export default withErrorBoundary(ProductCardList, FallbackComponent);
