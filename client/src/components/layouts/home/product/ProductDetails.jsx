import { Rating } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropsTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import {
  HiMinus,
  HiOutlineHeart,
  HiOutlineShare,
  HiPlus,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { addItemToCart } from '../../../../actions/cartActions';
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../../actions/wishlistActions';
import Button from '../../../buttons/Button';
import Slider1 from './../../../../assets/images/Slider_1.png';

const ProductDetails = ({ product }) => {
  const {
    _id,
    name,
    ratings,
    numOfReviews,
    soldPrice,
    stock,
    author,
    discount,
    images,
  } = product;

  const [quantity, setQuantity] = useState(1);
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

  const handleChangeQuantity = (e) => {
    if (e.target.value > stock) return;
    setQuantity(e.target.value);
  };

  const handleIncrementQuantity = () => {
    if (quantity + 1 > stock) return;
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(_id, quantity));
    enqueueSnackbar('Item added to cart!', { variant: 'success' });
  };

  return (
    <div className="grid grid-cols-12 xl:gap-16 lg:gap-8 md:gap-y-16 sm:gap-y-8 gap-y-8">
      <div className="flex items-center col-span-12 xl:col-span-5 lg:col-span-5 md:col-span-12 sm:col-span-12">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-full mySwiper"
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={image.url} className="max-w-[55%] ">
                <img src={image.url} alt={name} className="w-full h-auto" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex flex-col col-span-12 gap-4 xl:col-span-7 lg:col-span-7 md:col-span-12 sm:col-span-12">
        <h3 className="text-4xl font-semibold">{name}</h3>
        <div className="flex flex-row flex-wrap gap-5 text-lg">
          <Rating name="read-only" value={ratings || 0} readOnly />
          <span>({numOfReviews})</span>
          <span className="font-semibold">By (author)</span>
          <h6
            onClick={() => navigate(`/author/${author._id}`)}
            className="text-gray-500 cursor-pointer hover:text-orange-600"
          >
            {author && author.name}
          </h6>
        </div>
        <div className="flex flex-row text-3xl font-semibold gap-5">
          <h5 className={` ${discount ? 'text-red-600 line-through' : ''}`}>
            ${soldPrice}
          </h5>
          {discount && (
            <h5 className="">
              ${soldPrice - (soldPrice * discount.percent) / 100}
            </h5>
          )}
        </div>
        <h6 className="text-lg">
          <strong>Status: </strong>
          <span className={`${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock > 0 ? 'In stock' : 'Out of stock'} ({stock})
          </span>
        </h6>
        <div className="grid grid-cols-6 gap-5 xl:grid-cols-12 lg:grid-cols-6 md:grid-cols-12 sm:grid-cols-12 h-14">
          <div className="flex items-center col-span-2 p-2 space-x-2 border rounded-md boder-gray-300">
            <HiMinus
              onClick={handleDecrementQuantity}
              className="cursor-pointer"
            ></HiMinus>
            <input
              type="number"
              name="quanity"
              id=""
              onChange={handleChangeQuantity}
              value={quantity}
              className="w-12 text-center bg-transparent"
            />
            <HiPlus
              className="cursor-pointer"
              onClick={handleIncrementQuantity}
            ></HiPlus>
          </div>
          <Button
            disabled={stock > 0 ? false : true}
            className={`${
              stock > 0 ? '' : 'bg-gray-500 cursor-not-allowed'
            }  w-full h-full col-span-4 text-white`}
            onClick={handleAddToCart}
          >
            Add To Card
          </Button>
          <div
            onClick={handleAddToWishlist}
            className={`flex items-center col-span-3 space-x-3 cursor-pointer hover:text-orange-600 ${
              isWishlist ? 'text-orange-600' : ''
            }`}
          >
            <HiOutlineHeart className="text-2xl"></HiOutlineHeart>
            <span className="text-lg">Add to Wishlist</span>
          </div>
          <div className="flex items-center col-span-3 space-x-3 cursor-pointer hover:text-orange-600">
            <HiOutlineShare className="text-2xl"></HiOutlineShare>
            <span className="text-lg">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.PropsTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string,
    name: PropsTypes.string,
    ratings: PropsTypes.number,
    numOfReviews: PropsTypes.number,
    soldPrice: PropsTypes.number,
    stock: PropsTypes.number,
    author: PropsTypes.object,
    discount: PropsTypes.object,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(ProductDetails, FallbackComponent);
