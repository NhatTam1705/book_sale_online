import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewReleasesOne from '../../../../../assets/images/coming_soon.jpg';
import Button from '../../../../buttons/Button';
import NewReleasesCard, { NewReleasesCardSkeleton } from './NewReleasesCard';
const array = [1, 2, 3, 4, 5, 6, 7, 8];

const NewReleasesList = ({
  subCategories,
  loadingSubcategory,
  products,
  loading,
}) => {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <TabContext value={value}>
        <div className="flex flex-row flex-wrap items-center justify-between gap-6 mb-16">
          <h4 className="text-4xl font-normal">New Releases</h4>
          <div>
            <TabList
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              className="tab-list"
            >
              <Tab
                className="tab-new"
                value={'one'}
                label={
                  !loadingSubcategory &&
                  subCategories !== null &&
                  subCategories[0]?.name
                }
              />
              <Tab
                className="tab-new"
                value={'two'}
                label={
                  !loadingSubcategory &&
                  subCategories !== null &&
                  subCategories[1]?.name
                }
              />
              <Tab
                className="tab-new"
                value={'three'}
                label={
                  !loadingSubcategory &&
                  subCategories !== null &&
                  subCategories[2]?.name
                }
              />
            </TabList>
          </div>
        </div>
        <div>
          <TabPanelItemsOne
            category={subCategories[0]?._id}
            products={products}
            loading={loading}
            value={'one'}
          ></TabPanelItemsOne>
          <TabPanelItemsTwo
            category={subCategories[1]?._id}
            products={products}
            loading={loading}
            value={'two'}
          ></TabPanelItemsTwo>
          <TabPanelItemsThree
            category={subCategories[2]?._id}
            products={products}
            loading={loading}
            value={'three'}
          ></TabPanelItemsThree>
        </div>
      </TabContext>
    </div>
  );
};

const TabPanelItemsOne = ({ value, category, loading, products }) => {
  const navigate = useNavigate();
  let count = 0;
  return (
    <TabPanel className="tab-panel" value={value}>
      <div className="grid grid-cols-12">
        <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 bg-[#fff6f6] flex flex-col gap-10 px-16 py-24">
          <img src={NewReleasesOne} alt="" className="w-full" />
          <div className="flex flex-col gap-5">
            {/* <h3 className="text-4xl">Get Extra</h3> */}
            <h2 className="text-5xl font-semibold text-red-500">
              New Releases
            </h2>
            {/* <h4 className="text-3xl text-gray-500 uppercase ">
              On Order Over $100
            </h4> */}
            <Button
              onClick={() => navigate('/shop')}
              className="w-[200px] h-[60px] bg-red-500 text-lg font-semibold text-white"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-12 xl:grid-cols-4 xl:col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-6 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          {loading ? (
            <>
              {Array(8)
                .fill(0)
                .map((item, index) => (
                  <NewReleasesCardSkeleton
                    key={index}
                  ></NewReleasesCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products.map((product, index) => {
                  //product.category === category &&
                  if (count < 8) {
                    count++;
                    return (
                      <NewReleasesCard
                        product={product}
                        key={product._id}
                      ></NewReleasesCard>
                    );
                  } else {
                    return <Fragment key={index}></Fragment>;
                  }
                })}
            </>
          )}
        </div>
      </div>
    </TabPanel>
  );
};

const TabPanelItemsTwo = ({ value, category, loading, products }) => {
  const navigate = useNavigate();
  let count = 0;
  return (
    <TabPanel className="tab-panel" value={value}>
      <div className="grid grid-cols-12">
        <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 bg-[#fff6f6] flex flex-col gap-10 px-16 py-24">
          <img src={NewReleasesOne} alt="" className="w-full" />
          <div className="flex flex-col gap-5">
            {/* <h3 className="text-4xl">Get Extra</h3> */}
            <h2 className="text-5xl font-semibold text-red-500">
              New Releases
            </h2>
            {/* <h4 className="text-3xl text-gray-500 uppercase ">
              On Order Over $100
            </h4> */}
            <Button
              onClick={() => navigate('/shop')}
              className="w-[200px] h-[60px] bg-red-500 text-lg font-semibold text-white"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-12 xl:grid-cols-4 xl:col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-6 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          {loading ? (
            <>
              {Array(8)
                .fill(0)
                .map((item, index) => (
                  <NewReleasesCardSkeleton
                    key={index}
                  ></NewReleasesCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products.map((product, index) => {
                  //product.category === category &&
                  if (count < 8) {
                    count++;
                    return (
                      <NewReleasesCard
                        product={product}
                        key={product._id}
                      ></NewReleasesCard>
                    );
                  } else {
                    return <Fragment key={index}></Fragment>;
                  }
                })}
            </>
          )}
        </div>
      </div>
    </TabPanel>
  );
};
const TabPanelItemsThree = ({ value, category, loading, products }) => {
  const navigate = useNavigate();
  let count = 0;
  return (
    <TabPanel className="tab-panel" value={value}>
      <div className="grid grid-cols-12">
        <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 bg-[#fff6f6] flex flex-col gap-10 px-16 py-24">
          <img src={NewReleasesOne} alt="" className="w-full" />
          <div className="flex flex-col gap-5">
            {/* <h3 className="text-4xl">Get Extra</h3> */}
            <h2 className="text-5xl font-semibold text-red-500">
              New Releases
            </h2>
            {/* <h4 className="text-3xl text-gray-500 uppercase ">
              On Order Over $100
            </h4> */}
            <Button
              onClick={() => navigate('/shop')}
              className="w-[200px] h-[60px] bg-red-500 text-lg font-semibold text-white"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-12 xl:grid-cols-4 xl:col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-6 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          {loading ? (
            <>
              {Array(8)
                .fill(0)
                .map((item, index) => (
                  <NewReleasesCardSkeleton
                    key={index}
                  ></NewReleasesCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products.map((product, index) => {
                  //product.category === category &&
                  if (count < 8) {
                    count++;
                    return (
                      <NewReleasesCard
                        product={product}
                        key={product._id}
                      ></NewReleasesCard>
                    );
                  } else {
                    return <Fragment key={index}></Fragment>;
                  }
                })}
            </>
          )}
        </div>
      </div>
    </TabPanel>
  );
};

export default NewReleasesList;
