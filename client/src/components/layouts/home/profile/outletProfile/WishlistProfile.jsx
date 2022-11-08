import Slider1 from '../../../../../assets/images/Slider_1.png';
import Button from '../../../../buttons/Button';

const WishlistProfile = () => {
  return (
    <div>
      <h3 className="mb-6 text-4xl font-semibold">Wishlist</h3>
      <div className="grid grid-cols-7 p-4 text-lg font-semibold border border-gray-300 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-9 sm:grid-cols-9">
        <span className="col-span-2 xl:col-span-7 lg:col-span-7 md:col-span-4 sm:col-span-4">Product</span>
        <span className="col-span-1">Price</span>
        <span className="col-span-2">Stock Status</span>
        <span className="col-span-2">Actions</span>
      </div>
      <div>
        <WishItem></WishItem>
        <WishItem></WishItem>
        <WishItem></WishItem>
      </div>
    </div>
  );
};

export default WishlistProfile;

const WishItem = () => {
  return (
    <div className="grid items-center grid-cols-5 p-8 border border-gray-300 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-5 sm:grid-cols-5">
      <div className="grid grid-cols-9 col-span-5 gap-5 xl:col-span-7 lg:col-span-7 md:col-span-5 sm:col-span-5 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-9 sm:grid-cols-9">
        <img src={Slider1} alt="" className="xl:col-span-3 lg:col-span-3 md:col-span-9 sm:col-span-9 col-span-9 h-[180px]" />
        <div className="flex flex-col justify-center col-span-9 gap-1">
          <h5 className="text-lg font-medium text-red-500 cursor-pointer hover:text-red-600">
            The Last Sister (Columbia River Book)
          </h5>
          <h5 className="text-base text-gray-500 cursor-pointer hover:text-red-500">
            Old man dev
          </h5>
        </div>
      </div>
      <span className="col-span-1">$37</span>
      <span className="col-span-2">In Stock</span>
      <Button className="col-span-2 text-white">Add To Cart</Button>
    </div>
  );
};
