import  { useState } from 'react'
import { useGetAllCategoriesQuery } from '../../redux/features/category/categoryApi';
import { FaPlus } from 'react-icons/fa6';
import InputSearch from '../../components/ui/InputSearch';
import CategoriesTable from '../../components/table/CategoriesTable';
import Pagination from '../../components/ui/Pagination';
import Modal from '../../components/ui/Modal';
import CategoryForm from '../../components/form/CategoryForm';
import Loading from '../../components/ui/Loading'

const CategoryPage = () => {
    const [modalId, setModalId] = useState("");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data: categories, isLoading } = useGetAllCategoriesQuery({
      search: searchInputValue,
      page: currentPage,
    });
    const handleCloseModal = () => {
      setModalId("");
    };
    if (isLoading) {
      return <Loading className={"min-h-screen"}/>
    }
    return (
      <>
        <div className="bg-gray-100 mt-4">
          <div className="flex items-center bg-violet-300 gap-2 py-2 px-4">
            <p className="font-bold text-black flex-1">All User</p>
            <button
              onClick={() => setModalId("openModal")}
              className={`btn btn-sm btn-circle  btn-primary`}
            >
              <FaPlus />
            </button>
          </div>
          <div className="px-4 py-5">
          <div className="md:w-80 mb-3">
                <InputSearch
                  className="input-sm rounded-full h-9"
                  setSearchValue={setSearchInputValue}
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                />
              </div>
  
            <CategoriesTable categories={categories?.data?.data} />
  
            <div className="px-2 py-3">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={categories?.data?.totalPages}
              />
            </div>
          </div>
        </div>
        <Modal
          modalId={modalId}
          modalTitle="Create Category"
          hanleCloseModal={handleCloseModal}
        >
          <CategoryForm />
        </Modal>
      </>
    );
  };

export default CategoryPage
