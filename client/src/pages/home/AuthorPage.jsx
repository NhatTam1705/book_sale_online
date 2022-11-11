import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAuthors } from '../../actions/authorActions';
import AuthorList from '../../components/layouts/home/author/author/AuthorList';
import { withErrorBoundary } from 'react-error-boundary'

const AuthorPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { loading, authors, error, authorsCount } = useSelector(
    (state) => state.authors
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getAuthors());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <div className="px-12 py-24">
      <AuthorList
        loading={loading}
        authors={authors}
        authorsCount={authorsCount}
      ></AuthorList>
    </div>
  );
};

export default AuthorPage;
