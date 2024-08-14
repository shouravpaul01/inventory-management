import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { subCategoryValidation } from "../../validations/subCategory.validation";
import { TSubCategory, TSubCategoryInputFields } from "../../type/subCategory.type";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../redux/features/sub-category/subCategoryApi";
import { toast } from "react-toastify";
import { useGetAllActiveCategoriesQuery } from "../../redux/features/category/categoryApi";
import { TCategory } from "../../type/category.type";

const SubCategoryForm = ({
  editableData,
}: {
  editableData?: TSubCategory | undefined;
}) => {
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<TSubCategoryInputFields>({ resolver: yupResolver(subCategoryValidation) });
  const { data: activeCategories } = useGetAllActiveCategoriesQuery(undefined);
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("name", editableData.name);
      setValue("category", editableData.category._id! );
      setValue("code", editableData.code);
      setValue("description", editableData.description);
    }
  }, [editableData]);
  const handleSubCategorySubmit: SubmitHandler<TSubCategoryInputFields> = async (data) => {
    setIsBtnDisable(true);
    try {
      const res = editableData
        ? await updateSubCategory(data).unwrap()
        : await createSubCategory(data).unwrap();
      toast.success(res.message);
      !editableData && reset();
      setIsBtnDisable(false);
    } catch (error: any) {
      const errorMessages = error?.data.errorMessages;
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) =>
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          })
        );
      }
      setIsBtnDisable(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubCategorySubmit)}>
      {editableData && <input type="text" {...register("_id")} hidden />}
      <label className="form-control">
        <div className="label">
          <p className="label-text">
             Name <span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          className="input input-sm input-bordered focus:outline-none focus:border-primary w-full "
        />
        {errors?.name && <p className="text-red-400">{errors.name.message}</p>}
      </label>
      <label className="form-control">
        <div className="label">
          <p className="label-text">
            Category <span className="text-red-600">*</span>
          </p>
        </div>

        <select className="select select-bordered select-sm w-full " {...register("category")}>
          <option>--Select Category--</option>
          {activeCategories?.data?.map((category: TCategory, index: number) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.category && (
          <p className="text-red-400">{errors.category.message}</p>
        )}
      </label>
      <label className="form-control">
        <div className="label">
          <p className="label-text">
            Code <span className="text-red-600">*</span>
          </p>
        </div>
        <input
          type="text"
          {...register("code")}
          placeholder="Code"
          className="input input-sm input-bordered focus:outline-none focus:border-primary w-full uppercase"
        />
        {errors?.code && <p className="text-red-400">{errors.code.message}</p>}
      </label>
      <label className="form-control">
        <div className="label">
          <p className="label-text">Description </p>
        </div>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered focus:outline-none focus:textarea-primary resize-none w-full"
        ></textarea>
      </label>
      <button
        type="submit"
        className="btn btn-sm btn-primary  mt-3"
        disabled={isBtnDisable}
      >
        <FaArrowRight /> {editableData ? "Update " : "Create "}Sub Category
      </button>
    </form>
  );
};

export default SubCategoryForm;
