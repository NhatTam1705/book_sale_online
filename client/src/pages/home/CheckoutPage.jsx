import Button from '../../components/buttons/Button';
import BillingDetailsCheckout from '../../components/layouts/home/checkout/BillingDetailsCheckout';
import SideBarCartTotalsCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarCartTotalsCheckout';
import SideBarCouponCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarCouponCheckout';
import SideBarPaymentCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarPaymentCheckout';
import SideBarShippingCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarShippingCheckout';
import SideBarYourOrderCheckout from '../../components/layouts/home/checkout/sildeBarCheckout/SideBarYourOrderCheckout';

const CheckoutPage = () => {
  return (
    <div className="grid grid-cols-12 gap-8 px-12 py-24 bg-[#fff6f6]">
      <h1 className="col-span-12 text-4xl font-semibold text-center">
        Checkout
      </h1>
      <div className="col-span-8">
        <BillingDetailsCheckout></BillingDetailsCheckout>
      </div>
      <div className="col-span-4">
        <SideBarYourOrderCheckout></SideBarYourOrderCheckout>
        <SideBarCartTotalsCheckout></SideBarCartTotalsCheckout>
        <SideBarShippingCheckout></SideBarShippingCheckout>
        <SideBarCouponCheckout></SideBarCouponCheckout>
        <div className="grid grid-cols-2 px-8 py-6 text-xl bg-white border border-gray-300">
          <span className="col-span-1 font-semibold text-left">Total</span>
          <span className="col-span-1 font-semibold text-right">99.99$</span>
        </div>
        <SideBarPaymentCheckout></SideBarPaymentCheckout>
        <Button className="w-full h-16 mt-8 text-lg text-white bg-black">
          Place order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
