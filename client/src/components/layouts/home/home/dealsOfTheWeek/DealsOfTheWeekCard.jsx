import Slider1 from '../../../../../assets/images/Slider_1.png';

const DealsOfTheWeekCard = () => {
  return (
    <>
      <div className="w-full h-[400PX] select-none cursor-pointer border border-gray-300 hover:shadow-xl p-8 grid grid-cols-12 gap-8 ">
        <img src={Slider1} alt="" className="col-span-4 h-full" />
        <div className="col-span-8 col-start-5 flex flex-col justify-between">
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
          <div className="grid grid-cols-4 h-12 ">
            <div className="border-r border-gray-300 text-xl font-bold items-center flex flex-row justify-around">
              114 <span className="font-normal text-base">Days</span>
            </div>
            <div className="border-r border-gray-300 text-xl font-bold items-center flex flex-row justify-around">
              03 <span className="font-normal text-base">Hours</span>
            </div>
            <div className="border-r border-gray-300 text-xl font-bold items-center flex flex-row justify-around">
              60 <span className="font-normal text-base">Mins</span>
            </div>
            <div className="text-xl font-bold items-center flex flex-row justify-around">
              25 <span className="font-normal text-base">Secs</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <h6 className="text-base">Already Sold: 14</h6>
              <h6 className="text-base">Available: 3</h6>
            </div>
            <div className="relative h-5 w-full mt-3">
              <div className="absolute h-5 w-full bg-red-100 rounded-full "></div>
              <div className="absolute h-5 w-[80%] bg-red-500 rounded-full "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsOfTheWeekCard;
