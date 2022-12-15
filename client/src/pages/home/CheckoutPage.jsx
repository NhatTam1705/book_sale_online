import { useSelector } from 'react-redux';
import Button from '../../components/buttons/Button';
import MetaData from '../../components/dialogs/MetaData';
import BillingDetailsCheckout from '../../components/layouts/home/checkout/BillingDetailsCheckout';
import SideBarCartTotalsCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarCartTotalsCheckout';
import SideBarCouponCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarCouponCheckout';
import SideBarPaymentCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarPaymentCheckout';
import SideBarShippingCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarShippingCheckout';
import SideBarYourOrderCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarYourOrderCheckout';

const CheckoutPage = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const price = cartItems.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        (item.discount ? item.price * (1 - item.discount / 100) : item.price),
    0
  );

  return (
    <>
      <MetaData title="Checkout"></MetaData>
      <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 grid-cols-12 gap-8 px-12 py-24 bg-[#fff6f6]">
        <h1 className="col-span-12 text-4xl font-semibold text-center">
          Checkout
        </h1>
        <div className="col-span-12 xl:col-span-8 lg:col-span-8 md:col-span-7 sm:col-span-12">
          <BillingDetailsCheckout></BillingDetailsCheckout>
        </div>
        <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-5 sm:col-span-12">
          <SideBarYourOrderCheckout
            cartItems={cartItems}
          ></SideBarYourOrderCheckout>
          <SideBarShippingCheckout price={price}></SideBarShippingCheckout>
          <SideBarCartTotalsCheckout price={price}></SideBarCartTotalsCheckout>
          {/* <SideBarCouponCheckout></SideBarCouponCheckout> */}
          <div className="grid grid-cols-2 px-8 py-6 text-xl bg-white border border-gray-300">
            <span className="col-span-1 font-semibold text-left">Total</span>
            <span className="col-span-1 font-semibold text-right">
              {price > 200 ? price : Number(price + 25).toFixed(2)}$
            </span>
          </div>
          <SideBarPaymentCheckout price={price}></SideBarPaymentCheckout>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
