import Slider1 from '../../../../../assets/images/Slider_1.png';

const BiographiesBooksCard = () => {
  return (
    <div className="grid w-full grid-cols-12 gap-6 p-8 border border-gray-300 cursor-pointer select-none hover:shadow-xl ">
      <img src={Slider1} alt="" className="col-span-4 h-[180px]" />
      <div className="flex flex-col justify-between col-span-8">
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
