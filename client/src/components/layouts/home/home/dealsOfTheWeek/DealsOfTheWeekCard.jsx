import { LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fee2e2',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#ef4444',
  },
}));

const DealsOfTheWeekCard = ({ product }) => {
  const {
    _id,
    author,
    discount,
    name,
    soldPrice,
    images,
    format,
    stock,
    stockInput,
  } = product;
  const navigate = useNavigate();
  let percent = 0;
  if (stockInput !== undefined && stock !== undefined) {
    percent = ((stockInput - stock - 1) / stockInput) * 100;
  }
  return (
    <>
      <div className="grid w-full h-full grid-cols-4 gap-8 p-8 border border-gray-300 cursor-pointer select-none hover:shadow-xl xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 ">
        <img
          src={images[0].url}
          alt={name}
          className="w-full h-full col-span-4"
        />
        <div className="flex flex-col justify-between col-span-8 ">
          <div className="grid grid-rows-4 gap-1">
            <h6 className="text-sm row-span-1 text-red-600 uppercase">
              {format}
            </h6>
            <h5
              onClick={() => navigate(`/shop/product/${_id}`)}
              className="text-lg row-span-1 hover:text-orange-600 font-medium"
            >
              {name}
            </h5>
            <h5
              onClick={() => navigate(`/author/${author._id}`)}
              className="hover:text-orange-600 text-base row-span-1 text-gray-500"
            >
              {author.name}
            </h5>
            <div className="flex flex-row text-lg font-medium row-span-1 gap-10">
              <h5 className="text-red-600 line-through">${soldPrice}</h5>
              <h5 className="">
                ${soldPrice - (soldPrice * discount.percent) / 100}
              </h5>
            </div>
          </div>
          <h4 className="text-xl font-bold">
            Hurry Up! <span className="font-normal">Offer ends in:</span>
          </h4>
          <div className="grid h-12 grid-cols-4 ">
            <div className="flex flex-col items-center justify-around text-xl font-bold border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row">
              02 <span className="text-base font-normal">Days</span>
            </div>
            <div className="flex flex-col items-center justify-around text-xl font-bold border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row">
              03 <span className="text-base font-normal">Hours</span>
            </div>
            <div className="flex flex-col items-center justify-around text-xl font-bold border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row">
              60 <span className="text-base font-normal">Mins</span>
            </div>
            <div className="flex flex-col items-center justify-around text-xl font-bold md:flex-row sm:flex-col lg:flex-col xl:flex-row">
              25 <span className="text-base font-normal">Secs</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h6 className="text-base">Already Sold: {stockInput}</h6>
              <h6 className="text-base">Available: {stock}</h6>
            </div>
            <BorderLinearProgress
              sx={{ width: 1, hight: 20 }}
              className="!h-5"
              variant="determinate"
              value={percent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const DealsOfTheWeekCardSkeleton = () => {
  return (
    <>
      <div className="grid w-full h-full grid-cols-4 gap-8 p-8 border border-gray-300 cursor-pointer select-none hover:shadow-xl xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 ">
        <div className="w-full h-full col-span-4 skeleton"></div>
        <div className="flex flex-col justify-between gap-1 col-span-8 ">
          <div className="grid grid-rows-4 gap-1">
            <div className="h-7 w-[25%] row-span-1 skeleton"></div>
            <div className="row-span-1 h-7 w-full skeleton"></div>
            <div className="row-span-1 h-7 w-[50%] skeleton"></div>
            <div className="flex flex-row text-lg font-medium row-span-1 gap-10">
              <div className="h-7 w-12 skeleton"></div>
              <div className="h-7 w-12 skeleton"></div>
            </div>
          </div>
          <div className="h-7 w-[50%] skeleton"></div>
          <div className="grid h-12 grid-cols-4 ">
            <div className="flex flex-col items-center justify-around skeleton border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row"></div>
            <div className="flex flex-col items-center justify-around skeleton border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row"></div>
            <div className="flex flex-col items-center justify-around skeleton border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row"></div>
            <div className="flex flex-col items-center justify-around skeleton md:flex-row sm:flex-col lg:flex-col xl:flex-row"></div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <div className="skeleton h-7 w-32"></div>
              <div className="skeleton h-7 w-32"></div>
            </div>
            <div className="skeleton h-5 w-full "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsOfTheWeekCard;
