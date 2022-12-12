import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport, MdOutlineLibraryAdd } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  clearErrors,
  deleteCategory,
  getCategoriesPagination,
  newCategory,
  updateCategory,
} from '../../../../actions/categoryActions';
import {
  DELETE_CATEGORY_RESET,
  NEW_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from '../../../../constants/categoryConstants';
import useDebounce from '../../../../hooks/useDebounce';
import Button from '../../../buttons/Button';
import CategoryItemAdmin, {
  CategoryItemAdminSkeleton,
} from './CategoryItemAdmin';

const categorySchema = Yup.object({
  name: Yup.string().required('Please enter your category name.'),
});

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

const CategoryListAdmin = ({ fallbackCategory }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    categories,
    error,
    categoriesCount,
    filteredCategoriesCount,
    loading,
  } = useSelector((state) => state.categories);
  const [categoryId, setCategoryId] = useState(
    (categories.length !== 0 && categories[0]._id) || ''
  );
  useEffect(() => {
    fallbackCategory(categoryId);
  }, [categoryId, fallbackCategory]);
  const { error: errorCategory, success } = useSelector(
    (state) => state.newCategory
  );
  const { error: errorUpdateCategory, isUpdated } = useSelector(
    (state) => state.category
  );
  const { error: errorDeleteCategory, isDeleted } = useSelector(
    (state) => state.category
  );
  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdDate');
  const [orderBy, setOrderBy] = useState('desc');
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const [action, setAction] = useState('create');
  const [categoryUpdateId, setCategoryUpdateId] = useState('');

  const numberPage = Math.ceil(
    (filteredCategoriesCount || categoriesCount) / resPerPage
  );
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(categorySchema),
    mode: 'onChange',
  });

  const handleCreateOrUpdateCategory = (data) => {
    if (action === 'create') {
      dispatch(newCategory(data));
    } else {
      dispatch(updateCategory(categoryUpdateId, data));
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorCategory) {
      enqueueSnackbar(errorCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorUpdateCategory) {
      enqueueSnackbar(errorUpdateCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorDeleteCategory) {
      enqueueSnackbar(errorDeleteCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      setShow(false);
      dispatch({ type: NEW_CATEGORY_RESET });
      reset();
    }

    if (isUpdated) {
      setShow(false);
      dispatch({ type: UPDATE_CATEGORY_RESET });
      reset();
    }

    if (isDeleted) {
      enqueueSnackbar('Category is deleted', { variant: 'success' });
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(
      getCategoriesPagination(
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
    errorCategory,
    keywordDebounce,
    orderBy,
    resPerPage,
    sortBy,
    success,
    reset,
    errorUpdateCategory,
    isUpdated,
    errorDeleteCategory,
    isDeleted,
  ]);

  const handleSort = () => {
    setSortBy('name');
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Categories</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => {
              setShow(true);
              setFocus('name');
            }}
            className="flex items-center gap-3 text-lg text-white bg-black "
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-500"></HiOutlinePlus>
            <span>Create new</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-gray-50 rounded-lg text-lg p-6">
        <div className="flex flex-row justify-between">
          <div>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-md indent-2 w-[200px] h-full"
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
        {show && (
          <>
            <form
              onSubmit={handleSubmit(handleCreateOrUpdateCategory)}
              className="grid grid-cols-4 gap-6"
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="col-span-3">
                <TextField
                  className="bg-white w-full"
                  placeholder="New Category"
                  name="name"
                  {...register('name')}
                />
                {errors?.name && (
                  <div className="text-sm text-red-500">
                    {errors.name?.message}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="col-span-1 h-14 text-white flex items-center justify-around"
              >
                <MdOutlineLibraryAdd></MdOutlineLibraryAdd>
                <span>{action === 'create' ? 'Add' : 'Save'}</span>
              </Button>
            </form>
            <hr />
          </>
        )}
        <div>
          <div className="grid grid-cols-12 pb-2">
            <span className="col-start-2 col-span-2">Number</span>
            <span className="col-span-6">Category name</span>
            <span className="col-span-2">Action</span>
          </div>
          <hr />
          <div>
            {loading ? (
              <>
                {Array(resPerPage)
                  .fill(0)
                  .map((item, index) => (
                    <CategoryItemAdminSkeleton
                      key={index}
                    ></CategoryItemAdminSkeleton>
                  ))}
              </>
            ) : (
              <>
                {categories.map((category, index) => (
                  <CategoryItemAdmin
                    onClickViewDetails={() => setCategoryId(category._id)}
                    index={index}
                    key={category._id}
                    category={category}
                    onClickDelete={() => handleDeleteCategory(category._id)}
                    onClickUpdate={() => {
                      setCategoryUpdateId(category._id);
                      setValue('name', category.name);
                      setAction('update');
                      setShow(true);
                    }}
                  ></CategoryItemAdmin>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between pt-6">
            <div>
              {resPerPage < (filteredCategoriesCount || categoriesCount) &&
                filteredCategoriesCount !== 0 && (
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
              {categories.length === 0 ? (
                'No result'
              ) : (
                <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                  resPerPage * currentPage > filteredCategoriesCount
                    ? filteredCategoriesCount
                    : resPerPage * currentPage
                } of ${filteredCategoriesCount} result`}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryListAdmin;
