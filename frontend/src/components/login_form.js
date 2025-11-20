import Button from "./ui/button"
import Image from "next/image"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"


export default function LoginForm({isLogin, toggleIsLogin}){
    const {login, register, isLoading } = useAuth()
    const [isVisiblePW, setIsVisiblePW] = useState(false)
    const [typePW, setTypePW] = useState("password")

    const [isVisibleCPW, setIsVisibleCPW] = useState(false)
    const [typeCPW, setTypeCPW] = useState("password")

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleToggleVisiblePW = () => {
        setIsVisiblePW(!isVisiblePW)
        setTypePW(isVisiblePW ? "password" : "text") 
    }

    const handleToggleVisibleCPW = () => {
        setIsVisibleCPW(!isVisibleCPW)
        setTypeCPW(isVisibleCPW ? "password" : "text") 
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!isLogin) {
            if (form.password !== form.confirmPassword) {
                alert("Passwords do not match")
                return
            }
            try {
                await register({
                    username: form.username,
                    email: form.email,
                    password: form.password
                })
                alert("Account created! Please check your backend console for the verification link.")
                toggleIsLogin() 
            } catch (err) {
                alert(err.message)
            }
        } else {
            try {
                await login({
                    email: form.email,
                    password: form.password
                })
            } catch (err) {
                alert(err.message)
            }
        }
    }

    return(
        <div className="grid w-auto h-auto md:mx-20 lg:mx-50 bg-slate-100 grid-cols-1  md:grid-cols-[1fr_40%] lg:grid-cols-[1fr_40%] rounded-2xl content-center items-center">
            <div className="flex flex-col py-5 px-5 md:py-5 md:px-15 lg:py-10 lg:px-20 gap-5 ">
                <div className="text-black font-bold text-3xl m-2 text-center">
                    {!isLogin ? "Create account" : "Welcome back!" }
                </div>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    {!isLogin && (
                        <input
                            aria-label="Enter Username"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="text-gray-700 font-semibold border border-gray-100 bg-white p-2 h-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            />
                    )}

                        <input
                            aria-label="Enter Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="text-gray-700 font-semibold border border-gray-100 bg-white p-2 h-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            />

                        <div className="relative w-full">
                        <input
                            aria-label="Enter Password"
                            type={typePW}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="text-gray-700 font-semibold border border-gray-100 bg-white p-2 h-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            />
                            <div className="absolute inset-y-0 right-4 flex hover:cursor-pointer place-content-center place-items-center" onClick={handleToggleVisiblePW}>
                            {!isVisiblePW 
                                ? <><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#000000" d="m5.318 13.47l.776-.776A6.04 6.04 0 0 0 8 13c1.999 0 3.74-.956 5.225-2.587A12.097 12.097 0 0 0 14.926 8a12.097 12.097 0 0 0-1.701-2.413l-.011-.012l.707-.708c1.359 1.476 2.045 2.976 2.058 3.006c.014.03.021.064.021.098v.06a.24.24 0 0 1-.02.097C15.952 8.188 13.291 14 8 14a7.03 7.03 0 0 1-2.682-.53M2.04 11.092C.707 9.629.034 8.158.02 8.128A.24.24 0 0 1 0 8.03v-.059c0-.034.007-.068.02-.098C.048 7.813 2.709 2 8 2c.962 0 1.837.192 2.625.507l-.78.78A6.039 6.039 0 0 0 8 3c-2 0-3.74.956-5.225 2.587a12.098 12.098 0 0 0-1.701 2.414a12.11 12.11 0 0 0 1.674 2.383zM8.362 4.77L7.255 5.877a2.262 2.262 0 0 0-1.378 1.378L4.77 8.362A3.252 3.252 0 0 1 8.362 4.77m2.86 2.797a3.254 3.254 0 0 1-3.654 3.654l1.06-1.06a2.262 2.262 0 0 0 1.533-1.533zm-9.368 7.287a.5.5 0 0 1-.708-.708l13-13a.5.5 0 0 1 .708.708z"/></svg></>
                                : <><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#000000" d="M15.98 7.873c.013.03.02.064.02.098v.06a.24.24 0 0 1-.02.097C15.952 8.188 13.291 14 8 14S.047 8.188.02 8.128A.24.24 0 0 1 0 8.03v-.059c0-.034.007-.068.02-.098C.048 7.813 2.709 2 8 2s7.953 5.813 7.98 5.873m-1.37-.424a12.097 12.097 0 0 0-1.385-1.862C11.739 3.956 9.999 3 8 3c-2 0-3.74.956-5.225 2.587a12.098 12.098 0 0 0-1.701 2.414a12.095 12.095 0 0 0 1.7 2.413C4.26 12.043 6.002 13 8 13s3.74-.956 5.225-2.587A12.097 12.097 0 0 0 14.926 8c-.08-.15-.189-.343-.315-.551M8 4.75A3.253 3.253 0 0 1 11.25 8A3.254 3.254 0 0 1 8 11.25A3.253 3.253 0 0 1 4.75 8A3.252 3.252 0 0 1 8 4.75m0 1C6.76 5.75 5.75 6.76 5.75 8S6.76 10.25 8 10.25S10.25 9.24 10.25 8S9.24 5.75 8 5.75m0 1.5a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"/></svg></>
                            }
                            </div>
                        </div>
                      {!isLogin && (
                        <div className="relative w-full">
                        <input
                            aria-label="Confirm Password"
                            type={typeCPW}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="text-gray-700 font-semibold border border-gray-100 bg-white p-2 h-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            />
                            <div className="absolute inset-y-0 right-4 flex hover:cursor-pointer place-content-center place-items-center" onClick={handleToggleVisibleCPW}>
                            {!isVisibleCPW 
                                ? <><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#000000" d="m5.318 13.47l.776-.776A6.04 6.04 0 0 0 8 13c1.999 0 3.74-.956 5.225-2.587A12.097 12.097 0 0 0 14.926 8a12.097 12.097 0 0 0-1.701-2.413l-.011-.012l.707-.708c1.359 1.476 2.045 2.976 2.058 3.006c.014.03.021.064.021.098v.06a.24.24 0 0 1-.02.097C15.952 8.188 13.291 14 8 14a7.03 7.03 0 0 1-2.682-.53M2.04 11.092C.707 9.629.034 8.158.02 8.128A.24.24 0 0 1 0 8.03v-.059c0-.034.007-.068.02-.098C.048 7.813 2.709 2 8 2c.962 0 1.837.192 2.625.507l-.78.78A6.039 6.039 0 0 0 8 3c-2 0-3.74.956-5.225 2.587a12.098 12.098 0 0 0-1.701 2.414a12.11 12.11 0 0 0 1.674 2.383zM8.362 4.77L7.255 5.877a2.262 2.262 0 0 0-1.378 1.378L4.77 8.362A3.252 3.252 0 0 1 8.362 4.77m2.86 2.797a3.254 3.254 0 0 1-3.654 3.654l1.06-1.06a2.262 2.262 0 0 0 1.533-1.533zm-9.368 7.287a.5.5 0 0 1-.708-.708l13-13a.5.5 0 0 1 .708.708z"/></svg></>
                                : <><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#000000" d="M15.98 7.873c.013.03.02.064.02.098v.06a.24.24 0 0 1-.02.097C15.952 8.188 13.291 14 8 14S.047 8.188.02 8.128A.24.24 0 0 1 0 8.03v-.059c0-.034.007-.068.02-.098C.048 7.813 2.709 2 8 2s7.953 5.813 7.98 5.873m-1.37-.424a12.097 12.097 0 0 0-1.385-1.862C11.739 3.956 9.999 3 8 3c-2 0-3.74.956-5.225 2.587a12.098 12.098 0 0 0-1.701 2.414a12.095 12.095 0 0 0 1.7 2.413C4.26 12.043 6.002 13 8 13s3.74-.956 5.225-2.587A12.097 12.097 0 0 0 14.926 8c-.08-.15-.189-.343-.315-.551M8 4.75A3.253 3.253 0 0 1 11.25 8A3.254 3.254 0 0 1 8 11.25A3.253 3.253 0 0 1 4.75 8A3.252 3.252 0 0 1 8 4.75m0 1C6.76 5.75 5.75 6.76 5.75 8S6.76 10.25 8 10.25S10.25 9.24 10.25 8S9.24 5.75 8 5.75m0 1.5a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"/></svg></>
                            }
                            </div>
                        </div>
                      )}  
                        
                    <div className="flex flex-col">
                        <Button size="sm" type="submit" className="w-full h-12 shadow-md">
                            {isLoading ? "Loading..." : (!isLogin ? "Register" : "Login")}
                        </Button>
                        <div onClick={toggleIsLogin} className="text-slate-500 text-xs pt-2 text-center">
                            {!isLogin 
                            ? <>Already have an account? <span className="text-blue-500 underline hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                tabIndex="0" 
                                aria-label="Click to go to login page."
                                role="button">Login here</span></>
                            : <>Need an account? <span className="text-blue-500 underline hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                tabIndex="0" 
                                aria-label="Click to go to registration page."
                                role="button">Register here</span></>
                            }
                             </div>
                    </div>           
                </div>
                </form>
            </div>
            <div className="flex overflow-hidden p-5 rounded-2xl">
                <Image src="/login_moon.png" width={500} height={500} alt="" style={{objectFit: "cover"}} className="rounded-2xl"/>
            </div>
        </div>
    )
}