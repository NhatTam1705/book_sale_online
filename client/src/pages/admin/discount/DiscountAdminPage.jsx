import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport, MdOutlineLibraryAdd } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  clearErrors,
  deleteDiscount,
  getDiscountsPagination,
  newDiscount,
  updateDiscount,
} from '../../../actions/discountActions';
import Button from '../../../components/buttons/Button';
import DiscountItemAdmin, {
  DiscountItemAdminSkeleton,
} from '../../../components/layouts/admin/discount/DiscountItemAdmin';
import {
  DELETE_DISCOUNT_RESET,
  NEW_DISCOUNT_RESET,
  UPDATE_DISCOUNT_RESET,
} from '../../../constants/discountConstants';
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

const discountSchema = Yup.object({
  name: Yup.string().required('Please enter your discount name.'),
  percent: Yup.string().required('Please enter your discount percent.'),
});

const DiscountAdminPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('createdDate');
  const [sortBy, setSortBy] = useState('desc');
  const [action, setAction] = useState('create');
  const { error, loading, discounts, filteredDiscountsCount, discountsCount } =
    useSelector((state) => state.discounts);
  const { error: errorDiscount, success } = useSelector(
    (state) => state.newDiscount
  );
  const {
    error: errorUpdateOrDelete,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.discount);
  const [discountId, setDiscountId] = useState('');
  const numberPage = Math.ceil(
    (filteredDiscountsCount || discountsCount) / resPerPage
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
    setFocus,
  } = useForm({
    defaultValues: {
      name: '',
      percent: '',
    },
    resolver: yupResolver(discountSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors);
    }

    if (errorDiscount) {
      enqueueSnackbar(errorDiscount, { variant: 'error' });
      dispatch(clearErrors);
    }

    if (errorUpdateOrDelete) {
      enqueueSnackbar(errorUpdateOrDelete, { variant: 'error' });
      dispatch(clearErrors);
    }

    if (success) {
      setShow(false);
      dispatch({ type: NEW_DISCOUNT_RESET });
      reset();
    }

    if (isUpdated) {
      setShow(false);
      dispatch({ type: UPDATE_DISCOUNT_RESET });
      reset();
    }

    if (isDeleted) {
      enqueueSnackbar('Discount is deleted', { variant: 'success' });
      dispatch({ type: DELETE_DISCOUNT_RESET });
    }

    dispatch(
      getDiscountsPagination(
        resPerPage,
        currentPage,
        sortBy,
        orderBy,
        keywordDebounce
      )
    );
  }, [
    currentPage,
    dispatch,
    enqueueSnackbar,
    error,
    errorDiscount,
    errorUpdateOrDelete,
    isDeleted,
    isUpdated,
    keywordDebounce,
    orderBy,
    resPerPage,
    reset,
    sortBy,
    success,
  ]);

  const handleSort = () => {
    setSortBy('name');
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  const handleCreateOrUpdateDiscount = (data) => {
    if (action === 'create') {
      dispatch(newDiscount(data));
    } else {
      dispatch(updateDiscount(discountId, data));
    }
  };

  const handleDeleteDiscount = (id) => {
    dispatch(deleteDiscount(id));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Discounts</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => {
              setShow(true);
              setFocus('name');
              setAction('create');
            }}
            className="flex items-center gap-3 text-lg text-white bg-black "
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-500"></HiOutlinePlus>
            <span>Create new</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 bg-gray-50 rounded-lg text-lg p-6 col-span-2">
          <div className="flex flex-row justify-between">
            <div>
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-md indent-2 w-[300px] h-full"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
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
              <span>Name</span>
              <MdOutlineImportExport className="w-6 h-6 text-gray-500"></MdOutlineImportExport>
            </Button>
          </div>
          <hr />
          <div className="">
            <div className="grid grid-cols-12 pb-2">
              <span className="col-span-2">ID</span>
              <span className="col-span-5">Discount name</span>
              <span className="col-span-3">Discount percent</span>
              <span className="col-span-2">Action</span>
            </div>
            <hr />
            <div>
              {loading ? (
                <>
                  {Array(resPerPage)
                    .fill(0)
                    .map((item, index) => (
                      <DiscountItemAdminSkeleton
                        key={index}
                      ></DiscountItemAdminSkeleton>
                    ))}
                </>
              ) : (
                <>
                  {discounts.map((discount, index) => (
                    <DiscountItemAdmin
                      index={index}
                      key={discount._id}
                      discount={discount}
                      onClickDelete={() => handleDeleteDiscount(discount._id)}
                      onClickUpdate={() => {
                        setDiscountId(discount._id);
                        setValue('name', discount.name);
                        setValue('percent', discount.percent);
                        setAction('update');
                        setShow(true);
                      }}
                    ></DiscountItemAdmin>
                  ))}
                </>
              )}
            </div>
            <div className="flex justify-between pt-6">
              <div>
                {resPerPage < (filteredDiscountsCount || discountsCount) &&
                  filteredDiscountsCount !== 0 && (
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
                {discounts.length === 0 ? (
                  'No result'
                ) : (
                  <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                    resPerPage * currentPage > filteredDiscountsCount
                      ? filteredDiscountsCount
                      : resPerPage * currentPage
                  } of ${filteredDiscountsCount} result`}</>
                )}
              </div>
            </div>
          </div>
        </div>
        {show && (
          <>
            <form
              onSubmit={handleSubmit(handleCreateOrUpdateDiscount)}
              className="flex flex-col col-span-1 p-6 bg-gray-50 rounded-lg gap-6"
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div>
                <TextField
                  label="Discount Name"
                  className="bg-white w-full"
                  placeholder="New Discount Name"
                  name="name"
                  {...register('name')}
                />
                {errors?.name && (
                  <div className="text-sm text-red-500">
                    {errors.name?.message}
                  </div>
                )}
              </div>
              <div>
                <TextField
                  className="bg-white w-full"
                  placeholder="New Discount Percent"
                  name="percent"
                  label="Discount Percent"
                  {...register('percent')}
                />
                {errors?.percent && (
                  <div className="text-sm text-red-500">
                    {errors.percent?.message}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="col-span-1 mx-20 h-14 text-white flex items-center justify-around"
              >
                <MdOutlineLibraryAdd></MdOutlineLibraryAdd>
                <span>{action === 'create' ? 'Add' : 'Save'}</span>
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default DiscountAdminPage;
