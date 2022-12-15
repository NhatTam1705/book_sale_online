import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport, MdOutlineLibraryAdd } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  clearErrors,
  deleteAdvertisement,
  getAdvertisementsPagination,
  newAdvertisement,
  updateAdvertisement,
} from '../../../actions/advertisementActions';
import Background from '../../../assets/images/Slider_1.png';
import Button from '../../../components/buttons/Button';
import MetaData from '../../../components/dialogs/MetaData';
import AdvertisementItemAdmin, {
  AdvertisementItemAdminSkeleton,
} from '../../../components/layouts/admin/advertisement/AdvertisementItemAdmin';
import {
  DELETE_ADVERTISEMENT_RESET,
  NEW_ADVERTISEMENT_RESET,
  UPDATE_ADVERTISEMENT_RESET,
} from '../../../constants/advertisementConstants';
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

const advertisementSchema = Yup.object({
  name: Yup.string().required('Please enter your advertisement name.'),
  description: Yup.string().required(
    'Please enter your advertisement description.'
  ),
});

const AdAdminPage = () => {
  const [backgroundReview, setBackgroundReview] = useState(Background);
  const [background, setBackground] = useState('');
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
  const inputRef = useRef();
  const {
    error,
    loading,
    advertisements,
    filteredAdvertisementsCount,
    advertisementsCount,
  } = useSelector((state) => state.advertisements);
  const {
    error: errorAdvertisement,
    success,
    loading: loadingNew,
  } = useSelector((state) => state.newAdvertisement);
  const {
    error: errorUpdateOrDelete,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.advertisement);
  const [advertisementId, setAdvertisementId] = useState('');
  const numberPage = Math.ceil(
    (filteredAdvertisementsCount || advertisementsCount) / resPerPage
  );
  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBackgroundReview(reader.result);
        setBackground(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
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
      description: '',
    },
    resolver: yupResolver(advertisementSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorAdvertisement) {
      enqueueSnackbar(errorAdvertisement, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorUpdateOrDelete) {
      enqueueSnackbar(errorUpdateOrDelete, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      setShow(false);
      dispatch({ type: NEW_ADVERTISEMENT_RESET });
      reset();
    }

    if (isUpdated) {
      setShow(false);
      dispatch({ type: UPDATE_ADVERTISEMENT_RESET });
      reset();
    }

    if (isDeleted) {
      enqueueSnackbar('Advertisemet is deleted', { variant: 'success' });
      dispatch({ type: DELETE_ADVERTISEMENT_RESET });
    }

    dispatch(
      getAdvertisementsPagination(
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
    errorAdvertisement,
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

  const handleCreateOrUpdateAdvertisement = (data) => {
    data.image = background;
    if (action === 'create') {
      dispatch(newAdvertisement(data));
    } else {
      dispatch(updateAdvertisement(advertisementId, data));
    }
  };

  const handleDeleteAdvertisement = (id) => {
    dispatch(deleteAdvertisement(id));
  };

  return (
    <>
      <MetaData title="Advertisement - Admin"></MetaData>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Advertisements</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => {
              setShow(true);
              setFocus('name');
              setValue('name', '');
              setValue('description', '');
              setBackgroundReview(Background);
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
            <div className="grid grid-cols-9 gap-2 pb-2">
              <span className="col-span-2">Image</span>
              <span className="col-span-3">Advertisement name</span>
              <span className="col-span-3">Advertisement description</span>
              <span className="col-span-1">Action</span>
            </div>
            <hr />
            <div>
              {loading ? (
                <>
                  {Array(resPerPage)
                    .fill(0)
                    .map((item, index) => (
                      <AdvertisementItemAdminSkeleton
                        key={index}
                      ></AdvertisementItemAdminSkeleton>
                    ))}
                </>
              ) : (
                <>
                  {advertisements &&
                    advertisements.map((advertisement, index) => (
                      <AdvertisementItemAdmin
                        key={advertisement._id}
                        advertisement={advertisement}
                        onClickDelete={() =>
                          handleDeleteAdvertisement(advertisement._id)
                        }
                        onClickUpdate={() => {
                          setAdvertisementId(advertisement._id);
                          setValue('name', advertisement.name);
                          setValue('description', advertisement.description);
                          setAction('update');
                          setBackgroundReview(advertisement.image.url);
                          setShow(true);
                        }}
                      ></AdvertisementItemAdmin>
                    ))}
                </>
              )}
            </div>
            <div className="flex justify-between pt-6">
              <div>
                {resPerPage <
                  (filteredAdvertisementsCount || advertisementsCount) &&
                  filteredAdvertisementsCount !== 0 && (
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
                {advertisements && advertisements.length === 0 ? (
                  'No result'
                ) : (
                  <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                    resPerPage * currentPage > filteredAdvertisementsCount
                      ? filteredAdvertisementsCount
                      : resPerPage * currentPage
                  } of ${filteredAdvertisementsCount} result`}</>
                )}
              </div>
            </div>
          </div>
        </div>
        {show && (
          <>
            <form
              onSubmit={handleSubmit(handleCreateOrUpdateAdvertisement)}
              className="flex flex-col col-span-1 p-6 bg-gray-50 rounded-lg gap-6"
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div>
                <TextField
                  label="Advertisement Name"
                  className="bg-white w-full"
                  placeholder="New Advertisement Name"
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
                <div className="p-4 bg-white border border-gray-300 rounded-md">
                  <textarea
                    name="description"
                    id="description"
                    rows="3"
                    {...register('description')}
                    className="w-full resize-none"
                    placeholder="Full Description"
                  ></textarea>
                </div>
                {errors?.description && (
                  <div className="text-sm text-red-500">
                    {errors.description?.message}
                  </div>
                )}
              </div>
              <div>
                <img
                  src={backgroundReview}
                  alt="Background Advertisement"
                  className="w-56 h-56 rounded-full mx-auto object-cover"
                />
                <div className="w-full flex justify-center pt-4">
                  <Button
                    disabledButton={loadingNew}
                    onClick={() => inputRef.current.click()}
                    className={`w-32 py-2 mx-auto bg-white border border-gray ${
                      loadingNew ? 'cursor-not-allowed bg-gray-300' : ''
                    }`}
                  >
                    Upload
                  </Button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
              <Button
                disabledButton={loading}
                type="submit"
                className={`col-span-1 mx-20 h-14 text-white flex items-center justify-around ${
                  loading ? 'cursor-not-allowed bg-gray-300' : ''
                }`}
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

export default AdAdminPage;
