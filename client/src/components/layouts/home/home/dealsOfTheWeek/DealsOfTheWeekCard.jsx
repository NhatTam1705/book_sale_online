import Slider1 from '../../../../../assets/images/Slider_1.png';

const DealsOfTheWeekCard = () => {
  return (
    <>
      <div className="grid w-full h-full grid-cols-4 gap-8 p-8 border border-gray-300 cursor-pointer select-none hover:shadow-xl xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 ">
        <img src={Slider1} alt="" className="w-full h-full col-span-4" />
        <div className="flex flex-col justify-between col-span-8 ">
          <div className="flex flex-col gap-1">
            <h6 className="text-sm text-red-600 uppercase">Paper Back</h6>
            <h5 className="text-lg font-medium">
              The Last Sister (Columbia River Book 1)
            </h5>
            <h5 className="text-base text-gray-500">Old man dev</h5>
            <h5 className="text-lg font-medium">$29</h5>
          </div>
          <h4 className="text-xl font-bold">
            Hurry Up! <span className="font-normal">Offer ends in:</span>
          </h4>
          <div className="grid h-12 grid-cols-4 ">
            <div className="flex flex-col items-center justify-around text-xl font-bold border-r border-gray-300 md:flex-row sm:flex-col lg:flex-col xl:flex-row">
              114 <span className="text-base font-normal">Days</span>
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
          <div>
            <div className="flex flex-row justify-between">
              <h6 className="text-base">Already Sold: 14</h6>
              <h6 className="text-base">Available: 3</h6>
            </div>
            <div className="relative w-full h-5 mt-3">
              <div className="absolute w-full h-5 bg-red-100 rounded-full "></div>
              <div className="absolute h-5 w-[80%] bg-red-500 rounded-full "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsOfTheWeekCard;
