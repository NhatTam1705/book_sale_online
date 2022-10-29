import Button from '../../../../buttons/Button';

const AccountProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-4xl font-semibold">Account Details</h3>
      <div>
        <h4 className="text-3xl">Edit Account</h4>
        <div className="grid grid-cols-12 gap-8 mt-3 text-lg">
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="firstName">
              First name <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="firstName"
              />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="lastName">
              Last name <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="lastName"
              />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="displayName">Display name</label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="displayName"
              />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="phone">Phone number</label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="phone"
              />
            </div>
          </div>
          <Button className="text-white col-span-3">Save Changes</Button>
        </div>
      </div>
      <hr />
      <div>
        <h4 className="text-3xl">Password Change</h4>
        <div className="grid grid-cols-12 gap-8 mt-3 text-lg">
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="currentPassword">
              Current Password <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="currentPassword"
              />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="newPassword">
              New Password <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="newPassword"
              />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full"
                id="confirmPassword"
              />
            </div>
          </div>
          <div className="col-span-6"></div>
          <Button className="text-white col-span-3">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
