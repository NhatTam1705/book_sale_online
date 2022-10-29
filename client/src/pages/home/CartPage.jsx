import Button from '../../components/buttons/Button';
import ListCart from '../../components/layouts/home/cart/listCart/ListCart';
import SideBarCartCoupon from '../../components/layouts/home/cart/sideBarCart/SideBarCartCoupon';
import SideBarCartShipping from '../../components/layouts/home/cart/sideBarCart/SideBarCartShipping';
import SideBarCartTotals from '../../components/layouts/home/cart/sideBarCart/SideBarCartTotals';

const CartPage = () => {
  return (
    <div className="grid grid-cols-8 gap-8 px-12 py-24 bg-[#fff6f6]">
      <h1 className="col-span-8 text-4xl font-semibold text-center">
        Your cart: 3 items
      </h1>
      <div className="col-span-6">
        <ListCart></ListCart>
      </div>
      <div className="col-span-2">
        <SideBarCartTotals></SideBarCartTotals>
        <SideBarCartShipping></SideBarCartShipping>
        <SideBarCartCoupon></SideBarCartCoupon>
        <div className="grid grid-cols-2 px-8 py-6 text-xl bg-white border border-gray-300">
          <span className="col-span-1 font-semibold text-left">Total</span>
          <span className="col-span-1 font-semibold text-right">99.99$</span>
        </div>
        <Button className="w-full h-16 mt-8 text-lg text-white bg-black">
          Procced to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
