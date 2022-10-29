import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarPaymentCheckout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Payment</span>
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
              <div>
                <div class="flex items-center">
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                  <span className="my-auto text-lg ">Direct bank transfer</span>
                </div>
                <p className="ml-12 text-base text-gray-500">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order won’t be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
              <div>
                <div class="flex items-center">
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                  <span className="my-auto text-lg ">Cash on delivery</span>
                </div>
                <p className="ml-12 text-base text-gray-500">
                  Pay with cash upon delivery.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarPaymentCheckout;
