import React, { useState } from "react";
import CreateFacultyForm from "../../components/form/CreateFacultyForm";
import { FaPlus } from "react-icons/fa6";
import InputSearch from "../../components/ui/InputSearch";
import Pagination from "../../components/ui/Pagination";
import Modal from "../../components/ui/Modal";
import { useGetAllFaculitiesQuery } from "../../redux/features/faculty/facultyApi";
import FacultyMembersTable from "../../components/table/FacultyMembersTable";

const FacultyPage = () => {
  const [modalId, setModalId] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const {data:facultyMembers,isLoading}=useGetAllFaculitiesQuery(undefined)
  const handleCloseModal = () => {
    setModalId("");
  };
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-violet-300 gap-2 py-2 px-4">
          <p className="font-bold text-black flex-1">All Faculties</p>
          <button
            onClick={() => setModalId("openModal")}
            className={`btn btn-sm btn-circle  btn-primary`}
          >
            <FaPlus />
          </button>
        </div>
        <div className="px-4 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <div className="w-full md:w-80 mb-3">
              <InputSearch
                className="input-sm h-9"
                setSearchValue={setSearchInputValue}
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
          </div>

          <FacultyMembersTable facultyMembers={facultyMembers?.data?.data} />

          <div className="px-2 py-3">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={facultyMembers?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <Modal
        modalId={modalId}
        modalTitle="Create Faculty"
        hanleCloseModal={handleCloseModal}
      >
        <CreateFacultyForm />
      </Modal>
    </>
  );
};

export default FacultyPage;
