import { useNavigate } from 'react-router-dom';
import Button from '../../../../../buttons/Button';

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  return (
    <div className="grid items-center grid-cols-7 gap-3 px-4 py-8 text-lg border border-gray-300 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-7 sm:grid-cols-7">
      <span className="col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-3">
        #{order._id}
      </span>
      <span className="col-span-4 xl:col-span-2 lg:col-span-2 md:col-span-4 sm:col-span-4">
        {String(order.createdDate).substring(0, 10)}
      </span>
      <span className="col-span-2">{order.orderStatus}</span>
      <div className="flex items-center col-span-2 gap-1">
        <span className="text-red-600">${order.totalPrice}</span>
        <span>
          for{' '}
          {order.orderItems &&
            order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
          items
        </span>
      </div>
      <Button
        onClick={() => navigate(`/shop/order/${order._id}`)}
        className="col-span-2 text-white w-28"
      >
        View
      </Button>
    </div>
  );
};

export default OrderItem;
