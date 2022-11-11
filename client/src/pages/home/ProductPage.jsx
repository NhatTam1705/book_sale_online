import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthorDetails } from '../../actions/authorActions';
import { clearErrors, getProductDetials } from '../../actions/productActions';
import ProductDetails from '../../components/layouts/home/product/ProductDetails';
import ProductTab from '../../components/layouts/home/product/ProductTab';
import RelatedProductsList from '../../components/layouts/home/product/relatedProducts/RelatedProductsList';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const {
    loading,
    error: errorProduct,
    product,
  } = useSelector((state) => state.productDetails);
  const { error: errorAuthor, author } = useSelector(
    (state) => state.authorDetails
  );

  useEffect(() => {
    if (errorProduct || errorAuthor) {
      enqueueSnackbar(errorProduct || errorAuthor, {
        variant: 'error',
      });
      dispatch(clearErrors());
    }

    dispatch(getProductDetials(id));

    if (product.author !== undefined) {
      dispatch(getAuthorDetails(product.author));
    }
  }, [dispatch, enqueueSnackbar, errorProduct, errorAuthor, id, product]);

  return (
    <>
      <div className="px-12 pt-24 pb-12 bg-[#fff6f6]">
        <ProductDetails product={product} author={author}></ProductDetails>
      </div>
      <div className="flex flex-col gap-24 pb-24">
        <ProductTab product={product}></ProductTab>
        <RelatedProductsList></RelatedProductsList>
      </div>
    </>
  );
};

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(ProductPage, {
  FallbackComponent,
});
