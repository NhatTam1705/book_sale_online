import { useCallback, useState } from 'react';
import { TiExportOutline } from 'react-icons/ti';
import Button from '../../../components/buttons/Button';
import MetaData from '../../../components/dialogs/MetaData';
import OrderFilterAdmin from '../../../components/layouts/admin/order/OrderFilterAdmin';
import OrderTableAdmin from '../../../components/layouts/admin/order/OrderTableAdmin';

const OrderAdminPage = () => {
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('');

  const fallbackFilter = useCallback((use, sta) => {
    setUser(use);
    setStatus(sta);
  }, []);

  return (
    <>
      <MetaData title="Order - Admin"></MetaData>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Orders</h5>
        <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
          <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
          <span>Export</span>
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <OrderTableAdmin user={user} status={status}></OrderTableAdmin>
        <OrderFilterAdmin fallbackFilter={fallbackFilter}></OrderFilterAdmin>
      </div>
    </>
  );
};

export default OrderAdminPage;
