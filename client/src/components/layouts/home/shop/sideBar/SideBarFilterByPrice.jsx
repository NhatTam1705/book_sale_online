import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarFilterByPrice = ({ fallbackPrice }) => {
  const [show, setShow] = useState(false);

  const [price, setPrice] = React.useState([0, 100]);

  useEffect(() => {
    fallbackPrice(price);
  }, [price, fallbackPrice]);
  return (
    <>
      <div className="border-gray-300 border px-8 py-6 flex flex-col gap-5 text-xl">
        <div className=" flex flex-row justify-between font-semibold items-center">
          <span>Filter By Price</span>
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
            <div className="flex flex-col gap-3 px-2">
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={price}
                step={0.1}
                onChange={(event, value) => setPrice(value)}
              />
              <span className="text-lg mx-auto">
                Price: ${price[0] * 10} - ${price[1] * 10}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarFilterByPrice;
