import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearErrors,
  deleteAuthor,
  getAuthorsPagination,
} from '../../../actions/authorActions';
import Button from '../../../components/buttons/Button';
import MetaData from '../../../components/dialogs/MetaData';
import AuthorCardAdmin, {
  AuthorCardAdminSkeleton,
} from '../../../components/layouts/admin/author/AuthorCardAdmin';
import { DELETE_AUTHOR_RESET } from '../../../constants/authorConstants';
import useDebounce from '../../../hooks/useDebounce';

const shows = [
  {
    label: 'Show 4',
    value: 4,
  },
  {
    label: 'Show 8',
    value: 8,
  },
  {
    label: 'Show 12',
    value: 12,
  },
  {
    label: 'Show 16',
    value: 16,
  },
];

const AuthorListPage = () => {
  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortBy, setSortBy] = useState('createdDate');
  const [orderBy, setOrderBy] = useState('desc');
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading, authors, filteredAuthorsCount, authorsCount } =
    useSelector((state) => state.authors);
  const { erorr: erorrDelete, isDeleted } = useSelector(
    (state) => state.author
  );

  const numberPage = Math.ceil(
    (filteredAuthorsCount || authorsCount) / resPerPage
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (erorrDelete) {
      enqueueSnackbar(erorrDelete, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: DELETE_AUTHOR_RESET });
      enqueueSnackbar('Author is deleted', { variant: 'success' });
    }

    dispatch(
      getAuthorsPagination(
        resPerPage,
        currentPage,
        'createdDate',
        orderBy,
        keywordDebounce
      )
    );
  }, [
    currentPage,
    dispatch,
    enqueueSnackbar,
    erorrDelete,
    error,
    isDeleted,
    keywordDebounce,
    orderBy,
    resPerPage,
  ]);

  const handleSort = () => {
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  const handleDeleteAuthor = (id) => {
    dispatch(deleteAuthor(id));
  };

  return (
    <>
      <MetaData title="Author List - Admin"></MetaData>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Authors</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => navigate('/admin/author')}
            className="flex items-center gap-3 text-lg text-white bg-black "
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-500"></HiOutlinePlus>
            <span>Create new</span>
          </Button>
        </div>
      </div>
      <div className="text-lg rounded-lg bg-gray-50">
        <div className="flex flex-row justify-between p-6">
          <div action="">
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-md indent-2 w-[400px]"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-3">
            <Autocomplete
              options={shows}
              className="bg-white"
              sx={{ width: 150 }}
              onChange={(event, value) => {
                setResPerPage(value.value);
                setCurrentPage(1);
              }}
              renderInput={(params) => <TextField {...params} label="Show" />}
            />
            <Button
              onClick={handleSort}
              className="flex items-center h-full gap-3 bg-white border border-gray-300"
            >
              <span>Last added</span>
              <MdOutlineImportExport className="w-6 h-6 text-gray-500"></MdOutlineImportExport>
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12 gap-4 p-6">
          {loading ? (
            <>
              {Array(resPerPage)
                .fill(0)
                .map((item, index) => (
                  <div
                    className="col-span-3 bg-white border border-gray-300 rounded-lg shadow-md"
                    key={index}
                  >
                    <AuthorCardAdminSkeleton></AuthorCardAdminSkeleton>
                  </div>
                ))}
            </>
          ) : (
            <>
              {authors.map((author, index) => (
                <div
                  className="col-span-3 bg-white border border-gray-300 rounded-lg shadow-md"
                  key={author._id}
                >
                  <AuthorCardAdmin
                    onClickDelete={() => handleDeleteAuthor(author._id)}
                    author={author}
                  ></AuthorCardAdmin>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-between p-6">
          <div>
            {resPerPage < (filteredAuthorsCount || authorsCount) &&
              filteredAuthorsCount !== 0 && (
                <Pagination
                  className=""
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  count={numberPage || 0}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                />
              )}
          </div>
          <div className="flex items-center">
            {authors.length === 0 ? (
              'No result'
            ) : (
              <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                resPerPage * currentPage > filteredAuthorsCount
                  ? filteredAuthorsCount
                  : resPerPage * currentPage
              } of ${filteredAuthorsCount} result`}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorListPage;
