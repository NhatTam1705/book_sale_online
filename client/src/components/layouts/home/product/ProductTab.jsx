import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Rating, Tab } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  HiOutlineTag,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';
import * as Yup from 'yup';
import Button from '../../../buttons/Button';

const ProductTab = () => {
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
            <Tab className="tab-details" value="reviews" label="Reviewes (0)" />
          </TabList>
        </div>
        <div className="px-12 mt-12 max-w-[1050px] mx-auto">
          <DescriptionTab></DescriptionTab>
          <ProductDetailsTab></ProductDetailsTab>
          <ReviewesTab></ReviewesTab>
        </div>
      </TabContext>
    </div>
  );
};

const DescriptionTab = () => {
  return (
    <TabPanel value="description">
      <p className="text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
        possimus cum cumque laboriosam quo dolor soluta hic. Autem eius
        molestias nisi temporibus? Labore sunt nisi eveniet inventore ratione
        quas! Nostrum! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Dignissimos porro exercitationem totam. Eaque atque minus a blanditiis
        mollitia, aspernatur doloremque amet nemo molestiae dignissimos
        accusamus provident corrupti cumque aliquid necessitatibus.
      </p>
    </TabPanel>
  );
};

const ProductDetailsTab = () => {
  return (
    <TabPanel value="productDetails">
      <div className="grid gap-1 ">
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Format:</h6>
          <h6 className="text-lg">Paperback | 384 pages</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Demensions:</h6>
          <h6 className="text-lg">123 x 384 x 12mm | 350g</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Publication Date:</h6>
          <h6 className="text-lg">11 Apr 2001</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Publisher:</h6>
          <h6 className="text-lg">Doan Van</h6>
        </div>
        <div className="grid w-full grid-cols-2 px-5 py-3 hover:bg-gray-200">
          <h6 className="text-lg font-semibold">Language:</h6>
          <h6 className="text-lg">Korea</h6>
        </div>
      </div>
    </TabPanel>
  );
};

const ReviewesTab = () => {
  const schemaReview = Yup.object({
    title: Yup.string().required(),
    content: Yup.string().required(),
    rating: Yup.number().required(),
  });

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: '',
      content: '',
      rating: 0,
    },
    resolver: yupResolver(schemaReview),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <TabPanel value="reviews">
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-12 gap-y-4">
          <h6 className="col-span-12 text-xl font-semibold">
            Customer Reviews
          </h6>
          <div className="grid col-span-6 gap-5">
            <div className="flex gap-5">
              <h1 className="font-bold text-7xl">4.6</h1>
              <div className="grid gap-1 py-2">
                <div>
                  <span className="text-lg">3,714 </span>
                  <span className="text-base">reviews</span>
                </div>
                <Rating
                  name=""
                  defaultValue={1}
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
              <Button className="w-[180px] text-white text-lg">
                Write a reviews
              </Button>
            </div>
          </div>
          <div className="container flex flex-col justify-between col-span-6">
            <div className="grid items-center grid-cols-12">
              <span className="col-span-2">5 starts</span>
              <div className="relative flex items-center col-span-9">
                <div className="absolute rounded-full bg-gray-200 w-full h-[10px]"></div>
                <div className="absolute rounded-full bg-yellow-500 w-[96%] h-[10px]"></div>
              </div>
              <span className="col-span-1 text-right">257</span>
            </div>
            <div className="grid items-center grid-cols-12">
              <span className="col-span-2">1 starts</span>
              <div className="relative flex items-center col-span-9">
                <div className="absolute rounded-full bg-gray-200 w-full h-[10px]"></div>
                <div className="absolute rounded-full bg-yellow-500 w-[86%] h-[10px]"></div>
              </div>
              <span className="col-span-1 text-right">257</span>
            </div>
            <div className="grid items-center grid-cols-12">
              <span className="col-span-2">3 starts</span>
              <div className="relative flex items-center col-span-9">
                <div className="absolute rounded-full bg-gray-200 w-full h-[10px]"></div>
                <div className="absolute rounded-full bg-yellow-500 w-[50%] h-[10px]"></div>
              </div>
              <span className="col-span-1 text-right">257</span>
            </div>
            <div className="grid items-center grid-cols-12">
              <span className="col-span-2">2 starts</span>
              <div className="relative flex items-center col-span-9">
                <div className="absolute rounded-full bg-gray-200 w-full h-[10px]"></div>
                <div className="absolute rounded-full bg-yellow-500 w-[20%] h-[10px]"></div>
              </div>
              <span className="col-span-1 text-right">257</span>
            </div>
            <div className="grid items-center grid-cols-12">
              <span className="col-span-2">1 starts</span>
              <div className="relative flex items-center col-span-9">
                <div className="absolute rounded-full bg-gray-200 w-full h-[10px]"></div>
                <div className="absolute rounded-full bg-yellow-500 w-[10%] h-[10px]"></div>
              </div>
              <span className="col-span-1 text-right">257</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="text-xl font-semibold">1-5 of 44 reviews</h6>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5">
              <span className="text-lg font-semibold">
                Amazing Story! You will LOVE it
              </span>
              <Rating
                sx={{ display: 'flex', alignItems: 'center' }}
                name=""
                defaultValue={1}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            <h6 className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              deleniti eaque dolor vel asperiores at dolores vero fuga, illum
              unde quia, placeat reiciendis molestias nesciunt voluptatibus
              alias est nam? Cumque?
            </h6>
            <h6 className="text-lg text-gray-600">Staci, February 22, 2020</h6>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-2">
                <HiOutlineThumbUp className="text-2xl cursor-pointer"></HiOutlineThumbUp>
                <span className="text-lg">20</span>
              </div>
              <div className="flex flex-row gap-2">
                <HiOutlineThumbDown className="text-2xl cursor-pointer"></HiOutlineThumbDown>
                <span className="text-lg">20</span>
              </div>
              <HiOutlineTag className="text-2xl cursor-pointer"></HiOutlineTag>
            </div>
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5">
              <span className="text-lg font-semibold">
                Amazing Story! You will LOVE it
              </span>
              <Rating
                sx={{ display: 'flex', alignItems: 'center' }}
                name=""
                defaultValue={1}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            <h6 className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              deleniti eaque dolor vel asperiores at dolores vero fuga, illum
              unde quia, placeat reiciendis molestias nesciunt voluptatibus
              alias est nam? Cumque?
            </h6>
            <h6 className="text-lg text-gray-600">Staci, February 22, 2020</h6>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-2">
                <HiOutlineThumbUp className="text-2xl cursor-pointer"></HiOutlineThumbUp>
                <span className="text-lg">20</span>
              </div>
              <div className="flex flex-row gap-2">
                <HiOutlineThumbDown className="text-2xl cursor-pointer"></HiOutlineThumbDown>
                <span className="text-lg">20</span>
              </div>
              <HiOutlineTag className="text-2xl cursor-pointer"></HiOutlineTag>
            </div>
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5">
              <span className="text-lg font-semibold">
                Amazing Story! You will LOVE it
              </span>
              <Rating
                sx={{ display: 'flex', alignItems: 'center' }}
                name=""
                defaultValue={1}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            <h6 className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              deleniti eaque dolor vel asperiores at dolores vero fuga, illum
              unde quia, placeat reiciendis molestias nesciunt voluptatibus
              alias est nam? Cumque?
            </h6>
            <h6 className="text-lg text-gray-600">Staci, February 22, 2020</h6>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-2">
                <HiOutlineThumbUp className="text-2xl cursor-pointer"></HiOutlineThumbUp>
                <span className="text-lg">20</span>
              </div>
              <div className="flex flex-row gap-2">
                <HiOutlineThumbDown className="text-2xl cursor-pointer"></HiOutlineThumbDown>
                <span className="text-lg">20</span>
              </div>
              <HiOutlineTag className="text-2xl cursor-pointer"></HiOutlineTag>
            </div>
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h6 className="text-xl font-semibold">Write a review</h6>
          <div className="flex flex-row gap-5">
            <span className="text-lg">Select a rating(required)</span>
            <Rating
              sx={{ display: 'flex', alignItems: 'center' }}
              name="rating"
              {...register('rating')}
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
                name="content"
                {...register('content')}
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
      </div>
    </TabPanel>
  );
};

export default ProductTab;
