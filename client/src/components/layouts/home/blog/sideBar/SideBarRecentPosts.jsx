import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarRecentPosts = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Recent Posts</span>
          <div className="flex gap-2">
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
        </div>
      </div>
    </>
  );
};

export default SideBarRecentPosts;
