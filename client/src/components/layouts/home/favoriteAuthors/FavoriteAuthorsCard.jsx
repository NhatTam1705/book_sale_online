import Slider1 from '../../../../assets/images/Slider_1.png';

const FavoriteAuthorsCard = () => {
  return (
    <div className="w-full p-8 items-center flex flex-col gap-10">
      <img src={Slider1} alt="" className="w-[150px] h-[150px] rounded-full" />
      <div className="items-center flex flex-col">
        <h6 className="text-base font-semibold">Old man dev</h6>
        <h6 className="text-base text-gray-500">25 Published Books</h6>
      </div>
    </div>
  );
};

export default FavoriteAuthorsCard;
