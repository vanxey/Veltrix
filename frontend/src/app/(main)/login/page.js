'use client'

import Header from "@/components/header"
import LoginForm from "@/components/login_form"
import { useState } from "react"

export default function Login(){
    const [isLogin, setIsLogin] = useState(false)

    const toggleIsLogin = () => {
        setIsLogin(prevMode => !prevMode)
    }

    return(
        <div className="flex w-full h-full flex-col">
            <Header />
            <div className="flex flex-col gap-10 md:gap-5 place-content-center place-items-center h-full w-full bg-cover bg-linear-155 from-gray-950 to-blue-500 text-white font-sans px-5">
                <LoginForm
                    isLogin={isLogin}
                    toggleIsLogin={toggleIsLogin}
                />
            </div>
        </div>
    )
}