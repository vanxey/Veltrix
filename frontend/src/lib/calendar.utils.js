'use client'

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const ABBREVIATED_WEEKDAYS = WEEKDAYS.map((e) => e.substring(0, 2))

export const MONTHS = {
    0: ["January", 31],
    1: ["February", 28],
    2: ["March", 31],
    3: ["April", 30],
    4: ["May", 31],
    5: ["June", 30],
    6: ["July", 31],
    7: ["August", 31],
    8: ["September", 30],
    9: ["October", 31],
    10: ["November", 30],
    11: ["December", 31]
}

/**
 * Generates an array representing a calendar grid for a month.
 * It prepends null values for days before the first of the month.
 *
 * @param {number} daysInMonth - The total number of days in the current month (e.g., 30, 31).
 * @param {number} daysFromMonday - The number of empty spots needed at the start of the grid (0 for Monday, 6 for Sunday).
 * @returns {Array<number|null>} An array of day numbers and null placeholders.
 */
export const getDaysInMonthGrid = (daysInMonth, daysFromMonday) => {
    const days = [
        ...Array(daysFromMonday).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ]
    return days
}

/**
 * Processes raw trade data for a month into a Map optimized for calendar display.
 * It aggregates PnL and counts of trades for each day.
 *
 * @param {Array<object>} data - An array of trade objects for a specific month.
 * @param {number} data[].pnl - The PnL value of the trade.
 * @param {('Win'|'Loss'|'BE')} data[].outcome - The outcome of the trade.
 * @param {string} data[].exit_date - The date the trade exited (used to determine the day).
 * @returns {Map<number, object>} A Map where the key is the day of the month (number) and the value is the aggregated trade data.
 * @returns {object} MapValue - Aggregated data for a day.
 * @returns {number} MapValue.pnl - Total PnL for the day.
 * @returns {number} MapValue.tradeAmount - Total number of trades for the day.
 * @returns {('Loss'|'Win'|'BE')} MapValue.outcome - The aggregate outcome (defaults to Loss if any trade was a Loss).
 */
export const processCalendarData = (data) => {
    const processedData = new Map()

    data.forEach(trade => {
        const day = new Date(trade.exit_date).getDate()
        const pnl = parseFloat(trade.pnl) || 0

        if (processedData.has(day)) {
            const existing = processedData.get(day)
            existing.pnl += pnl
            existing.tradeAmount += 1
            if (trade.outcome === 'Loss') {
                existing.outcome = 'Loss'
            }
        } else {
            processedData.set(day, {
                pnl: pnl,
                outcome: trade.outcome,
                tradeAmount: 1
            })
        }
    })
    //console.log(processedData)

    return processedData
}