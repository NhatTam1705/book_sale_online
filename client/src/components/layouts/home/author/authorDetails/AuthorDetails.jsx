import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import BookCard from './BookCard';

const AuthorDetails = ({
  author,
  loading,
  products,
  loadingProduct,
  authorId,
}) => {
  const { name, introduce, avatar } = author;
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="xl:col-span-3 lg:col-span-4 md:col-span-5 sm:col-span-6 col-span-12">
        <img src={avatar && avatar.url} alt={name} className="w-full" />
      </div>
      <div className="xl:col-span-9 lg:col-span-8 md:col-span-7 sm:col-span-6 col-span-12 flex flex-col gap-4">
        <h4 className="text-3xl font-normal">{name}</h4>
        <p>{introduce}</p>
        <div className="grid grid-cols-12 gap-1">
          {products.length > 0 &&
            products.map(
              (product, index) =>
                product.author._id === authorId && (
                  <div
                    key={product._id}
                    className="xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 bg-white"
                  >
                    <BookCard product={product}></BookCard>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

AuthorDetails.PropsTypes = {
  author: PropsTypes.shape({
    name: PropsTypes.string,
    introduce: PropsTypes.string,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with component
    </p>
  );
};

export default withErrorBoundary(AuthorDetails, FallbackComponent);
