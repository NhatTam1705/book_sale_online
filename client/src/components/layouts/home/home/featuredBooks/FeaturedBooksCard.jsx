import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
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

const FeaturedBooksCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, name, format, soldPrice, author, images, discount } = product;
  const [hover, setHover] = useState(false);
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
        className="w-full h-[382px] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black relative col-span-1"
      >
        <img
          className="mx-auto mt-7 h-[175px]"
          src={images[0].url}
          alt="Book"
        />
        {discount && (
          <div className="w-16 h-8 top-0 left-0 bg-red-500 absolute flex items-center justify-center">
            <span className="text-lg text-white">
              - {discount && discount.percent} %
            </span>
          </div>
        )}
        <div
          className={`grid grid-rows-5 w-full absolute px-7 mb-7 pt-3 transition-all duration-500 bg-white ${
            hover ? '-translate-y-10' : 'bottom-0'
          }`}
        >
          <h6 className="text-sm row-span-1 text-red-600 uppercase">
            {format}
          </h6>
          <h5 className="text-base row-span-2 font-medium">{name}</h5>
          <h5
            onClick={() => navigate(`/author/${author._id}`)}
            className="text-base row-span-1 hover:text-orange-600 text-gray-500"
          >
            {author.name}
          </h5>
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
        <div
          className={`grid grid-cols-2 w-full transition-all duration-500 absolute bottom-0 px-7 mb-7 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Tooltip className="w-10" title="ADD TO CARD" placement="right">
            <IconButton onClick={handleAddToCart}>
              <HiOutlineShoppingBag></HiOutlineShoppingBag>
            </IconButton>
          </Tooltip>
          <div className="flex flex-row items-center w-full justify-end gap-1">
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
        </div>
      </div>
    </>
  );
};

export const FeaturedBooksCardSkeleton = () => {
  return (
    <div className="w-full h-[382px] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black">
      <div className="skeleton mx-16 mt-8 h-[160px]" />
      <div className={`grid grid-rows-5 gap-1 w-full px-8 mb-8 pt-2 bg-white`}>
        <div className="h-7 row-span-1 w-[50%] skeleton"></div>
        <div className="h-14 row-span-2 skeleton"></div>
        <div className="h-7 row-span-1 skeleton"></div>
        <div className="h-7 row-span-1 w-[25%] skeleton"></div>
      </div>
    </div>
  );
};

export default FeaturedBooksCard;
