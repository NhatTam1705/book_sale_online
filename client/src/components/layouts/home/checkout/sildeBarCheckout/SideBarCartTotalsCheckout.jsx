import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const SideBarCartTotalsCheckout = ({ price }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Cart Totals</span>
          {show ? (
            <HiMinus
              className="cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></HiMinus>
          ) : (
            <HiPlus
              className="cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></HiPlus>
          )}
        </div>
        {show && (
          <>
            <div className="flex flex-col gap-3 text-lg">
              <div className="flex flex-row justify-between">
                <span className="">Subtotal:</span>
                <span className="">{price}$</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="">Shipping:</span>
                <span className="">
                  {price > 200 ? 'Free Shipping' : 'None Free Shipping'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarCartTotalsCheckout;
