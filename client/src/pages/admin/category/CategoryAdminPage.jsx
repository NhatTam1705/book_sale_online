import CategoryListAdmin from '../../../components/layouts/admin/category/CategoryListAdmin';
import SubCategoryListAdmin from '../../../components/layouts/admin/category/SubCategoryListAdmin';

const CategoryAdminPage = () => {
  return (
    <>
      <div className="grid grid-cols-9 gap-6">
        <div className="col-span-5">
          <CategoryListAdmin></CategoryListAdmin>
        </div>
        <div className="col-span-4">
          <SubCategoryListAdmin></SubCategoryListAdmin>
        </div>
      </div>
    </>
  );
};

export default CategoryAdminPage;
