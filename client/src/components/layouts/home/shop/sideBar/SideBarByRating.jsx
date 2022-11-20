import { Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const ratings = [
  {
    star: 5,
    checked: false,
    totalReview: 0,
  },
  {
    star: 4,
    checked: false,
    totalReview: 0,
  },
  {
    star: 3,
    checked: false,
    totalReview: 0,
  },
  {
    star: 2,
    checked: false,
    totalReview: 0,
  },
  {
    star: 1,
    checked: false,
    totalReview: 0,
  },
];

const SideBarByRating = ({ fallbackRating }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState([-1, 5]);

  useEffect(() => {
    fallbackRating(rating);
  }, [rating, fallbackRating]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>By Rating</span>
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
              {ratings &&
                ratings.map((rating, index) => (
                  <div
                    key={index}
                    class="flex items-center"
                    onClick={() => {
                      if (rating.checked) {
                        setRating([-1, 5]);
                        ratings.map((lan, index) => (lan.checked = false));
                      } else {
                        setRating([rating.star - 1, rating.star]);
                        ratings.map((lan, index) => (lan.checked = false));
                        rating.checked = true;
                      }
                    }}
                  >
                    <Checkbox
                      checked={rating.checked}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                    <Rating
                      name=""
                      value={rating.star}
                      readOnly
                      size="large"
                      className="cursor-pointer"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarByRating;
