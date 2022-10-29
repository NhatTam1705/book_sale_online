import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarLanguage = () => {
  const [show, setShow] = useState(false);
  
  return (
    <>
      <div className="border-gray-300 border px-8 py-6 flex flex-col gap-5 text-xl">
        <div className=" flex flex-row justify-between font-semibold items-center">
          <span>Language</span>
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
            <div className="flex flex-col gap-1">
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <span className="text-lg my-auto cursor-pointer hover:text-orange-600">Viet Nam</span>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <span className="text-lg my-auto cursor-pointer hover:text-orange-600">English</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarLanguage;
