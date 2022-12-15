import CartItem from './CartItem';

const ListCart = ({ cartItems }) => {
  return (
    <>
      <div className="grid xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-9 sm:grid-cols-8 grid-cols-7 p-5 text-lg font-semibold bg-white border border-gray-300">
        <span className="xl:col-span-5 lg:col-span-5 md:col-span-4 sm:col-span-3 col-span-2">
          Product
        </span>
        <span className="col-span-1">Price</span>
        <span className="col-span-2">Quantity</span>
        <span className="col-span-1">Total</span>
      </div>
      <div>
        {cartItems &&
          cartItems.map((item, index) => (
            <CartItem key={item.product} item={item}></CartItem>
          ))}
      </div>
    </>
  );
};

export default ListCart;
