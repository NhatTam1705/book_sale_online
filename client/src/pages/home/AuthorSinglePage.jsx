import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getAuthorDetails } from '../../actions/authorActions';
import AuthorBookList from '../../components/layouts/home/author/authorBook/AuthorBookList';
import AuthorDetails from '../../components/layouts/home/author/authorDetails/AuthorDetails';

const AuthorSinglePage = () => {
  const { id } = useParams();
  const disptach = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, author, error } = useSelector(
    (state) => state.authorDetails
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      disptach(clearErrors);
    }

    disptach(getAuthorDetails(id));
  }, [disptach, enqueueSnackbar, error, id]);

  return (
    <>
      <div className="bg-[#fff6f6] px-12 py-24">
        <AuthorDetails author={author} loading={loading}></AuthorDetails>
      </div>
      <div className="px-12 py-24">
        <AuthorBookList></AuthorBookList>
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
