import { useState } from 'react';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="grid items-center grid-cols-10 p-8 bg-white border border-gray-300">
      <div className="grid grid-cols-10 col-span-5">
        <img src={Slider1} alt="" className="w-full h-[150px] col-span-2" />
        <div className="flex flex-col justify-center col-span-8 p-5">
          <h6 className="text-lg cursor-pointer hover:text-orange-600">
            The Overdue Life of Amy Byler
          </h6>
          <h6 className="text-base text-gray-500 cursor-pointer hover:text-orange-600">
            Kelly Harms
          </h6>
        </div>
      </div>
      <span className="col-span-1 text-lg font-medium ">99.99$</span>
      <div className="flex items-center h-[55px] col-span-2 p-2 space-x-2 border rounded-md w-[120px] boder-gray-300">
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
