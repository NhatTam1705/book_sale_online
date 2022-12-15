import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAuthorsPagination } from '../../actions/authorActions';
import MetaData from '../../components/dialogs/MetaData';
import AuthorList from '../../components/layouts/home/author/author/AuthorList';

const AuthorPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [show, setShow] = useState(5);
  const [keyword, setKeyword] = useState('');
  const fallbackAuthor = useCallback((sho, key) => {
    setShow(sho);
    setKeyword(key);
  }, []);

  const { loading, authors, error, authorsCount } = useSelector(
    (state) => state.authors
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getAuthorsPagination(show, 1, 'createdDate', 'desc', keyword));
  }, [dispatch, error, enqueueSnackbar, show, keyword]);

  return (
    <>
      <MetaData title="Author"></MetaData>
      <div className="px-12 py-24">
        <AuthorList
          fallbackAuthor={fallbackAuthor}
          loading={loading}
          authors={authors}
          authorsCount={authorsCount}
        ></AuthorList>
      </div>
    </>
  );
};

export default AuthorPage;
