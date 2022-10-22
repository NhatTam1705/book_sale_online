import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useState } from 'react';
import FeaturedBooksCard from './FeaturedBooksCard';
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const FeautedBooksList = () => {
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
          <div>
            <TabPanelItems value="featured"></TabPanelItems>
            <TabPanelItems value="onSale"></TabPanelItems>
            <TabPanelItems value="mostReviewed"></TabPanelItems>
          </div>
        </TabContext>
      </div>
    </>
  );
};

const TabPanelItems = ({ value }) => {
  return (
    <>
      <TabPanel className="tab-panel" value={value}>
        <div className="grid grid-cols-6 ">
          {array.map((item, index) => (
            <FeaturedBooksCard key={index}></FeaturedBooksCard>
          ))}
        </div>
      </TabPanel>
    </>
  );
};

export default FeautedBooksList;
