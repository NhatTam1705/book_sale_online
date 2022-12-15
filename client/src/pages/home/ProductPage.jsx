import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetials,
  getProducts,
} from '../../actions/productActions';
import MetaData from '../../components/dialogs/MetaData';
import ProductDetails from '../../components/layouts/home/product/ProductDetails';
import ProductTab from '../../components/layouts/home/product/ProductTab';
import RelatedProductsList from '../../components/layouts/home/product/relatedProducts/RelatedProductsList';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    products,
    erorr: errorProduct,
    productsCount,
    loading: loadingProduct,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
      dispatch(clearErrors());
    }

    if (errorProduct) {
      enqueueSnackbar(errorProduct, {
        variant: 'error',
      });
      dispatch(clearErrors());
    }

    dispatch(getProductDetials(id));
    dispatch(getProducts());
  }, [dispatch, enqueueSnackbar, error, errorProduct, id]);

  return (
    <>
      <MetaData title="Product"></MetaData>
      <div className="px-12 pt-24 pb-12 bg-[#fff6f6]">
        <ProductDetails product={product}></ProductDetails>
      </div>
      <div className="flex flex-col gap-24 pb-24">
        <ProductTab product={product}></ProductTab>
        <RelatedProductsList
          product={product._id}
          category={product.category}
          products={products}
          loading={loadingProduct}
        ></RelatedProductsList>
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
