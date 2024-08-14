import { TCategory } from "../../type/category.type";
import {
  useUpdateCategoryActiveStatusMutation,
} from "../../redux/features/category/categoryApi";
import { toast } from "react-toastify";
import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaInfo,
  FaPenToSquare,
} from "react-icons/fa6";
import { useState } from "react";
import Modal from "../ui/Modal";
import CategoryForm from "../form/CategoryForm";
import CategoryDetails from '../details/CategoryDetails'

const CategoriesTable = ({ categories }: { categories: TCategory[] }) => {
  const [modalId, setModalId] = useState<string | "">("");
  const [editableData, setEditableData] = useState<TCategory | null>(null);
  const [details, setDetails] = useState<TCategory | null>(null);
  const [updateCategoryActiveStatus] = useUpdateCategoryActiveStatusMutation();

  const handleCategoryActiveStatus = async (
    categoryId: string,
    isActive: boolean
  ) => {
    try {
      const res = await updateCategoryActiveStatus({
        categoryId: categoryId,
        isActive: isActive,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      const errorResponse = error?.data.errorMessages[0];
      errorResponse.path == "isActive" && toast.error(errorResponse.message);
    }
  };
  const handleCloseModal = () => {
  setEditableData(null)
    setDetails(null)
    setModalId("");
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {categories?.length == 0 && <caption>Data not found!.</caption>}
          {/* head */}
          <thead className="bg-violet-300 text-sm text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Code</th>
              <th>Active</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: TCategory, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <span className="badge badge-warning">{category.code}</span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <FaCircleDot
                      className={`${
                        category?.isActive ? "text-success" : "text-error"
                      }`}
                    />
                    <span className="font-bold">
                      {category?.isActive ? "Activated" : "Deactivated"}
                    </span>
                    <button
                      onClick={() =>
                        handleCategoryActiveStatus(
                          category?._id!,
                          !category?.isActive
                        )
                      }
                      className={`btn btn-xs  btn-outline btn-primary `}
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {setModalId(category._id!),setEditableData(category)}}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      <FaPenToSquare />
                    </button>
                    <button onClick={() => {setModalId(category._id!),setDetails(category)}} className="btn btn-xs btn-outline btn-primary">
                      <FaInfo />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        modalId={modalId}
        modalTitle={details?"Category Details":"Edit Category"}
        hanleCloseModal={handleCloseModal}
      >
        
        {(editableData) && <CategoryForm editableData={editableData} />}
        {(details) && <CategoryDetails category={details} />}
      </Modal>
    </>
  );
};

export default CategoriesTable;
