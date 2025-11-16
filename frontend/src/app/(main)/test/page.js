'use client'
import Calendar from "@/components/calendar"
import { useTrades } from "@/hooks/useTrades"

export default function Test() {
     const { calendarData, error} = useTrades()

    return (
        <div>
            <Calendar />
        </div>
    )
}