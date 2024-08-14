import { FaArrowRightArrowLeft, FaCircleDot } from "react-icons/fa6";
import empty_image from "../../assets/images/empty-image.png";
import { TFaculty } from "../../type/faculty.type";
import { useUpdateUserActiveStatusMutation, useUpdateUserApprovedStatusMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";

const UserTable = ({ users }: { users: TFaculty[] }) => {
  const [updateUserApprovedStatus] = useUpdateUserApprovedStatusMutation();
    const [updateUserActiveStatus] = useUpdateUserActiveStatusMutation();
  const handleUserApprovedStatus = async (
    userId: string,
    isApproved: boolean
  ) => {
    try {
      const res = await updateUserApprovedStatus({
        userId: userId,
        isApproved: isApproved,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      console.log(error)
      const errorResponse = error?.data.errorMessages[0];
     errorResponse.path=="isApproved" && toast.error(errorResponse.message);
    }
  };
   const handleUserActiveStatus = async (
    userId: string,
    isActive: boolean
  ) => {
    try {
      const res = await updateUserActiveStatus({
        userId: userId,
        isActive: isActive,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      console.log(error)
      const errorResponse = error?.data.errorMessages[0];
     errorResponse.path=="isActive" && toast.error(errorResponse.message);
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {users?.length == 0 && <caption>Data not found!.</caption>}
          {/* head */}
          <thead className="bg-violet-300 text-sm text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Active</th>
              <th>Approved</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((member: TFaculty, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={member?.image || empty_image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold uppercase">{member?.name}</div>
                      <div className="font-bold opacity-50">{member?.designation}</div>
                      <div className="text-sm opacity-50">
                        {member?.department}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <FaCircleDot
                      className={`${
                        member?.user?.isActive ? "text-success" : "text-error"
                      }`}
                    />
                    <span className="font-bold">
                      {member?.user?.isActive ? "Unblocked" : "Blocked"}
                    </span>
                    <button
                      onClick={() =>
                        handleUserActiveStatus(
                          member?.user?._id!,
                          !member?.user?.isActive
                        )
                      }
                      className={`btn btn-sm btn-outline btn-primary `}
                      
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <FaCircleDot
                      className={`${
                        member?.user?.isApproved ? "text-success" : "text-error"
                      }`}
                    />
                    <span className="font-bold">
                      {member?.user?.isApproved ? "Approved" : "Pending"}
                    </span>
                    <button
                      onClick={() =>
                        handleUserApprovedStatus(
                          member?.user?._id!,
                          member?.user?.isApproved?true:true
                        )
                      }
                      className={`btn btn-sm btn-outline btn-primary `}
                      disabled={member?.user?.isApproved}
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
