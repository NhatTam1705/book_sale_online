import { useNavigate } from 'react-router-dom';
import Button from '../../../../buttons/Button';

const OrdersProfile = () => {

  return (
    <div>
      <h3 className="text-4xl font-semibold mb-6">Orders</h3>
      <div className="grid grid-cols-12 p-4 border border-gray-300 text-lg font-semibold">
        <span className="col-span-2">Order</span>
        <span className="col-span-3">Date</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-3">Total</span>
        <span className="col-span-2">Actions</span>
      </div>
      <div>
        <OrderItem></OrderItem>
        <OrderItem></OrderItem>
        <OrderItem></OrderItem>
      </div>
    </div>
  );
};

export default OrdersProfile;

const OrderItem = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 px-4 py-8 text-lg border items-center border-gray-300">
      <span className="col-span-2">#11042001</span>
      <span className="col-span-3">April 11, 2001</span>
      <span className="col-span-2">On hold</span>
      <div className="col-span-3 flex gap-1">
        <span className="text-red-600">$1,855.00</span>
        <span>for 5 items</span>
      </div>
      <Button
        onClick={() => navigate('/shop/order/12')}
        className="col-span-2 text-white w-28"
      >
        View
      </Button>
    </div>
  );
};
