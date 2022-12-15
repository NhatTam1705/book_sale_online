import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { MdOutlineImportExport } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUsersPagination } from '../../../actions/userActions';
import Button from '../../../components/buttons/Button';
import MetaData from '../../../components/dialogs/MetaData';
import CustomerCardAdmin, {
  CustomerCardAdminSkeleton,
} from '../../../components/layouts/admin/customer/CustomerCardAdmin';
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

const CustomerAdminPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortBy, setSortBy] = useState('createdDate');
  const [orderBy, setOrderBy] = useState('desc');
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);

  const { users, error, loading, usersCount, filteredUsersCount } = useSelector(
    (state) => state.users
  );

  const numberPage = Math.ceil((filteredUsersCount || usersCount) / resPerPage);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(
      getUsersPagination(
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
    error,
    keywordDebounce,
    orderBy,
    resPerPage,
  ]);

  const handleSort = () => {
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  return (
    <>
      <MetaData title="Customer - Admin"></MetaData>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Customers</h5>
        <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
          <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
          <span>Export</span>
        </Button>
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
              onChange={(event, value) => {
                setResPerPage(value.value);
                setCurrentPage(1);
              }}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Show" />}
            />
            <Button
              onClick={handleSort}
              className="flex items-center h-full gap-3 bg-white border border-gray-300"
            >
              <span>Date</span>
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
                  <div className="col-span-3 shadow-lg" key={index}>
                    <CustomerCardAdminSkeleton></CustomerCardAdminSkeleton>
                  </div>
                ))}
            </>
          ) : (
            <>
              {users &&
                users.map((user, index) => (
                  <div className="col-span-3 shadow-lg" key={user._id}>
                    <CustomerCardAdmin user={user}></CustomerCardAdmin>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="flex justify-between p-6">
          <div>
            {resPerPage < (filteredUsersCount || usersCount) &&
              filteredUsersCount !== 0 && (
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
            {users && users.length === 0 ? (
              'No result'
            ) : (
              <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                resPerPage * currentPage > filteredUsersCount
                  ? filteredUsersCount
                  : resPerPage * currentPage
              } of ${filteredUsersCount} result`}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAdminPage;
