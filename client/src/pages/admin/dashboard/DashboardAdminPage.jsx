import { useEffect } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productActions';

const DashboardAdminPage = () => {
  const { products, productsCount } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full p-8 bg-blue-500 rounded-lg flex flex-col gap-2 justify-center items-center text-white text-2xl font-medium">
        <h4 className="">Total Amount</h4>
        <h3 className="">$200</h3>
      </div>
      <div className="grid grid-cols-12 grid-rows-1 gap-6">
        <div className="col-span-3 row-span-1 rounded-lg bg-green-500 text-white text-2xl font-medium grid grid-rows-4">
          <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
            <h4>Products</h4>
            <h4>{productsCount && productsCount}</h4>
          </div>
          <div className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer">
            <span>View Details</span>
            <HiChevronDoubleRight></HiChevronDoubleRight>
          </div>
        </div>
        <div className="col-span-3 row-span-1 rounded-lg bg-yellow-500 text-white text-2xl font-medium grid grid-rows-4">
          <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
            <h4>Orders</h4>
            <h4>20</h4>
          </div>
          <div className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer">
            <span>View Details</span>
            <HiChevronDoubleRight></HiChevronDoubleRight>
          </div>
        </div>
        <div className="col-span-3 row-span-1 rounded-lg bg-red-500 text-white text-2xl font-medium grid grid-rows-4">
          <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
            <h4>Users</h4>
            <h4>20</h4>
          </div>
          <div className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer">
            <span>View Details</span>
            <HiChevronDoubleRight></HiChevronDoubleRight>
          </div>
        </div>
        <div className="col-span-3 row-span-1 rounded-lg bg-gray-500 text-white text-2xl font-medium grid grid-rows-4">
          <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center ">
            <h4>Out Of Stock</h4>
            <h4>{outOfStock}</h4>
          </div>
          {/* <div className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer">
            <span>View detail</span>
            <HiChevronDoubleRight></HiChevronDoubleRight>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
