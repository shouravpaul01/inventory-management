import  { useState } from 'react'
import { useForm } from "react-hook-form"
import { Tlogin } from '../../type/login.type'
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginForm = () => {
    const { register, handleSubmit, reset,  formState: { errors } } = useForm<Tlogin>()
    const [showPassword,setShowPassword]=useState(false)
    
    
    const handleSignIn = (data:Tlogin) => {
       
        
    }

    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign In</p>
            
            <form onSubmit={handleSubmit(handleSignIn)}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" {...register('email', { required: "The field is required" })} placeholder="Email" className="input input-sm input-bordered focus:outline-none focus:border-primary w-full " />
                    {errors?.email && <p className="text-red-400">{errors.email.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered focus-within:outline-none focus-within:border-primary w-full ">
                    <input type={`${showPassword?"text":"password"}`} {...register('password', { required: "The field is required" })} placeholder=" Password" className="flex-grow" />
                         <span className="flex items-center" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</span>
                    </div>
                    {errors?.password && <p className="text-red-400">{errors.password.message}</p>}
                </label>
                <button type="submit" className="btn btn-sm btn-primary rounded-full w-full mt-3"> <FaArrowRight /> Sing in</button>
            </form>
        </div>
    );

}

export default LoginForm
