import Button from "@/components/ui/button";

export default function Header(){
return(
    <div className="grid h-16 w-full bg-black text-white grid-rows-1 grid-cols-3 py-4 px-10 m-0">
        <div className="font-bold text-2xl flex items-center">
            Veltrix
        </div>
        <div className="flex flex-row gap-4 text-lg justify-center items-center">
            <a>Home</a>
            <a>Services</a>
            <a>Pricing</a>
            <a>Contact</a>
        </div>
        <div className="text-lg flex justify-end items-center gap-4">
            <a>Login</a>
            <Button text="Get started"/>
        </div>
    </div>
)
}