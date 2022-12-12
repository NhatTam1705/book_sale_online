import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  LinearProgress,
  linearProgressClasses,
  Rating,
  styled,
  Tab,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import PropsTypes from 'prop-types';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import {
  HiOutlineTag,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { clearErrors, newReview } from '../../../../actions/productActions';
import { NEW_REVIEW_RESET } from '../../../../constants/productConstants';
import Button from '../../../buttons/Button';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#e5e7eb',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#eab308',
  },
}));

const ProductTab = ({ product }) => {
  const {
    _id,
    numOfReviews,
    reviews,
    ratings,
    format,
    language,
    description,
    publishing,
    issuing,
    page,
    weight,
  } = product;
  const [value, setValue] = useState('description');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <TabContext value={value}>
        <div className="bg-[#fff6f6] pb-12 flex justify-center">
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              className="tab-details"
              value="description"
              label="Description"
            />
            <Tab
              className="tab-details"
              value="productDetails"
              label="Product Details"
            />
            <Tab
              className="tab-details"
              value="reviews"
              label={`Reviewes (${numOfReviews})`}
            />
          </TabList>
        </div>
        <div className="px-12 mt-12 max-w-[1050px] mx-auto">
          <DescriptionTab description={description}></DescriptionTab>
          <ProductDetailsTab
            format={format}
            language={language}
            page={page}
            weight={weight}
            publishing={publishing}
            issuing={issuing}
          ></ProductDetailsTab>
          <ReviewesTab
            ratings={ratings}
            numOfReviews={numOfReviews}
            reviews={reviews}
            id={_id}
          ></ReviewesTab>
        </div>
      </TabContext>
    </div>
  );
};

const DescriptionTab = ({ description }) => {
  return (
    <TabPanel className="!p-0" value="description">
      <p className="text-lg">{description}</p>
    </TabPanel>
  );
};

const ProductDetailsTab = ({
  language,
  format,
  publishing,
  issuing,
  page,
  weight,
}) => {
  return (
    <TabPanel className="!p-0" value="productDetails">
      <div className="grid gap-1 ">
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Format:</h6>
          <h6 className="text-lg">
            {format} | {page} pages
          </h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Demensions:</h6>
          <h6 className="text-lg">{weight} g </h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Language:</h6>
          <h6 className="text-lg">{language}</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Publishing house:</h6>
          <h6 className="text-lg">{publishing}</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Issuing company:</h6>
          <h6 className="text-lg">{issuing}</h6>
        </div>
      </div>
    </TabPanel>
  );
};

const ReviewesTab = ({ ratings, numOfReviews, reviews, id }) => {
  const schemaReview = Yup.object({
    title: Yup.string().required(),
    comment: Yup.string().required(),
  });
  const { user } = useSelector((state) => state.auth);
  const { error, success } = useSelector((state) => state.newReview);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: '',
      comment: '',
    },
    resolver: yupResolver(schemaReview),
    mode: 'onChange',
  });

  const [ratingPoint, setRatingPoint] = useState(1);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      reset();
      setRatingPoint(1);
      enqueueSnackbar('Review posted successfully!', { variant: 'success' });
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, enqueueSnackbar, error, success, reset]);

  const handleCreateReview = (data) => {
    data.rating = ratingPoint;
    data.productId = id;
    dispatch(newReview(data));
  };

  const handleWriteReview = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <TabPanel className="!p-0" value="reviews">
      <div className="flex flex-col gap-12">
        <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-6 grid-cols-6 gap-y-4">
          <h6 className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-6 col-span-6 text-xl font-semibold">
            Customer Reviews
          </h6>
          <div className="flex flex-col col-span-6 gap-5">
            <div className="flex gap-5">
              <h1 className="font-bold text-7xl">{ratings}</h1>
              <div className="grid gap-1 py-2">
                <div>
                  <span className="text-lg">{numOfReviews} </span>
                  <span className="text-base">reviews</span>
                </div>
                <Rating
                  name=""
                  value={ratings}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <Button className="w-[180px] bg-white text-black border border-black text-lg hover:text-white hover:bg-black">
                See all reviews
              </Button>
              <Button
                onClick={handleWriteReview}
                className="w-[180px] text-white text-lg"
              >
                Write a reviews
              </Button>
            </div>
          </div>
          <div className="container flex flex-col justify-between col-span-6">
            {[5, 4, 3, 2, 1].map((item, index) => {
              let numOfStart = 0;
              if (reviews) {
                numOfStart = reviews.reduce(
                  (acc, review) => (review.rating === item ? acc + 1 : acc),
                  0
                );
              }
              return (
                <div key={item} className="grid items-center grid-cols-12">
                  <span className="col-span-2">{item} starts</span>
                  <BorderLinearProgress
                    sx={{ width: 1, hight: 10 }}
                    className="col-span-9"
                    variant="determinate"
                    value={
                      numOfReviews !== undefined
                        ? Number(((numOfStart / numOfReviews) * 100).toFixed(0))
                        : 0
                    }
                  />
                  <span className="col-span-1 text-right">{numOfStart}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="text-xl font-semibold">
            1-5 of {numOfReviews} reviews
          </h6>
          {reviews &&
            reviews.map((review, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex flex-row gap-6">
                  <span className="text-lg font-semibold">{review.title}</span>
                  <Rating
                    sx={{ display: 'flex', alignItems: 'center' }}
                    value={review.rating}
                    readOnly
                    size="small"
                  />
                </div>
                <h6 className="text-lg">{review.comment}</h6>
                <h6 className="text-lg text-gray-600">
                  {review.name}, {String(review.createdDate).substring(0, 10)}
                </h6>
                <div className="flex flex-row gap-10">
                  <div className="flex flex-row gap-2">
                    <HiOutlineThumbUp className="text-2xl cursor-pointer"></HiOutlineThumbUp>
                    <span className="text-lg">{review.like}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <HiOutlineThumbDown className="text-2xl cursor-pointer"></HiOutlineThumbDown>
                    <span className="text-lg">{review.disLike}</span>
                  </div>
                  <HiOutlineTag className="text-2xl cursor-pointer"></HiOutlineTag>
                </div>
                <div className="w-full border-t border-gray-200"></div>
              </div>
            ))}
        </div>
        {user !== null ? (
          <form
            ref={ref}
            onSubmit={handleSubmit(handleCreateReview)}
            className="flex flex-col gap-4"
          >
            <h6 className="text-xl font-semibold">Write a review</h6>
            <div className="flex flex-row gap-5">
              <span className="text-lg">Select a rating(required)</span>
              <Rating
                name="rating"
                value={ratingPoint}
                sx={{ display: 'flex', alignItems: 'center' }}
                onChange={(e, value) =>
                  setRatingPoint(Number(value || ratingPoint))
                }
                precision={1}
                size="small"
              />
            </div>
            <div>
              <h6 className="text-lg">
                Details please! Your review helps other shoppers.
              </h6>
              <div className="mt-2 border border-gray-300">
                <textarea
                  name="comment"
                  {...register('comment')}
                  id=""
                  cols="30"
                  rows="7"
                  placeholder="What did you like or dislike? What should other shoppers know before buying?"
                  className="w-full p-4 text-orange-900 resize-none"
                ></textarea>
              </div>
              <div className="mt-4">
                <h6 className="text-lg">Add title</h6>
                <input
                  type="text"
                  placeholder="3000 characters remaining"
                  name="title"
                  {...register('title')}
                  className="w-full p-3 mt-2 text-orange-900 border border-gray-300"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="text-white bg-black max-w-[200px] mt-2 text-lg w-full"
            >
              Submit review
            </Button>
          </form>
        ) : (
          <h6 ref={ref} className="text-xl font-semibold">
            Login to post your review.
          </h6>
        )}
      </div>
    </TabPanel>
  );
};

ProductTab.PropsTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string,
    numOfReviews: PropsTypes.number,
    reviews: PropsTypes.array,
    ratings: PropsTypes.number,
    format: PropsTypes.string,
    language: PropsTypes.string,
    description: PropsTypes.string,
    publishing: PropsTypes.string,
    issuing: PropsTypes.string,
    page: PropsTypes.number,
    weight: PropsTypes.number,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(ProductTab, FallbackComponent);
