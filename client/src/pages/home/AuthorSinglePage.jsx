import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors as clearErrorsAuthor,
  getAuthorDetails,
} from '../../actions/authorActions';
import { clearErrors, getProducts } from '../../actions/productActions';
import MetaData from '../../components/dialogs/MetaData';
import AuthorBookList from '../../components/layouts/home/author/authorBook/AuthorBookList';
import AuthorDetails from '../../components/layouts/home/author/authorDetails/AuthorDetails';

const AuthorSinglePage = () => {
  const { id } = useParams();
  const disptach = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, author, error } = useSelector(
    (state) => state.authorDetails
  );
  const {
    products,
    loadinf: loadingProduct,
    error: errorProduct,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      disptach(clearErrorsAuthor());
    }

    if (errorProduct) {
      enqueueSnackbar(errorProduct, { variant: 'error' });
      disptach(clearErrors());
    }

    disptach(getAuthorDetails(id));
    disptach(getProducts());
  }, [disptach, enqueueSnackbar, error, errorProduct, id]);

  return (
    <>
      <MetaData title="Author Single"></MetaData>
      <div className="bg-[#fff6f6] px-12 py-24">
        <AuthorDetails
          products={products}
          authorId={author._id}
          loadingProduct={loadingProduct}
          author={author}
          loading={loading}
        ></AuthorDetails>
      </div>
      <div className="px-12 py-24">
        <AuthorBookList
          products={products}
          author={author._id}
          loading={loadingProduct}
        ></AuthorBookList>
      </div>
    </>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(AuthorSinglePage, FallbackComponent);
