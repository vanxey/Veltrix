import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
export default function HelloCard (){
    const {user, isLogin} = useAuth()

    return(
        <div className="grid w-auto h-auto md:mx-20 lg:mx-50 bg-slate-100 grid-cols-1  md:grid-cols-[1fr_40%] lg:grid-cols-[1fr_40%] rounded-2xl content-center items-center">
                    <div className="flex flex-col py-5 px-5 md:py-5 md:px-15 lg:py-10 lg:px-20 gap-5 ">
                        <div className="text-black font-bold text-3xl m-2 text-center">
                            {!isLogin ? "Create account" : `Welcome back ${user}!` }
                        </div>
                    </div>
                    <div className="flex overflow-hidden p-5 rounded-2xl">
                        <Image src="/login_moon.png" width={500} height={500} alt="" style={{objectFit: "cover"}} className="rounded-2xl"/>
                    </div>
                </div>
    )
}