import Button from "@/components/ui/button";
import Link from "next/link";

export default function Header(){
return(
    <nav>
        <div className="grid h-16 w-full bg-black text-white grid-rows-1 grid-cols-3 py-4 px-10 m-0">
            <div className="font-bold text-2xl flex items-center">
                <Link href="/">Veltrix</Link>
            </div>
            <div className="flex flex-row gap-4 text-base justify-center items-center">
                <Link href="/">Home</Link>
                <Link href="/journaling">Journaling</Link>
                <Link href="/analytics">Analytics</Link>
                <Link href="/news">News</Link>
            </div>
            <div className="text-base flex justify-end items-center gap-4">
                <Link href="/login">Login</Link>
                <Button text="Get started"/> 
            </div>
        </div>
    </nav>
)
}