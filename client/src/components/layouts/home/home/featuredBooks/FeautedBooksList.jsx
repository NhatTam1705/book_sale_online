import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Fragment, useState } from 'react';
import FeaturedBooksCard, {
  FeaturedBooksCardSkeleton,
} from './FeaturedBooksCard';
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const FeautedBooksList = ({ products, loading }) => {
  const [value, setValue] = useState('featured');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <h4 className="text-4xl font-normal">Featured Books</h4>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            className="tab-list"
          >
            <Tab className="tab" value="featured" label="Featured" />
            <Tab className="tab" value="onSale" label="On Sale" />
            <Tab className="tab" value="mostReviewed" label="Most Reviewed" />
          </TabList>
          <div className="w-full">
            <TabPanelItemsFeatured
              products={products}
              loading={loading}
              value="featured"
            ></TabPanelItemsFeatured>
            <TabPanelItemsOnSale
              products={products}
              loading={loading}
              value="onSale"
            ></TabPanelItemsOnSale>
            <TabPanelItemsMostReviewed
              products={products}
              loading={loading}
              value="mostReviewed"
            ></TabPanelItemsMostReviewed>
          </div>
        </TabContext>
      </div>
    </>
  );
};

const TabPanelItemsFeatured = ({ value, products, loading }) => {
  return (
    <>
      <TabPanel className="tab-panel" value={value}>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
          {loading ? (
            <>
              {Array(12)
                .fill(0)
                .map((item, index) => (
                  <FeaturedBooksCardSkeleton
                    key={index}
                  ></FeaturedBooksCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products
                  .sort((prev, next) => {
                    return prev.createdDate < next.createdDate ? 1 : -1;
                  })
                  .map(
                    (product, index) =>
                      index < 12 && (
                        <FeaturedBooksCard
                          product={product}
                          key={product._id}
                        ></FeaturedBooksCard>
                      )
                  )}
            </>
          )}
        </div>
      </TabPanel>
    </>
  );
};
const TabPanelItemsOnSale = ({ value, products, loading }) => {
  let count = 0;
  return (
    <>
      <TabPanel className="tab-panel" value={value}>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
          {loading ? (
            <>
              {Array(12)
                .fill(0)
                .map((item, index) => (
                  <FeaturedBooksCardSkeleton
                    key={index}
                  ></FeaturedBooksCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products
                  .sort((prev, next) => {
                    return prev.createdDate < next.createdDate ? 1 : -1;
                  })
                  .map((product, index) => {
                    if (product.discount && count < 12) {
                      count++;
                      return (
                        <Fragment key={product._id}>
                          {product.discount && (
                            <FeaturedBooksCard
                              product={product}
                            ></FeaturedBooksCard>
                          )}
                        </Fragment>
                      );
                    } else {
                      return <Fragment key={index}></Fragment>;
                    }
                  })}
            </>
          )}
        </div>
      </TabPanel>
    </>
  );
};
const TabPanelItemsMostReviewed = ({ value, products, loading }) => {
  return (
    <>
      <TabPanel className="tab-panel" value={value}>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
          {loading ? (
            <>
              {Array(12)
                .fill(0)
                .map((item, index) => (
                  <FeaturedBooksCardSkeleton
                    key={index}
                  ></FeaturedBooksCardSkeleton>
                ))}
            </>
          ) : (
            <>
              {products.length > 0 &&
                products
                  .sort((prev, next) => {
                    return prev.numOfReviews < next.numOfReviews ? 1 : -1;
                  })
                  .map(
                    (product, index) =>
                      index < 12 && (
                        <FeaturedBooksCard
                          product={product}
                          key={product._id}
                        ></FeaturedBooksCard>
                      )
                  )}
            </>
          )}
        </div>
      </TabPanel>
    </>
  );
};

export default FeautedBooksList;
