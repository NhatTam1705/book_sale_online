import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import ListCart from '../../components/layouts/home/cart/listCart/ListCart';
import SideBarCartCoupon from '../../components/layouts/home/cart/sideBarCart/SideBarCartCoupon';
import SideBarCartShipping from '../../components/layouts/home/cart/sideBarCart/SideBarCartShipping';
import SideBarCartTotals from '../../components/layouts/home/cart/sideBarCart/SideBarCartTotals';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="grid xl:grid-cols-8 lg:grid-cols-7 gap-8 px-12 py-24 bg-[#fff6f6]">
      <h1 className="text-4xl font-semibold text-center xl:col-span-8 lg:col-span-7">
        Your cart: {cartItems.length} items
      </h1>
      <div className="xl:col-span-6 lg:col-span-5">
        <ListCart cartItems={cartItems}></ListCart>
      </div>
      <div className="xl:col-span-2 lg:col-span-2">
        <SideBarCartTotals price={price}></SideBarCartTotals>
        <SideBarCartShipping price={price}></SideBarCartShipping>
        {/* <SideBarCartCoupon></SideBarCartCoupon> */}
        <div className="grid grid-cols-2 px-8 py-6 text-xl bg-white border border-gray-300">
          <span className="col-span-1 font-semibold text-left">Total</span>
          <span className="col-span-1 font-semibold text-right">
            {price > 200 ? price : price + 25}$
          </span>
        </div>
        <Button
          onClick={() => navigate('/login?redirect=/shop/checkout')}
          disabledButton={cartItems.length > 0 ? false : true}
          className={`${
            cartItems.length > 0 ? '' : 'bg-gray-500 cursor-not-allowed'
          } w-full h-16 mt-8 text-lg text-white bg-black`}
        >
          Procced to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
