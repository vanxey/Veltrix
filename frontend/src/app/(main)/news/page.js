'use client'
import Header from "@/components/header"
import Button from "@/components/ui/button"
import { useState } from "react"
export default function News(){
    const [filterTab, setFilterTab] = useState(false)

    const handleClick = () => {
        filterTab === false ? setFilterTab(true) : setFilterTab(false)
        console.log(filterTab)
    }

    return(
        <div className="grid grid-rows-[auto_1fr] max-w-screen h-auto">
            <Header />
            <div className="flex flex-col py-10 px-50 gap-10">
                <div className="flex flex-row gap-3">

                <div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 4.75H6.75a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h10.5a3.5 3.5 0 0 0 3.5-3.5v-9.5a3.5 3.5 0 0 0-3.5-3.5m-14 4.5h17.5M7.361 4.75v-2m9.25 2v-2"/></svg></div>
                <div className="flex flex-col grow">
                    <div className="text-4xl font-black py-1">Forex Calendar</div>
                    <div className="text-sm text-gray-500 font-semibold">Economic events & market news</div>
                </div>
                <Button onOpen={handleClick} text="Filter" icon={<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20"><path fill="#fff" d="m8.398 14.605l1.323 1.143c.29.251.323.691.075.984a.688.688 0 0 1-.976.075l-1.565-1.352a.7.7 0 0 1-.242-.53V7.938L1.171 1.155C.78.703 1.1 0 1.694 0h16.612c.594 0 .912.704.523 1.155l-5.85 6.784v11.363c0 .386-.31.698-.692.698a.695.695 0 0 1-.692-.698V7.678a.7.7 0 0 1 .17-.458l5.023-5.825H3.21L8.228 7.22a.7.7 0 0 1 .17.458v6.927Z"/></svg>}/>
                
                </div>

                <div className={filterTab ? 'flex place-items-center p-10 h-50 w-full rounded-2xl border-2 shadow-xl border-gray-200 bg-gray-800' : 'hidden'}>
                    <div className="flex flex-col  text-gray-100 gap-2">
                        <div className="flex text-lg font-semibold">Filter events</div>
                        <div className="flex text-sm">Try adjusting your filters or check back later</div>
                        <div className="flex flex-col gap-2">
                            <div className="flex text-sm">Impact level</div>
                            <div className="flex gap-2">
                                <Button className="px-5 text-gray-100 border-gray-500 bg-gray-700 hover:border-amber-300 hover:bg-gray-700" text="Low" size="sm" border/>
                                <Button className="px-5 text-gray-100 border-gray-500 bg-gray-700 hover:border-orange-500 hover:bg-gray-700" text="Medium" size="sm" border/>
                                <Button className="px-5 text-gray-100 border-gray-500 bg-gray-700 hover:border-red-500 hover:bg-gray-700" text="High" size="sm" border/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex place-content-center place-items-center h-60 w-full rounded-2xl border-1 shadow-xl border-gray-200 bg-gray-800">
                    <div className="flex flex-col  text-gray-100 justify-center items-center gap-2">
                        <div className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path fill="none" stroke="oklch(55.1% 0.027 264.364)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 4.75H6.75a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h10.5a3.5 3.5 0 0 0 3.5-3.5v-9.5a3.5 3.5 0 0 0-3.5-3.5m-14 4.5h17.5M7.361 4.75v-2m9.25 2v-2"/></svg></div>
                        <div className="flex text-lg font-semibold">No events found</div>
                        <div className="flex text-sm">Try adjusting your filters or check back later</div>
                    </div>
                </div>
            </div>
        </div>
    )
}