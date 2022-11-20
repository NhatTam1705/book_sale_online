import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';

const AccountProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-4xl font-semibold">Account Details</h3>
      <ProfileForm></ProfileForm>
      <hr />
      <PasswordForm></PasswordForm>
    </div>
  );
};

export default AccountProfile;
