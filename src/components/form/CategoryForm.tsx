import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  categoryValidation
} from "../../validations/category.validation";
import { TCategory } from "../../type/category.type";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import { toast } from "react-toastify";

const CategoryForm = ({
  editableData,
}: {
  editableData?: TCategory | undefined;
}) => {
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<TCategory>({});
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("name", editableData.name);
      setValue("code", editableData.code);
      setValue("description", editableData.description);
    }
  }, [editableData]);
  const handleCategorySubmit: SubmitHandler<TCategory> = async (data) => {
    setIsBtnDisable(true);
    try {
      const res = editableData
        ? await updateCategory(data).unwrap()
        : await createCategory(data).unwrap();
      toast.success(res.message);
      !editableData && reset();
      setIsBtnDisable(false);
    } catch (error: any) {
      console.log(error)
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
    <form onSubmit={handleSubmit(handleCategorySubmit)}>
      {editableData && <input type="text" {...register("_id")} hidden />}
      <label className="form-control">
        <div className="label">
          <p className="label-text">
            Category Name <span className="text-red-600">*</span>
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
        <FaArrowRight /> {editableData ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
