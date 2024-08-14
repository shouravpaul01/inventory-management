import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { designationsOptions } from "../../constant";
import roomNoJson from "../../assets/json/RoomNo.json";
import { yupResolver } from "@hookform/resolvers/yup";
import {createFacultyValidation} from "../../validations/faculty.validation"
import { useCreateFacultyMutation } from "../../redux/features/user/userApi";
import {  toast } from 'react-toastify';
import { TFaculty } from "../../type/faculty.type";
import { useState } from "react";


const CreateFacultyForm = () => {
  const [isBtnDisable,setIsBtnDisable]=useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
      } = useForm({resolver: yupResolver(createFacultyValidation)});
      const [createFaculty]=useCreateFacultyMutation()
    
      const handleSignUp= async(data:TFaculty) => {
      setIsBtnDisable(true)
      try {
        const res = await createFaculty(data).unwrap();
        toast.success(res.message);
        reset();
        setIsBtnDisable(false)
      } catch (error:any) {
    
        const errorMessages=error?.data.errorMessages;
        if (errorMessages.length > 0) {
          errorMessages.forEach((errorMessage: any) =>
            setError(errorMessage.path, {
              type: "manual",
              message: errorMessage.message,
            })
          );
        }
        setIsBtnDisable(false)
      }
      }
      return (
        <div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <label className="form-control basis-3/5 ">
              <div className="label">
                <span className="label-text">Full Name</span>
              </div>
              <input
                type="text"
                {...register("name", { required: "The field is required" })}
                placeholder="Name"
                className="input input-sm input-bordered focus:outline-none focus:border-primary w-full "
              />
              {errors?.name && (
                <p className="text-red-400">{errors.name.message}</p>
              )}
            </label>
            <div className="flex gap-3">
              <label className="form-control basis-2/5 ">
                <div className="label">
                  <span className="label-text">Room No</span>
                </div>
                <select
                  {...register("roomNo", { required: "Select Room." })}
                  defaultValue={""}
                  className="select select-bordered  focus:outline-none focus:border-primary select-sm w-full max-h-48"
                >
                  <option disabled value="">
                    --Select Room--
                  </option>
                  {roomNoJson?.roomData.map((group, groupIndex) => (
                    <optgroup key={groupIndex} label={group.roomType}>
                      {group?.rooms?.map((option, optionIndex) => (
                        <option
                          key={`${groupIndex}-${optionIndex}`}
                          value={option.roomNo}
                        >
                          {option.roomNo}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
    
                {errors?.roomNo && (
                  <p className="text-red-400">{errors.roomNo.message}</p>
                )}
              </label>
              <label className="form-control basis-3/5 ">
                <div className="label">
                  <span className="label-text">Designation</span>
                </div>
                <select
                  {...register("designation", { required: "Select Profession." })}
                  defaultValue={""}
                  className="select select-bordered  focus:outline-none focus:border-primary select-sm w-full "
                >
                  <option disabled value="">
                    --Select Designation--
                  </option>
                  {designationsOptions?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
    
                {errors?.designation && (
                  <p className="text-red-400">{errors.designation.message}</p>
                )}
              </label>
            </div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                {...register("email", { required: "The field is required" })}
                placeholder="Email"
                className="input input-sm input-bordered focus:outline-none focus:border-primary w-full "
              />
              {errors?.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </label>
            <button
              type="submit"
              className="btn btn-sm btn-primary rounded-full w-full mt-3" disabled={isBtnDisable}
            >
              <FaArrowRight /> Create Faculty
            </button>
          </form>
        </div>
      );
}

export default CreateFacultyForm
