import { TCategory } from "../../type/category.type";

const CategoryDetails = ({ category }: { category: TCategory }) => {
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
          <td>{category.name}</td>
        </tr>
        <tr>
          <td className="font-semibold">Code:</td>
          <td>
            <span className="badge badge-warning">{category.code}</span>
          </td>
        </tr>
        <tr>
          <td className="font-semibold">Description:</td>
          <td>{category.description}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CategoryDetails;
