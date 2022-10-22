import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarFormat = () => {
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
            <div className="flex flex-col gap-3 text-lg">
              <span className="cursor-pointer hover:text-orange-600">
                Paperback
              </span>
              <span className="cursor-pointer hover:text-orange-600">
                Hardcover
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarFormat;
