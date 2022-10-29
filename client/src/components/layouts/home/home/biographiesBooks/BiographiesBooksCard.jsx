import Slider1 from '../../../../../assets/images/Slider_1.png';

const BiographiesBooksCard = () => {
  return (
    <div className="w-full select-none cursor-pointer border border-gray-300 hover:shadow-xl p-8 grid grid-cols-12 gap-8 ">
      <img src={Slider1} alt="" className="col-span-4 h-[180px]" />
      <div className="col-span-8 col-start-5 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h6 className="text-sm text-red-600 uppercase">Paper Back</h6>
          <h5 className="text-lg font-medium">
            The Last Sister (Columbia River Book 1)
          </h5>
          <h5 className="text-base text-gray-500">Old man dev</h5>
        </div>
      </div>
    </div>
  );
};

export default BiographiesBooksCard;
