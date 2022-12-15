import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import MetaData from '../../components/dialogs/MetaData';
import HeaderAdmin from '../../components/headers/admin/HeaderAdmin';
import Header from '../../components/headers/home/Header';
import NavigationBar from '../../components/headers/home/NavigationBar';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  return (
    <>
      <MetaData title="Not Found"></MetaData>
      {user && user.role === 'admin' ? (
        <HeaderAdmin></HeaderAdmin>
      ) : (
        <>
          <Header></Header>
          <NavigationBar></NavigationBar>
        </>
      )}
      <div className="flex flex-col my-[120px] items-center gap-5">
        <h1 className="text-[150px] font-bold">404</h1>
        <div className="flex flex-col items-center">
          <h5 className="text-xl font-semibold">
            Woops, looks like this page does not exist
          </h5>
          <h6>You could either go back or go to homepage</h6>
        </div>
        <Button
          bgColor="bg-black"
          className="text-white w-[200px]"
          onClick={() =>
            navigate(
              user && user.role === 'admin' ? 'admin/dashboard' : '/home'
            )
          }
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
