import CreateFacultyForm from "../../components/form/CreateFacultyForm";
import julogo from "/ju-logo.png";


const RegisterPage = () => {
  return (
    <section className="my-container ">
    <div className="min-h-screen  flex items-center justify-center flex-col md:flex-row">
      <div className="w-full md:basis-1/2 flex  justify-center items-center">
        <div>
          <div className="flex flex-col items-center justify-center  gap-4">
            <div className="relative ">
              <div className="w-28 h-28  border-2 border-dashed border-violet-800 rounded-full animate-spin p-4"></div>
              <img
                src={julogo}
                className="w-20  absolute top-2 left-4  opacity-85"
                alt="ju-logo"
              />
            </div>

            <div className="pb-3 font-bold text-center">
              <p className="text-xl md:text-2xl text-violet-800">
                Jahangirnagar University
              </p>
              <p className="">Inventory Management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:basis-1/2">
        <div className="bg-white  w-full max-w-sm ">
          <CreateFacultyForm />
        </div>
      </div>
    </div>
  </section>
  )
}

export default RegisterPage
