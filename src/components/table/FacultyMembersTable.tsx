import { TFaculty } from "../../type/faculty.type";
import empty_image from "../../assets/images/empty-image.png";

const FacultyMembersTable = ({
  facultyMembers,
}: {
  facultyMembers: TFaculty[];
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {facultyMembers?.length == 0 && <caption>Data not found!.</caption>}
          {/* head */}
          <thead className="bg-[#92C6C5] text-sm text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {facultyMembers?.map((member: TFaculty, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={member.image || empty_image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{member.designation}</div>
                      <div className="text-sm opacity-50">
                        {member.department}
                      </div>
                    </div>
                  </div>
                </td>
                <td></td>
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

export default FacultyMembersTable;
