import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import Product from '../../../../assets/images/Slider_1.png';
import Button from '../../../buttons/Button';

const ProductCardAdmin = () => {
  return (
    <div className="flex flex-col gap-2 p-6">
      <img src={Product} alt="" className="h-48 w-[60%] mx-auto" />
      <div className="text-lg">
        <h6>Name</h6>
        <h5 className="font-bold">$90</h5>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button className="flex items-center gap-2 px-4 py-2 text-black bg-white border border-gray-300">
          <MdOutlineModeEdit></MdOutlineModeEdit>
          <span>Edit</span>
        </Button>
        <Button className="flex items-center gap-2 px-4 py-2 text-black bg-white border border-gray-300">
          <MdOutlineDelete></MdOutlineDelete>
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
