import React, { useState } from 'react';
import { HiMinus, HiPlus, HiSearch, HiX } from 'react-icons/hi';

const SideBarAuthor = () => {
  const [show, setShow] = useState(false);

  const [keyword, setKeyword] = useState('');

  const handleChangeSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword !== '') {
      console.log(keyword);
    }
  };
  return (
    <>
      <div className="border-gray-300 border px-8 py-6 flex flex-col gap-5 text-xl">
        <div className=" flex flex-row justify-between font-semibold items-center">
          <span>Author</span>
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
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="flex flex-row bg-[#f6f5f3] p-3 justify-between"
            >
              <button type="submit" className="w-8">
                <HiSearch></HiSearch>
              </button>
              <input
                className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full"
                type="text"
                placeholder="Search category ..."
                value={keyword}
                onChange={handleChangeSearch}
              />
              <HiX
                className={`text-blue-700 text-base my-auto cursor-pointer ${
                  keyword === '' ? 'hidden' : 'block'
                }`}
                onClick={() => setKeyword('')}
              ></HiX>
            </form>
            <div className="flex flex-col gap-3 text-lg">
              <span className="cursor-pointer hover:text-orange-600">
                Doan Van
              </span>
              <span className="cursor-pointer hover:text-orange-600">
                Doan Van
              </span>
              <span className="cursor-pointer hover:text-orange-600">
                Doan Van
              </span>
              <span className="cursor-pointer hover:text-orange-600">
                Doan Van
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarAuthor;
