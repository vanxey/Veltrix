'use client'

import { useState } from "react"
import { useCalendarTrades } from "@/hooks/useCalendar"
import { ABBREVIATED_WEEKDAYS, MONTHS, getDaysInMonthGrid } from "@/lib/calendar.utils"

export default function Calendar({ cardTitle, cardDescription }) {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [selectedField, setSelectedField] = useState(today.getDate())

    const { tradesByDay, isLoading, error } = useCalendarTrades(currentYear, currentMonth)

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const weekdayOfFirstDay = (firstDayOfMonth.getDay() + 6) % 7
    const daysInMonth = MONTHS[currentMonth][1]
    const daysOfMonth = getDaysInMonthGrid(daysInMonth, weekdayOfFirstDay)

    const getNextMonth = () => {
        if (currentMonth + 1 === 12) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const getPrevMonth = () => {
        if (currentMonth - 1 === -1) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const formatMonth = () => {
        return MONTHS[currentMonth][0]
    }
    
    const formatPnl = (outcome, pnl) => {
      const sign = outcome == "Loss" ? "-" : "+"
      return `${sign}${Math.abs(Math.floor(pnl))}$`
    }

    return (
        <div className="h-auto w-auto rounded-2xl grid grid-cols-1 grid-rows-1 place-content-center place-items-center">
            <div className="h-full w-full pb-5 bg-white shadow-lg border-gray-200 flex flex-col rounded-2xl overflow-hidden">
                
                <div className="grid grid-cols-2 w-full px-5 h-20 bg-gray-800 py-5">
                    <div className="flex flex-col place-content-center">
                        <div className="text-lg font-bold text-white">{cardTitle}</div>
                        <div className="text-xs px-1 text-slate-300">{cardDescription}</div>
                    </div>
                    <div className="grid grid-cols-[20%_1fr_20%] place-items-center">
                        <button onClick={getPrevMonth} className="text-slate-200 transition-colors hover:shadow-md hover:cursor-pointer hover:bg-black hover:border-gray-50 h-full w-full rounded-md place-content-center place-items-center"><div>&lt;</div></button>
                        <div className="flex flex-row gap-1 text-slate-200 font-semibold">{formatMonth()} <div>{currentYear}</div></div>
                        <button onClick={getNextMonth} className="text-slate-200 transition-colors hover:shadow-md hover:cursor-pointer hover:bg-black hover:border-gray-50 h-full w-full rounded-md place-content-center place-items-center">&gt;</button>
                    </div>
                </div>

                
                <div className="grid grid-cols-7 w-full px-5 h-auto gap-1 place-content-center place-items-center">
                    {ABBREVIATED_WEEKDAYS.map((day) => (
                        <div key={day} className="flex text-xs font-bold text-slate-600 pb-2 pt-5">{day}</div>
                    ))}

                    
                    {isLoading && <div className="col-span-7 p-4 text-center text-gray-500">Loading trades...</div>}
                    {error && <div className="col-span-7 p-4 text-center text-red-500">Error: {error}</div>}

                    {!isLoading && !error && daysOfMonth.map((day, index) => {
                        if (day === null) {
                            return <div key={index} className="flex text-slate-600 place-content-center place-items-center"></div>
                        }

                        const tradeData = tradesByDay.get(day)
                        const isSelected = day === selectedField
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                        
                        let dayClasses = "flex flex-col text-slate-600 h-full w-full border-2 rounded-xl p-4 aspect-square hover:cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300"
                        
                        if (tradeData) {
                            dayClasses += (tradeData.outcome === 'Loss' ? " bg-red-200 border-red-300" : " bg-green-200 border-green-300")
                        } else {
                            dayClasses += " border-slate-200"
                        }
                        
                        if (isSelected) {
                            dayClasses += " !bg-blue-100 !border-blue-500"
                        }

                        return (
                            <div key={index} onClick={() => setSelectedField(day)} className={dayClasses}>
                                <div className={`flex w-6 h-6 text-sm font-semibold text-slate-500 rounded-3xl pl-1 pt-0.5 ${isToday ? "bg-blue-500" : ""}`}>
                                    <div className={`flex h-full w-full text-sm font-semibold text-slate-500 justify-start ${isToday ? "!text-white" : ""}`}>
                                        {day}
                                    </div>
                                </div>
                                
                                {tradeData && (
                                    <div className="flex flex-col h-full text-xs mt-1">
                                        <div className={tradeData.outcome === 'Loss' ? "text-red-600" : "text-green-600"}>
                                            {formatPnl(tradeData.outcome, tradeData.pnl)}
                                        </div>
                                        <div className="text-slate-500">
                                            {tradeData.tradeAmount > 1 ? `${tradeData.tradeAmount} trades` : `${tradeData.tradeAmount} trade`}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}