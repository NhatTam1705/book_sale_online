import { Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarByReview = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="border-gray-300 border px-8 py-6 flex flex-col gap-5 text-xl">
        <div className=" flex flex-row justify-between font-semibold items-center">
          <span>Format</span>
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
                <Rating name="" defaultValue={5} precision={0.5} readOnly size='large'/>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <Rating name="" defaultValue={4} precision={0.5} readOnly size='large'/>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <Rating name="" defaultValue={3} precision={0.5} readOnly size='large'/>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <Rating name="" defaultValue={2} precision={0.5} readOnly size='large'/>
              </div>
              <div class="flex items-center">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                <Rating name="" defaultValue={1} precision={0.5} readOnly size='large'/>
              </div>
              
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SideBarByReview