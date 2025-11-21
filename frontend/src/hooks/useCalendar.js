'use client'

import { useState, useEffect, useMemo } from "react"
import { FETCH_URL } from "@/lib/constants"
import { processCalendarData } from "@/lib/calendar.utils"
import { useAuth } from "@/hooks/useAuth"

/**
 * Custom React Hook for fetching aggregated trade data specifically for the calendar view.
 * Fetches data based on the currently selected month and year.
 *
 * @param {number} currentYear - The year being displayed (e.g., 2024).
 * @param {number} currentMonth - The 0-indexed month being displayed (0 for January, 11 for December).
 * @returns {object} CalendarData - The trade data and state.
 * @returns {Map<number, object>} CalendarData.tradesByDay - A Map of aggregated trade data, keyed by day of the month.
 * @returns {boolean} CalendarData.isLoading - True if data is currently being fetched.
 * @returns {string|null} CalendarData.error - Any error message during data operations.
 */
export function useCalendarTrades(currentYear, currentMonth) {
    const [tradesByDay, setTradesByDay] = useState(new Map())
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        const fetchCalendarTrades = async () => {
            if (!user) return

            setIsLoading(true)
            setError(null)
            try {
                // Format the month and construct the query date (e.g., 2024-01-01)
                const monthQuery = (currentMonth + 1).toString().padStart(2, '0')
                const queryDate = `${currentYear}-${monthQuery}-01`
                
                // API endpoint: GET /trade_calendar
                const res = await fetch(`${FETCH_URL}/trade_calendar?date=${queryDate}&user_id=${user.user_id}`)
                if (!res.ok) throw new Error('Failed to fetch calendar trades')
                
                const data = await res.json()
                
                // Process raw trade list into a structure consumable by the calendar component
                setTradesByDay(processCalendarData(data))
                
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCalendarTrades()
    }, [currentMonth, currentYear, user])

    return { tradesByDay, isLoading, error }
}