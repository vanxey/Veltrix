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

export const getDaysInMonthGrid = (daysInMonth, daysFromMonday) => {
    const days = [
        ...Array(daysFromMonday).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ]
    return days
}

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