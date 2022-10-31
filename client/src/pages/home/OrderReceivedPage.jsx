const OrderReceivedPage = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-24 bg-[#fff6f6]">
      <h1 className="col-span-8 text-4xl font-semibold text-center">
        Order Received
      </h1>
      <div className="flex flex-col w-full max-w-4xl gap-8 p-8 mx-auto bg-white">
        <h5 className="text-xl font-semibold text-center">
          Thank you. Your order has been received.
        </h5>
        <div className="grid grid-cols-12">
          <div className="flex flex-col col-span-3 text-lg">
            <span className="font-semibold">Order Id:</span>
            <span className="text-base">123</span>
          </div>
          <div className="flex flex-col col-span-3 text-lg">
            <span className="font-semibold">Date:</span>
            <span className="text-base">May 17, 2001</span>
          </div>
          <div className="flex flex-col col-span-3 text-lg">
            <span className="font-semibold">Total:</span>
            <span className="text-base">$114</span>
          </div>
          <div className="flex flex-col col-span-3 text-lg">
            <span className="font-semibold">Payment method:</span>
            <span className="text-base">Direct bank transfer</span>
          </div>
        </div>
        <hr />
        <h5 className="text-xl font-semibold text-center">Order details</h5>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <h6 className="text-lg">The Overdue Life of Amy Byler</h6>
              <h6 className="text-base text-gray-600">(Paperback, English)</h6>
            </div>
            <span className="col-span-1 col-start-8">x3</span>
            <span className="col-span-1 col-start-12 text-right">$114</span>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <h6 className="text-lg">The Overdue Life of Amy Byler</h6>
              <h6 className="text-base text-gray-600">(Paperback, English)</h6>
            </div>
            <span className="col-span-1 col-start-8">x3</span>
            <span className="col-span-1 col-start-12 text-right">$114</span>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <h6 className="text-lg">The Overdue Life of Amy Byler</h6>
              <h6 className="text-base text-gray-600">(Paperback, English)</h6>
            </div>
            <span className="col-span-1 col-start-8">x3</span>
            <span className="col-span-1 col-start-12 text-right">$114</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-left">Subtotal:</span>
            <span className="text-base text-right">$100</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-left">Shipping:</span>
            <span className="text-base text-right">Free Shipping</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-left">
              Payment Method:
            </span>
            <span className="text-base text-right">Direct bank transfer</span>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2">
          <span className="text-lg font-semibold text-left">Total:</span>
          <span className="text-base text-right">$114</span>
        </div>
        <hr />
        <h5 className="text-xl font-semibold text-center">Delivery address</h5>
        <h6 className="text-base">
          117 ấp Bình Hòa, xã Tân Lân, huyện Cần Đước, tỉnh Long An
        </h6>
      </div>
    </div>
  );
};

export default OrderReceivedPage;
