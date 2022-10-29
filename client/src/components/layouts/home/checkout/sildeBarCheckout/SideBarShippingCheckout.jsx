import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarShippingCheckout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Shipping</span>
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
            <div className="flex flex-col">
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <span className="my-auto text-lg ">Free shipping</span>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <span className="my-auto text-lg ">Flat rate: $15</span>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <span className="my-auto text-lg ">Local pickup: $8</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarShippingCheckout;
