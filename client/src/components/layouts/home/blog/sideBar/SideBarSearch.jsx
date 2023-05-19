import { useState } from 'react';
import { HiMinus, HiPlus, HiSearch, HiX } from 'react-icons/hi';

const SideBarSearch = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Search</span>
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
        {show && (
          <div className="flex flex-row bg-[#f6f5f3] p-3 justify-between">
            <HiSearch className="w-8"></HiSearch>
            <input
              className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full"
              type="text"
              placeholder="Search"
            />
            <HiX
              className={`text-blue-700 text-base my-auto cursor-pointer hidden`}
            ></HiX>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBarSearch;
