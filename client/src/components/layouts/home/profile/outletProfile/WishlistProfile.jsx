import Slider1 from '../../../../../assets/images/Slider_1.png';
import Button from '../../../../buttons/Button';

const WishlistProfile = () => {
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-6">Wishlist</h3>
      <div className="grid grid-cols-12 text-lg border border-gray-300 p-4 font-semibold">
        <span className="col-span-7">Product</span>
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
    <div className="grid grid-cols-12 border items-center border-gray-300 p-8">
      <div className="col-span-7 grid grid-cols-12 gap-5">
        <img src={Slider1} alt="" className="col-span-3 h-[180px]" />
        <div className="flex flex-col gap-1 col-span-9 justify-center">
          <h5 className="text-lg font-medium cursor-pointer text-red-500 hover:text-red-600">
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
