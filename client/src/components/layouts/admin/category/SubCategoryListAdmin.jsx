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
  deleteSubCategory,
  getSubCategoriesPagination,
  newSubCategory,
  updateSubCategory,
} from '../../../../actions/subCategoryActions';
import {
  DELETE_SUB_CATEGORY_RESET,
  NEW_SUB_CATEGORY_RESET,
  UPDATE_SUB_CATEGORY_RESET,
} from '../../../../constants/subCategoryConstants';
import useDebounce from '../../../../hooks/useDebounce';
import Button from '../../../buttons/Button';
import SubCategoryItemAdmin, {
  SubCategoryItemAdminSkeleton,
} from './SubCategoryItemAdmin';

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

const subCategorySchema = Yup.object({
  name: Yup.string().required('Please enter your category name.'),
});

const SubCategoryListAdmin = ({ category }) => {
  const [show, setShow] = useState(false);
  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdDate');
  const [orderBy, setOrderBy] = useState('desc');
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const {
    subCategories,
    error,
    subCategoriesCount,
    filteredSubCategoriesCount,
    loading,
  } = useSelector((state) => state.subCategories);
  const { error: errorSubCategory, success } = useSelector(
    (state) => state.newSubCategory
  );
  const { error: errorUpdateSubCategory, isUpdated } = useSelector(
    (state) => state.subCategory
  );
  const numberPage = Math.ceil(
    (filteredSubCategoriesCount || subCategories) / resPerPage
  );
  const { error: errorDeleteSubCategory, isDeleted } = useSelector(
    (state) => state.subCategory
  );
  const handleDeleteSubCategory = (id) => {
    dispatch(deleteSubCategory(id));
  };

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [action, setAction] = useState('create');
  const [subCategoryUpdateId, setCubCategoryUpdateId] = useState('');

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
    resolver: yupResolver(subCategorySchema),
    mode: 'onChange',
  });

  const handleNewCategory = (data) => {
    if (category === '') {
      enqueueSnackbar('Please select category', { variant: 'warning' });
    } else {
      data.category = category;
      if (action === 'create') {
        dispatch(newSubCategory(data));
      } else {
        dispatch(updateSubCategory(subCategoryUpdateId, data));
      }
    }
  };

  const handleSort = () => {
    setSortBy('name');
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorSubCategory) {
      enqueueSnackbar(errorSubCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorUpdateSubCategory) {
      enqueueSnackbar(errorUpdateSubCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorDeleteSubCategory) {
      enqueueSnackbar(errorDeleteSubCategory, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      setShow(false);
      dispatch({ type: NEW_SUB_CATEGORY_RESET });
      reset();
    }

    if (isUpdated) {
      setShow(false);
      dispatch({ type: UPDATE_SUB_CATEGORY_RESET });
      reset();
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SUB_CATEGORY_RESET });
      enqueueSnackbar('Sub Category is deleted', { variant: 'success' });
    }
    dispatch(
      getSubCategoriesPagination(
        resPerPage,
        currentPage,
        sortBy,
        orderBy,
        keywordDebounce,
        category
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
    sortBy,
    success,
    reset,
    errorSubCategory,
    category,
    errorUpdateSubCategory,
    isUpdated,
    errorDeleteSubCategory,
    isDeleted,
  ]);

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Sub Categories</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 px-3">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => {
              setShow(true);
              setFocus('name');
            }}
            className="flex items-center gap-3 text-lg text-white bg-black px-3"
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
              onSubmit={handleSubmit(handleNewCategory)}
              className="grid grid-cols-4 gap-6"
              autoComplete="off"
            >
              <div className="col-span-3">
                <TextField
                  className="bg-white w-full"
                  placeholder="New Sub Category"
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
                className="col-span-1 text-white flex items-center justify-around"
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
            <span className="col-span-6">Sub category name</span>
            <span className="col-span-2">Action</span>
          </div>
          <hr />
          <div>
            {loading ? (
              <>
                {Array(resPerPage)
                  .fill(0)
                  .map((item, index) => (
                    <SubCategoryItemAdminSkeleton
                      key={index}
                    ></SubCategoryItemAdminSkeleton>
                  ))}
              </>
            ) : (
              <>
                {subCategories.map((subCategory, index) => (
                  <SubCategoryItemAdmin
                    index={index}
                    key={subCategory._id}
                    subCategory={subCategory}
                    onClickDelete={() =>
                      handleDeleteSubCategory(subCategory._id)
                    }
                    onClickUpdate={() => {
                      setShow(true);
                      setCubCategoryUpdateId(subCategory._id);
                      setValue('name', subCategory.name);
                      setAction('update');
                    }}
                  ></SubCategoryItemAdmin>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between pt-6">
            <div>
              {resPerPage <
                (filteredSubCategoriesCount || subCategoriesCount) &&
                filteredSubCategoriesCount !== 0 && (
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
              {subCategories.length === 0 ? (
                'No result'
              ) : (
                <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                  resPerPage * currentPage > filteredSubCategoriesCount
                    ? filteredSubCategoriesCount
                    : resPerPage * currentPage
                } of ${filteredSubCategoriesCount} result`}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryListAdmin;
