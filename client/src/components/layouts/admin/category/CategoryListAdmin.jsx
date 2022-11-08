import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport, MdOutlineLibraryAdd } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import Button from '../../../buttons/Button';
import CategoryItemAdmin from './CategoryItemAdmin';

const show = [
  {
    label: 'Show 5',
    value: 5,
  },
  {
    label: 'Show 10',
    value: 5,
  },
  {
    label: 'Show 15',
    value: 15,
  },
  {
    label: 'Show 20',
    value: 20,
  },
];

const CategoryListAdmin = () => {
  const [show, setShow] = useState(false);

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
            onClick={() => setShow(true)}
            className="flex items-center gap-3 text-lg text-white bg-black "
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-500"></HiOutlinePlus>
            <span>Create new</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-gray-50 rounded-lg text-lg p-6">
        <div className="flex flex-row justify-between">
          <form action="">
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-md indent-2 w-[270px] h-full"
              placeholder="Search"
            />
          </form>
          <Autocomplete
            options={show}
            className="bg-white"
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} label="Show" />}
          />
          <Button className="flex items-center h-full gap-3 bg-white border border-gray-300">
            <span>Name</span>
            <MdOutlineImportExport className="w-6 h-6 text-gray-500"></MdOutlineImportExport>
          </Button>
        </div>
        <hr />
        {show && (
          <>
            <form className="grid grid-cols-4 gap-6">
              <TextField
                className="bg-white col-span-3"
                placeholder="New Category"
              />
              <Button
                onClick={() => setShow(false)}
                className="col-span-1 text-white flex items-center justify-around"
              >
                <MdOutlineLibraryAdd></MdOutlineLibraryAdd>
                <span>Add</span>
              </Button>
            </form>
            <hr />
          </>
        )}
        <div>
          <div className="grid grid-cols-12 pb-2">
            <span className="col-span-2">Number</span>
            <span className="col-span-7">Category name</span>
            <span className="col-span-1">Total</span>
            <span className="col-span-2">Action</span>
          </div>
          <hr />
          <div>
            <CategoryItemAdmin></CategoryItemAdmin>
            <CategoryItemAdmin></CategoryItemAdmin>
            <CategoryItemAdmin></CategoryItemAdmin>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryListAdmin;
