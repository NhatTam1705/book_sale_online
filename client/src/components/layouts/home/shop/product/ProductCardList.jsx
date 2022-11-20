import { IconButton, Tooltip } from '@mui/material';
import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiSwitchHorizontal,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const ProductCardList = ({ product }) => {
  // Destructuring information of product
  const { name, format, _id, soldPrice, description, author, discount } =
    product;

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-8 p-8 border border-gray-300 xl:grid-cols-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-3 hover:shadow-md hover:border-black">
      <div className="col-span-2">
        <img src={Slider1} alt="" className="h-full" />
      </div>
      <div className="flex flex-col justify-center col-span-8 gap-1">
        <h6 className="text-sm text-red-600 uppercase">{format}</h6>
        <h5 className="text-base font-medium">{name}</h5>
        <h5 className="text-base text-gray-500">{author.name}</h5>
        <h6 className="text-base">{description}</h6>
        <h5 className="text-lg font-medium">${soldPrice}</h5>
      </div>
      <div className="grid items-center justify-center grid-cols-3 col-span-2">
        <Tooltip className="col-span-1" title="ADD TO CARD" placement="right">
          <IconButton>
            <HiOutlineShoppingBag></HiOutlineShoppingBag>
          </IconButton>
        </Tooltip>
        <span className="col-span-1 p-2 rounded-full w-9 h-9 hover:bg-red-500">
          <HiSwitchHorizontal
            className="w-full h-full"
            onClick={() => navigate(`/shop/product/${_id}`)}
          ></HiSwitchHorizontal>
        </span>
        <span className="col-span-1 p-2 rounded-full w-9 h-9 hover:bg-red-500">
          <HiOutlineHeart className="w-full h-full"></HiOutlineHeart>
        </span>
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
