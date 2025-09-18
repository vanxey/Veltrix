'use client'

import Button from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Header(){
    const [isMobile, setIsMobile] = useState(false)
return(
    <header>
            <div className="flex h-16 w-full bg-black  text-white justify-between
            py-4 px-6 m-0">
                <div className="font-bold text-2xl md:flex items-center">
                    <Link href="/">Veltrix</Link>
                </div>
                <nav className="flex-row gap-4 text-base justify-center items-center hidden md:flex">
                    <Link href="/">Home</Link>
                    <Link href="/journaling">Journaling</Link>
                    <Link href="/analytics">Analytics</Link>
                    <Link href="/news">News</Link>
                </nav>
                <div className="text-base justify-end items-center gap-4 hidden md:flex">
                    <Link href="/login">Login</Link>
                    <Button size="sm" text="Get started"/> 
                </div>
                <button
                onClick={() => setIsMobile(!isMobile)}
                className="md:hidden text-white focus:outline-none text-2xl"
                >
                ☰
                </button>
              
            </div>
              {isMobile && (
                    <div className="md:hidden flex flex-col sm:flex-row bg-black border-t border-blue-200 text-white rounded-b-lg place-items-center justify-between">
                        <div className="hover:bg-blue-600 h-full w-full p-4 rounded-b-lg justify-center flex"><Link href="/">Home</Link></div>
                        <div className="hover:bg-blue-600 h-full w-full p-4 rounded-b-lg justify-center flex"><Link href="/journaling">Journaling</Link></div>
                        <div className="hover:bg-blue-600 h-full w-full p-4 rounded-b-lg justify-center flex"><Link href="/analytics">Analytics</Link></div>
                        <div className="hover:bg-blue-600 h-full w-full p-4 rounded-b-lg justify-center flex"><Link href="/news">News</Link></div>
                        <div className="hover:bg-blue-600 h-full w-full p-4 rounded-b-lg justify-center flex"><Link href="/login">Login</Link></div>
                    </div>
                )}
    </header>
)
}