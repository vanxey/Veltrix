'use client'

import { useState, useEffect, useMemo } from "react"
import { FETCH_URL } from "@/lib/constants"
import { processCalendarData } from "@/lib/calendar.utils"

export function useCalendarTrades(currentYear, currentMonth) {
    const [tradesByDay, setTradesByDay] = useState(new Map())
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCalendarTrades = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const monthQuery = (currentMonth + 1).toString().padStart(2, '0')
                const queryDate = `${currentYear}-${monthQuery}-01`
                
                const res = await fetch(`${FETCH_URL}/trade_calendar?date=${queryDate}`)
                if (!res.ok) throw new Error('Failed to fetch calendar trades')
                
                const data = await res.json()
                
                setTradesByDay(processCalendarData(data))
                
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCalendarTrades()
    }, [currentMonth, currentYear])

    return { tradesByDay, isLoading, error }
}