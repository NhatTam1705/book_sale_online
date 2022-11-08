import { Pagination } from '@mui/material';
import OrderItem from './OrderItemAdmin';

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const OrderTableAdmin = () => {
  return (
    <>
      <div className="col-span-9 p-6 text-lg rounded-lg bg-gray-50">
        <div className="grid grid-cols-12 pb-2">
          <span className="col-span-1">ID</span>
          <span className="col-span-4">Customer name</span>
          <span className="col-span-1">Price</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Date</span>
          <span className="col-span-2">Action</span>
        </div>
        <hr />
        <div>
          {array &&
            array.map((item, index) => <OrderItem key={index}></OrderItem>)}
        </div>
        <div className="flex justify-center pt-12">
          <Pagination
            className=""
            color="primary"
            count={10}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default OrderTableAdmin;
