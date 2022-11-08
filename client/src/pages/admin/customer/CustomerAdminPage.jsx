import { Autocomplete, Pagination, TextField } from '@mui/material';
import { MdOutlineImportExport } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import Button from '../../../components/buttons/Button';
import CustomerCardAdmin from '../../../components/layouts/admin/customer/CustomerCardAdmin';

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

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const CustomerAdminPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Customers</h5>
        <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
          <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
          <span>Export</span>
        </Button>
      </div>
      <div className="text-lg rounded-lg bg-gray-50">
        <div className="flex flex-row justify-between p-6">
          <form action="">
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-md indent-2 w-[400px]"
              placeholder="Search"
            />
          </form>
          <div className="flex items-center gap-3">
            <Autocomplete
              options={show}
              className="bg-white"
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Show" />}
            />
            <Button className="flex items-center h-full gap-3 bg-white border border-gray-300">
              <span>Date</span>
              <MdOutlineImportExport className="w-6 h-6 text-gray-500"></MdOutlineImportExport>
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12 gap-4 p-6">
          {array &&
            array.map((item, index) => (
              <div className="col-span-3 shadow-lg" key={index}>
                <CustomerCardAdmin></CustomerCardAdmin>
              </div>
            ))}
        </div>
        <div className="flex justify-center p-6">
          <Pagination
            className=""
            color="primary"
            count={10}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerAdminPage;
