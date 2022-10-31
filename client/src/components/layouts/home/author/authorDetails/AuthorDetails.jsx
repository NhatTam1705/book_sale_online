import Slider1 from '../../../../../assets/images/Slider_1.png';
import BookCard from './BookCard';
const array = [1, 2, 3, 4];

const AuthorDetails = () => {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <img src={Slider1} alt="" className="h-full" />
      </div>
      <div className="col-span-9 flex flex-col gap-4">
        <h4 className="text-3xl font-normal">Old man dev</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          nesciunt quo ducimus cumque voluptate, eveniet pariatur, magni
          expedita dolorem ea sint commodi fugit maxime sed vero optio illo
          illum adipisci?
        </p>
        <div className="grid grid-cols-12 gap-1">
          {array &&
            array.map((item, index) => (
              <div key={index} className="col-span-3 bg-white">
                <BookCard></BookCard>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
