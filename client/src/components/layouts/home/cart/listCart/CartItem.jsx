import { useState } from 'react';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../../../../actions/cartActions';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const CartItem = ({ item }) => {
  const { product, name, price, quantity: amount, author, stock, image } = item;
  const [quantity, setQuantity] = useState(amount);
  const dispatch = useDispatch();

  const handleChangeQuantity = (e) => {
    if (e.target.value > stock) return;
    setQuantity(e.target.value);
    dispatch(addItemToCart(product, e.target.value));
  };

  const handleIncrementQuantity = () => {
    if (quantity + 1 > stock) return;
    setQuantity(quantity + 1);
    dispatch(addItemToCart(product, quantity + 1));
  };

  const handleDecrementQuantity = (id) => {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
    dispatch(addItemToCart(product, quantity - 1));
  };

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(product));
  };

  const navigate = useNavigate();

  return (
    <div className="grid items-center grid-cols-5 p-8 bg-white border border-gray-300 xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-9 sm:grid-cols-5">
      <div className="grid col-span-5 xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xl:col-span-5 lg:col-span-5 md:col-span-4 sm:col-span-5">
        <img
          src={image}
          alt={name}
          className="w-full h-auto lg:col-span-2 xl:col-spa-2 md:col-span-2"
        />
        <div className="flex flex-col justify-center p-5 xl:col-span-8 lg:col-span-8 md:col-span-8">
          <h6
            onClick={() => navigate(`/shop/product/${product}`)}
            className="text-lg cursor-pointer hover:text-orange-600"
          >
            {name}
          </h6>
          <h6
            onClick={() => navigate(`/author/${author._id}`)}
            className="text-base text-gray-500 cursor-pointer hover:text-orange-600"
          >
            {author.name}
          </h6>
        </div>
      </div>
      <div className="flex flex-row text-lg font-medium col-span-1 gap-1">
        <h5
          className={` ${
            item.discount && item.discount !== 0
              ? 'text-red-600 line-through'
              : ''
          }`}
        >
          ${price}
        </h5>
        {item.discount !== 0 && (
          <h5 className="">
            $
            {Number(
              price - (price * (item.discount && item.discount)) / 100
            ).toFixed(2)}
          </h5>
        )}
      </div>
      <div className="flex items-center h-[55px] col-span-2 p-2 space-x-2 border rounded-md xl:w-[120px] lg:w-[100px] md:w-[120px] sm:w-[120px] w-[120px] boder-gray-300">
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
      <span className="col-span-1 text-lg font-medium ">
        {Number(
          quantity *
            ((item.discount && 1 - item.discount / 100) * price || price)
        ).toFixed(2)}
        $
      </span>
      <div className="flex justify-end col-span-1">
        <HiOutlineTrash
          onClick={handleRemoveItemFromCart}
          className="text-4xl cursor-pointer "
        ></HiOutlineTrash>
      </div>
    </div>
  );
};

export default CartItem;
