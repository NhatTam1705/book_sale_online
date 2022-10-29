import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarCartCoupon = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300 bg-white">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Coupon</span>
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
            <div className="grid items-center grid-cols-2 border border-gray-300">
              <input
                type="text"
                name=""
                id=""
                placeholder="Coupon code"
                className="p-3 text-base"
              />
              <span className="flex items-center justify-center text-base font-semibold cursor-pointer">
                Apply coupon
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarCartCoupon;
