import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../../../actions/cartActions';
import Button from '../../../../buttons/Button';

const WishlistProfile = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  return (
    <div>
      <h3 className="mb-6 text-4xl font-semibold">Wishlist</h3>
      <div className="grid grid-cols-7 p-4 text-lg font-semibold border border-gray-300 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-9 sm:grid-cols-9">
        <span className="col-span-2 xl:col-span-6 lg:col-span-6 md:col-span-4 sm:col-span-4">
          Product
        </span>
        <span className="col-span-2">Price</span>
        <span className="col-span-2">Stock Status</span>
        <span className="col-span-2">Actions</span>
      </div>
      <div>
        {wishlistItems !== undefined &&
          wishlistItems.map((product, index) => (
            <WishItem key={product.product} product={product}></WishItem>
          ))}
      </div>
    </div>
  );
};

const WishItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { product: id, name, author, discount, image, price, stock } = product;
  const handleAddToCart = () => {
    dispatch(addItemToCart(id, 1));
    enqueueSnackbar('Item added to cart!', { variant: 'success' });
  };
  return (
    <div className="grid items-center grid-cols-5 p-8 border border-gray-300 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-5 sm:grid-cols-5">
      <div className="grid grid-cols-9 col-span-5 gap-5 xl:col-span-6 lg:col-span-6 md:col-span-5 sm:col-span-5 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-9 sm:grid-cols-9">
        <img
          src={image}
          alt=""
          className="xl:col-span-3 lg:col-span-3 md:col-span-9 sm:col-span-9 col-span-9"
        />
        <div className="flex flex-col justify-center col-span-9 gap-1">
          <h5
            onClick={() => navigate(`/shop/product/${id}`)}
            className="text-lg font-medium text-red-500 cursor-pointer hover:text-red-600"
          >
            {name}
          </h5>
          <h5
            onClick={() => navigate(`/author/${author._id}`)}
            className="text-base text-gray-500 cursor-pointer hover:text-red-500"
          >
            {author.name}
          </h5>
        </div>
      </div>
      <div className="flex flex-row text-lg font-medium col-span-2 gap-5">
        <h5 className={` ${discount !== 0 ? 'text-red-600 line-through' : ''}`}>
          ${price}
        </h5>
        {discount !== 0 && (
          <h5 className="">${price - (price * discount) / 100}</h5>
        )}
      </div>
      <span className="col-span-2 text-lg">
        {stock > 0 ? 'In Stock' : 'Out Of Stock'}
      </span>
      <Button onClick={handleAddToCart} className="col-span-2 text-white">
        Add To Cart
      </Button>
    </div>
  );
};

export default WishlistProfile;
