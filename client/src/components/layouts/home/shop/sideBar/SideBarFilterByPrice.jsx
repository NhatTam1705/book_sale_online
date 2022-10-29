import { Slider } from '@mui/material';
import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarFilterByPrice = () => {
  const [show, setShow] = useState(false);

  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                value={value}
                onChange={handleChange}
              />
              <span className="text-lg mx-auto">
                Price: ${value[0] * 10} - ${value[1] * 10}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarFilterByPrice;
