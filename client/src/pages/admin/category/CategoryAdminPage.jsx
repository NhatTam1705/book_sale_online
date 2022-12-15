import { useCallback, useEffect, useState } from 'react';
import MetaData from '../../../components/dialogs/MetaData';
import CategoryListAdmin from '../../../components/layouts/admin/category/CategoryListAdmin';
import SubCategoryListAdmin from '../../../components/layouts/admin/category/SubCategoryListAdmin';

const CategoryAdminPage = () => {
  const [category, setCategory] = useState('');
  const fallbackCategory = useCallback((cat) => {
    setCategory(cat);
  }, []);

  return (
    <>
      <MetaData title="Category - Admin"></MetaData>
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-5">
          <CategoryListAdmin
            fallbackCategory={fallbackCategory}
          ></CategoryListAdmin>
        </div>
        <div className="col-span-5">
          <SubCategoryListAdmin category={category}></SubCategoryListAdmin>
        </div>
      </div>
    </>
  );
};

export default CategoryAdminPage;
