import {TSubCategory} from '../../type/subCategory.type'

const SubCategoryDetails = ({ subCategory }: { subCategory: TSubCategory }) => {
  return (
    <table className="border-collapse">
      <thead>
        <tr>
          <td className="w-40 "></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="w-40 font-semibold">Name:</td>
          <td>{subCategory.name}</td>
        </tr>
        <tr>
          <td className="w-40 font-semibold">Category:</td>
          <td>{subCategory.category.name}</td>
        </tr>
        <tr>
          <td className="font-semibold">Code:</td>
          <td>
            <span className="badge badge-warning">{subCategory.code}</span>
          </td>
        </tr>
        <tr>
          <td className="font-semibold">Description:</td>
          <td>{subCategory.description}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SubCategoryDetails;
