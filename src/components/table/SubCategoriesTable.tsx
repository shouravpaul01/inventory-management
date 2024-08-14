import { TSubCategory } from "../../type/subCategory.type";
import { useUpdateSubCategoryActiveStatusMutation } from "../../redux/features/sub-category/subCategoryApi";
import { toast } from "react-toastify";
import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaInfo,
  FaPenToSquare,
} from "react-icons/fa6";
import { useState } from "react";
import Modal from "../ui/Modal";
import SubCategoryForm from "../form/SubCategoryForm";
import SubCategoryDetails from '../details/SubCategoryDetails'

const SubCategoriesTable = ({ subCategories }: { subCategories: TSubCategory[] }) => {
  const [modalId, setModalId] = useState<string | "">("");
  const [editableData, setEditableData] = useState<TSubCategory | null>(null);
  const [details, setDetails] = useState<TSubCategory | null>(null);
  const [updateSubCategoryActiveStatus] = useUpdateSubCategoryActiveStatusMutation();
  const handleSubCategoryActiveStatus = async (
    subCategoryId: string,
    isActive: boolean
  ) => {
    console.log(subCategoryId,isActive)
    try {
      const res = await updateSubCategoryActiveStatus({
        subCategoryId,
        isActive: isActive,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      console.log(error)
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
          {subCategories?.length == 0 && <caption className="caption-bottom font-semibold py-1">Data not found!.</caption>}
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
            {subCategories?.map((subCategory: TSubCategory, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <div>
                <p className="font-bold">{subCategory.name}</p>
                <p className="text-gray-600 font-semibold">Cat: {subCategory.category?.name}</p>
                </div>
                </td>
                <td>
                  <span className="badge badge-warning">{subCategory.code}</span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <FaCircleDot
                      className={`${
                        subCategory?.isActive ? "text-success" : "text-error"
                      }`}
                    />
                    <span className="font-bold">
                      {subCategory?.isActive ? "Activated" : "Deactivated"}
                    </span>
                    <button
                      onClick={() =>
                        handleSubCategoryActiveStatus(
                          subCategory?._id!,
                          !subCategory?.isActive
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
                      onClick={() => {setModalId(subCategory._id!),setEditableData(subCategory)}}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      <FaPenToSquare />
                    </button>
                    <button onClick={() => {setModalId(subCategory._id!),setDetails(subCategory)}} className="btn btn-xs btn-outline btn-primary">
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
        
        {(editableData) && <SubCategoryForm editableData={editableData} />}
        {(details) && <SubCategoryDetails subCategory={details} />}
      </Modal>
    </>
  );
};

export default SubCategoriesTable;
