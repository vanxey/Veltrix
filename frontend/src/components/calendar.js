'use client'
import { useState, useEffect, useMemo } from "react"
import { FETCH_URL } from "@/lib/constants"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const abbreviated_weekdays = weekdays.map((e)=>e.substring(0,2))

const months = {
        0: ["January", 31],
        1: ["February", 28],
        2: ["March", 31],
        3: ["April", 30],
        4: ["May", 31],
        5: ["June", 30],
        6: ["July", 31],
        7: ["August", 31],
        8: ["September", 30],
        9: ["Oktober", 31],
        10: ["November", 30],
        11: ["December", 31]
    }

const getDays = (daysInMonth, daysFromMonday) =>{
    const days = [
        ...Array(daysFromMonday).fill(null),
        ...Array.from({length: daysInMonth}, (_, i) => i + 1)
    ]

    return days
}

const getformattedCalendarData = (data) =>{
                    const json = []
    
                    data.map((dt, i)=>{
                        const pushData = {
                            exit_date: dt.exit_date,
                            pnl: dt.pnl,
                            outcome: dt.outcome,
                            tradeAmount: 1
                        }
    
                        if(i > 0 && dt.exit_date == data[i - 1].exit_date){
                            json[i - 1].pnl = String(parseInt(json[i - 1].pnl) + parseInt(dt.pnl))
                            json[i - 1].tradeAmount = json[i - 1].tradeAmount + 1
                        }else{
                                json.push(pushData)
                        }
    
                    })
                    return json
                }

export default function Calendar ({
    cardTitle,
    cardDescription,
}) {
    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()
    
    const [currentMonth, setCurrentMonth] = useState(month)
    const [currentYear, setCurrentYear] = useState(year)
    const [selectedField, setSelectedField] = useState(date.getDate())
    const [currentCalendarData, setCurrentCalendarData] = useState([])

    const first_day_of_month = new Date(currentYear, currentMonth, 1)
    const weekday_of_first_day = first_day_of_month.getDay() 
    const days_of_month = getDays(months[currentMonth][1], weekday_of_first_day)

    const getNextMonth = () => {
        if(currentMonth + 1 == 12){
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        }
        else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const getPrevMonth = () => {
        if(currentMonth - 1 == -1){
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        }
        else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const formatMonth = () => {
        return months[currentMonth][0]
    }

    useEffect(()=>{
        const fetchCalendarTrades = async () => {
            try {
                const queryDate = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0]
                const res = await fetch(`${FETCH_URL}/trade_calendar?date=${queryDate}`)
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json()
                console.log(getformattedCalendarData(data))
                
                setCurrentCalendarData(getformattedCalendarData(data))

                
            } catch (error) {
                console.error(error)
            }
        }
        fetchCalendarTrades()
    }, [currentMonth, currentYear])
    
    const tradesByDay = useMemo(() => {
        return new Map(currentCalendarData.map(trade => {
            const day = new Date(trade.exit_date).getDate() 
            return [day, trade]
        }))
    }, [currentCalendarData])

    return (
        <div className="h-screen py-10 px-20 lg:px-70 bg-blue-100 grid grid-cols-1 grid-rows-1 place-content-center place-items-center">
            <div className="h-full w-full bg-white shadow-2xl flex flex-col rounded-2xl overflow-hidden">
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
                    {
                        abbreviated_weekdays.map((day)=>(
                            <div key={day} className="flex text-xs font-bold text-slate-600 pb-2 pt-5">{day}</div>
                        ))
                    }

                    {
                        days_of_month.map((day, index)=>(
                            day === null
                            ? (<div key={index} className="flex text-slate-600 place-content-center place-items-center">{day}</div>)
                            : ( !tradesByDay.get(day)
                                ?(<div key={index} onClick={()=>setSelectedField(day)} className={`flex flex-col text-slate-600 h-full w-full border-2 rounded-xl p-4 aspect-square 
                                    hover:cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 
                                    ${day == selectedField ? "bg-blue-100 border-blue-500" : "border-slate-200"}
                                    `}>
                                        <div className={`flex w-6 h-6 text-sm font-semibold text-slate-500 rounded-3xl pl-1 pt-0.5
                                            ${day == date.getDate() ? "bg-blue-500" : ""}
                                            `}>
                                                <div className={`flex h-full w-full text-sm font-semibold text-slate-500 justify-start
                                                     ${day == date.getDate() ? "!text-white" : ""}
                                                    `}>
                                                    {day}
                                                </div>
                                            
                                        </div>
                                </div>)
                                : (    
                                    <div key={index} onClick={()=>setSelectedField(day)} className={`flex flex-col text-slate-600 h-full w-full border-2 rounded-xl p-4 aspect-square
                                     hover:cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 
                                     ${['Win','BE'].includes(tradesByDay.get(day).outcome) ? "bg-green-200 border-green-300" : "bg-red-200 border-red-300"}
                                     ${day == selectedField ? "!bg-blue-100 !border-blue-500" : ""}
                                    `}>
                                        <div className="flex h-full w-full text-sm font-semibold text-slate-500 justify-start">
                                            {day}
                                        </div>
                                        <div className={`flex flex-col h-full text-xs`}>
                                            <div className={`${['Win','BE'].includes(tradesByDay.get(day).outcome) ? "text-green-600" : "text-red-600"}`}>{`${['Win','BE'].includes(tradesByDay.get(day).outcome) ? "+" : "-"} ${Math.floor(tradesByDay.get(day).pnl)}$`}</div>
                                            <div className="text-slate-500">{tradesByDay.get(day).tradeAmount > 1 ? `${tradesByDay.get(day).tradeAmount} trades` : `${tradesByDay.get(day).tradeAmount} trade`}</div>
                                        </div>
                                    </div>
                                )    
                              
                            )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}