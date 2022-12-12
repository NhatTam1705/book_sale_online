import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as Yup from 'yup';
import {
  clearErrors as clearErrorsAuthor,
  getAuthors,
} from '../../../actions/authorActions';
import {
  clearErrors as clearErrorsCategory,
  getCategories,
} from '../../../actions/categoryActions';
import {
  clearErrors as clearErrorsDiscount,
  getDiscounts,
} from '../../../actions/discountActions';
import { clearErrors, newProduct } from '../../../actions/productActions';
import {
  clearErrors as clearErrorsSubCategory,
  getSubCategories,
} from '../../../actions/subCategoryActions';
import Button from '../../../components/buttons/Button';
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants';

const productSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  publishing: Yup.string(),
  issuing: Yup.string(),
  stock: Yup.number(),
  costPrice: Yup.number(),
  soldPrice: Yup.number(),
  page: Yup.number(),
  weight: Yup.number(),
});

const languages = [
  {
    label: 'English',
    value: 'English',
  },
  {
    label: 'Vietnamese',
    value: 'Vietnamese',
  },
];

const formats = [
  {
    label: 'Hard cover',
    value: 'Hard cover',
  },
  {
    label: 'Paper back',
    value: 'Paper back',
  },
];

const AddProductPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [discount, setDiscount] = useState('');
  const [language, setLanguage] = useState('');
  const [format, setFormat] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const inputRef = useRef();
  const { error: errorCategory, categories } = useSelector(
    (state) => state.categories
  );
  const { error: errorSubCategory, subCategories } = useSelector(
    (state) => state.subCategories
  );
  const { error: errorAuthor, authors } = useSelector((state) => state.authors);
  const { error: errorDiscount, discounts } = useSelector(
    (state) => state.discounts
  );
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      navigate('/admin/products');
      enqueueSnackbar('Product created successfully', { variant: 'success' });
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, enqueueSnackbar, error, navigate, success]);

  useEffect(() => {
    if (errorCategory) {
      enqueueSnackbar(errorCategory, { variant: 'error' });
      dispatch(clearErrorsCategory());
    }
    dispatch(getCategories());
  }, [dispatch, enqueueSnackbar, errorCategory]);

  useEffect(() => {
    if (errorSubCategory) {
      enqueueSnackbar(errorSubCategory, { variant: 'error' });
      dispatch(clearErrorsSubCategory());
    }
    dispatch(getSubCategories('', categoryId));
  }, [dispatch, enqueueSnackbar, errorSubCategory, categoryId]);

  useEffect(() => {
    if (errorAuthor) {
      enqueueSnackbar(errorAuthor, { variant: 'error' });
      dispatch(clearErrorsAuthor());
    }
    dispatch(getAuthors());
  }, [dispatch, enqueueSnackbar, errorAuthor]);

  useEffect(() => {
    if (errorDiscount) {
      enqueueSnackbar(errorDiscount, { variant: 'error' });
      dispatch(clearErrorsDiscount());
    }
    dispatch(getDiscounts());
  }, [dispatch, enqueueSnackbar, errorDiscount]);

  const [formProduct, setFormProduct] = useState({
    name: '',
    description: '',
    publishing: '',
    issuing: '',
    stock: '',
    costPrice: '',
    soldPrice: '',
    page: '',
    weight: '',
  });
  const { handleSubmit, register } = useForm({
    defaultValues: formProduct,
    resolver: yupResolver(productSchema),
    mode: 'onChange',
  });

  const handleChange = (event) => {
    const files = Array.from(event.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCreateProduct = () => {
    const formData = new FormData();

    formData.set('name', formProduct.name);
    formData.set('description', formProduct.description);
    formData.set('publishing', formProduct.publishing);
    formData.set('issuing', formProduct.issuing);
    formData.set('language', language);
    formData.set('format', format);
    formData.set('page', formProduct.page);
    formData.set('weight', formProduct.weight);
    formData.set('costPrice', formProduct.costPrice);
    formData.set('soldPrice', formProduct.soldPrice);
    formData.set('stock', formProduct.stock);
    formData.set('category', category);
    formData.set('author', author);
    if (discount !== '') {
      formData.set('discount', discount);
    }
    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(newProduct(formData));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Add Product</h5>
      </div>
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        autoComplete="off"
        encType="multipart/form-data"
        className="flex flex-col gap-6 p-6 text-lg rounded-lg bg-gray-50"
      >
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">1. General info</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Product Name</label>
              <TextField
                id="name"
                name="name"
                {...register('name')}
                onChange={(event) =>
                  setFormProduct({
                    ...formProduct,
                    [event.target.name]: event.target.value,
                  })
                }
                className="bg-white"
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Full Description</label>
              <div className="p-4 bg-white border border-gray-300 rounded-md">
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  {...register('description')}
                  onChange={(event) =>
                    setFormProduct({
                      ...formProduct,
                      [event.target.name]: event.target.value,
                    })
                  }
                  className="w-full resize-none"
                  placeholder="Full Description"
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="publishing">Publishing House</label>
                  <TextField
                    id="publishing"
                    name="publishing"
                    {...register('publishing')}
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                    placeholder="Publishing House"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="issuing">Issuing Company</label>
                  <TextField
                    id="issuing"
                    name="issuing"
                    {...register('issuing')}
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                    placeholder="Issuing Company"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="language">Product Language</label>
                  <Autocomplete
                    id="language"
                    options={languages}
                    className="w-full bg-white"
                    onChange={(event, value) => setLanguage(value.value)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Product Language" />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="format">Product Format</label>
                  <Autocomplete
                    id="format"
                    options={formats}
                    onChange={(event, value) => setFormat(value.value)}
                    className="w-full bg-white"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Product Format" />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="page">Total Page</label>
                  <TextField
                    id="page"
                    name="page"
                    {...register('page')}
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                    placeholder="Total Page"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="weight">Product Weight</label>
                  <TextField
                    id="weight"
                    name="weight"
                    {...register('weight')}
                    placeholder="Product Weight"
                    className="bg-white"
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                  ></TextField>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">2. Pricing & Amount</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="costPrice">Cost Price</label>
                  <TextField
                    id="costPrice"
                    name="costPrice"
                    {...register('costPrice')}
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                    className="bg-white"
                    placeholder="$ Cost Price"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="soldPrice">Sold Price</label>
                  <TextField
                    id="soldPrice"
                    name="soldPrice"
                    {...register('soldPrice')}
                    className="bg-white"
                    onChange={(event) =>
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      })
                    }
                    placeholder="$ Sold Price"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="amount">Amount</label>
                  <TextField
                    id="amount"
                    name="stock"
                    {...register('stock')}
                    onChange={(event) => {
                      setFormProduct({
                        ...formProduct,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    className="bg-white"
                    placeholder="Amount"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">3. Category</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="flex flex-col col-span-6 gap-1">
                <label htmlFor="category">Category</label>
                <Autocomplete
                  id="category"
                  options={categories || []}
                  getOptionLabel={(option) => option.name || ''}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, value) => {
                    setCategoryId(String(value ? value._id : ''));
                  }}
                  className="bg-white w-full"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Category" />
                  )}
                />
              </div>
              <div className="flex flex-col col-span-6 gap-1">
                <label htmlFor="subCategory">SubCategory</label>
                <Autocomplete
                  name="category"
                  id="subCategory"
                  options={subCategories || []}
                  getOptionLabel={(option) => option.name || ''}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, value) => {
                    setCategory(String(value ? value._id : ''));
                  }}
                  className="bg-white w-full"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Sub Category" />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">4. Author & Discount</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="flex flex-col col-span-6 gap-1">
                <label htmlFor="author">Author</label>
                <Autocomplete
                  name="author"
                  id="author"
                  options={authors || []}
                  getOptionLabel={(option) => option.name || ''}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, value) =>
                    setAuthor(String(value ? value._id : ''))
                  }
                  className="bg-white w-full"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Author" />
                  )}
                />
              </div>
              <div className="flex flex-col col-span-6 gap-1">
                <label htmlFor="discount">Discount</label>
                <Autocomplete
                  name="discount"
                  id="discount"
                  options={discounts || []}
                  getOptionLabel={(option) => option.name || ''}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, value) =>
                    setDiscount(String(value ? value._id : ''))
                  }
                  className="bg-white w-full"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Discount" />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">5. Media</h6>
          <div className="flex flex-col col-span-9 gap-1">
            <Button
              onClick={() => inputRef.current.click()}
              className="w-32 py-2 bg-white border border-gray"
            >
              Upload
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleChange}
              multiple
            />
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="w-full mySwiper"
            >
              {imagesPreview &&
                imagesPreview.map((image, index) => (
                  <SwiperSlide key={image} className="max-w-[50%] ">
                    <img src={image} alt="Review" className="w-full h-auto" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <hr />
        <Button type="submit" className="text-white">
          Create product
        </Button>
      </form>
    </div>
  );
};

export default AddProductPage;
