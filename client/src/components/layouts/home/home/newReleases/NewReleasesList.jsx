import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useState } from 'react';
import Slider1 from '../../../../../assets/images/Slider_1.png';
import Button from '../../../../buttons/Button';
import NewReleasesCard from './NewReleasesCard';
const array = [1, 2, 3, 4, 5, 6, 7, 8];

const NewReleasesList = () => {
  const [value, setValue] = useState('science&Math');

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
                value="science&Math"
                label="Science & Math"
              />
              <Tab className="tab-new" value="romance" label="Romaince" />
              <Tab className="tab-new" value="travel" label="Travel" />
            </TabList>
          </div>
        </div>
        <div>
          <TabPanelItems value="science&Math"></TabPanelItems>
          <TabPanelItems value="romance"></TabPanelItems>
          <TabPanelItems value="travel"></TabPanelItems>
        </div>
      </TabContext>
    </div>
  );
};

const TabPanelItems = ({ value }) => {
  return (
    <TabPanel className="tab-panel" value={value}>
      <div className="grid grid-cols-12">
        <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 bg-[#fff6f6] flex flex-col gap-10 px-16 py-24">
          <img src={Slider1} alt="" className="w-full" />
          <div className="flex flex-col gap-5">
            <h3 className="text-4xl">Get Extra</h3>
            <h2 className="text-5xl font-semibold text-red-500">Sale - 25%</h2>
            <h4 className="text-3xl text-gray-500 uppercase ">
              On Order Over $100
            </h4>
            <Button className="w-[200px] h-[60px] bg-red-500 text-lg font-semibold text-white">
              View More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-12 xl:grid-cols-4 xl:col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-6 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          {array.map((item, index) => (
            <NewReleasesCard key={index}></NewReleasesCard>
          ))}
        </div>
      </div>
    </TabPanel>
  );
};

export default NewReleasesList;
