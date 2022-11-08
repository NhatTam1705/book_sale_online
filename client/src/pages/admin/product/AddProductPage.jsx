import { Autocomplete, TextField } from '@mui/material';
import Button from '../../../components/buttons/Button';

const status = [
  {
    label: 'Status 1',
    value: 1,
  },
  {
    label: 'Status 2',
    value: 2,
  },
  {
    label: 'Status 3',
    value: 3,
  },
  {
    label: 'Status 4',
    value: 4,
  },
];

const formats = [
  {
    label: 'Hardcover',
    value: 'Hardcover',
  },
  {
    label: 'Paperback',
    value: 'Paperback',
  },
];

const AddProductPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Add Product</h5>
      </div>
      <form className="flex flex-col gap-6 p-6 text-lg rounded-lg bg-gray-50">
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">1. General info</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Product name</label>
              <TextField
                id="name"
                className="bg-white"
                placeholder="Product name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Full description</label>
              <div className="p-4 bg-white border border-gray-300 rounded-md">
                <textarea
                  name=""
                  id=""
                  rows="5"
                  className="w-full resize-none"
                  placeholder="Full description"
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="publishing">Publishing house</label>
                  <TextField
                    id="publishing"
                    placeholder="Publishing house"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="issuing">Issuing company</label>
                  <TextField
                    id="issuing"
                    placeholder="Issuing company"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="status">Product status</label>
                  <Autocomplete
                    id="status"
                    options={status}
                    className="w-full bg-white"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Product status" />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="format">Product format</label>
                  <Autocomplete
                    id="format"
                    options={formats}
                    className="w-full bg-white"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Product format" />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="page">Total page</label>
                  <TextField
                    id="page"
                    placeholder="Total page"
                    className="bg-white"
                  ></TextField>
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="weight">Product weight</label>
                  <TextField
                    id="weight"
                    placeholder="Product weight"
                    className="bg-white"
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
                  <label htmlFor="price">Price</label>
                  <TextField
                    id="price"
                    className="bg-white"
                    placeholder="$Price"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="amount">Amount</label>
                  <TextField
                    id="amount"
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
            <div className="flex flex-col gap-1">
              <label htmlFor="primaryCategory">Primary Category</label>
              <Autocomplete
                id="primaryCategory"
                options={status}
                className="w-full bg-white"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Primary Category" />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="secondaryCategory">Secondary Category</label>
              <Autocomplete
                id="secondaryCategory"
                options={status}
                className="w-full bg-white"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Secondary Category" />
                )}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">4. Author</h6>
          <div className="flex flex-col col-span-9 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="primaryCategory">Author</label>
              <Autocomplete
                id="primaryCategory"
                options={status}
                className="w-full bg-white"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Author" />
                )}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <h6 className="col-span-3 font-medium">5. Media</h6>
          <div className="flex flex-col col-span-9 gap-6"></div>
        </div>
        <hr />
        <Button className="text-white">Save product</Button>
      </form>
    </div>
  );
};

export default AddProductPage;
