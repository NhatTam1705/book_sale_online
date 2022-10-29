import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarYourOrderCheckout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Your Order</span>
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
              <div className="grid grid-cols-3">
                <div className="flex col-span-2 gap-2">
                  <span className="text-left ">Touchscreen MP3 Player</span>
                  <span className="font-semibold"> x 1</span>
                </div>
                <span className="col-span-1 text-right">99.99$</span>
              </div>
              <div className="grid grid-cols-3">
                <div className="flex col-span-2 gap-2">
                  <span className="text-left ">Touchscreen MP3 Player</span>
                  <span className="font-semibold"> x 1</span>
                </div>
                <span className="col-span-1 text-right">99.99$</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarYourOrderCheckout;
