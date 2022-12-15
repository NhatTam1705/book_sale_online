import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const SideBarYourOrderCheckout = ({ cartItems }) => {
  const [show, setShow] = useState(true);

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
              {cartItems &&
                cartItems.map((item, index) => (
                  <div key={item.product} className="grid grid-cols-5">
                    <div className="grid grid-cols-12 col-span-4 gap-2">
                      <span className="col-span-10 text-left">{item.name}</span>
                      <span className="col-span-2 font-semibold">
                        {' '}
                        x {item.quantity}
                      </span>
                    </div>
                    <span className="col-span-1 text-right">
                      {(item.discount
                        ? item.price * (1 - item.discount / 100)
                        : item.price) * item.quantity}
                      $
                    </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarYourOrderCheckout;
