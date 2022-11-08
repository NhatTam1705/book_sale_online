import { useState } from 'react';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="grid items-center xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-9 sm:grid-cols-5 grid-cols-5 p-8 bg-white border border-gray-300">
      <div className="grid xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xl:col-span-5 lg:col-span-5 md:col-span-4 sm:col-span-5 col-span-5">
        <img
          src={Slider1}
          alt=""
          className="w-full h-[150px] lg:col-span-2 xl:col-spa-2 md:col-span-2"
        />
        <div className="flex flex-col justify-center xl:col-span-8 lg:col-span-8 md:col-span-8 p-5">
          <h6 className="text-lg cursor-pointer hover:text-orange-600">
            The Overdue Life of Amy Byler
          </h6>
          <h6 className="text-base text-gray-500 cursor-pointer hover:text-orange-600">
            Kelly Harms
          </h6>
        </div>
      </div>
      <span className="col-span-1 text-lg font-medium ">99.99$</span>
      <div className="flex items-center h-[55px] col-span-2 p-2 space-x-2 border rounded-md xl:w-[120px] lg:w-[100px] md:w-[120px] sm:w-[120px] w-[120px] boder-gray-300">
        <HiMinus
          onClick={() => setQuantity(quantity - 1)}
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
          onClick={() => setQuantity(quantity + 1)}
        ></HiPlus>
      </div>
      <span className="col-span-1 text-lg font-medium ">99.99$</span>
      <div className="flex justify-end col-span-1">
        <HiOutlineTrash className="text-4xl cursor-pointer "></HiOutlineTrash>
      </div>
    </div>
  );
};

export default CartItem;
