const getMetrics = (tradeList) => {
  if (!tradeList || tradeList.length === 0) {
    return { pnl: 0, wins: 0, losses: 0, count: 0, winPnl: 0, lossPnl: 0 }
  }

  let pnl = 0
  let wins = 0
  let losses = 0
  let be = 0
  let winPnl = 0
  let lossPnl = 0

  tradeList.forEach(t => {
    const val = parseFloat(t.pnl) || 0
    pnl += val
    if (t.outcome === 'Win') {
      wins++
      winPnl += val
    } else if (t.outcome === 'Loss') {
      losses++
      lossPnl += Math.abs(val)
    } else if (t.outcome === 'BE') { 
      be++
    }
  })

  return { pnl, wins, losses, be, count: tradeList.length, winPnl, lossPnl }
}

/**
 * Calculates a comprehensive set of trading performance metrics and their change versus a previous period (simulated by dropping the last element).
 *
 * @param {Array<object>} trades - An array of trade objects, typically sorted by date.
 * @returns {object} An object containing various statistics: totalPnl, winRate, totalTrades, avgRiskReward, and change metrics (pnlChange, winRateChange, tradesChange, rrChange).
 */
export const calculateAnalytics = (trades = []) => {
  const curr = getMetrics(trades)
  
  const prevTrades = trades.slice(1)
  const prev = getMetrics(prevTrades)

  const winRate = curr.count > 0 ? (curr.wins / curr.count) * 100 : 0
  
  // Calculate average win and average loss magnitude
  const avgWin = curr.wins > 0 ? curr.winPnl / curr.wins : 0
  const avgLoss = curr.losses > 0 ? curr.lossPnl / curr.losses : 1 // Avoid division by zero
  const riskReward = avgLoss > 0 ? avgWin / avgLoss : 0

  // Calculate previous period metrics for comparison
  const prevWinRate = prev.count > 0 ? (prev.wins / prev.count) * 100 : 0
  
  const prevAvgWin = prev.wins > 0 ? prev.winPnl / prev.wins : 0
  const prevAvgLoss = prev.losses > 0 ? prev.lossPnl / prev.losses : 1
  const prevRiskReward = prevAvgLoss > 0 ? prevAvgWin / prevAvgLoss : 0

  let pnlChange = 0
  if (prev.pnl !== 0) {
    pnlChange = ((curr.pnl - prev.pnl) / Math.abs(prev.pnl)) * 100
  } else if (curr.pnl !== 0) {
    pnlChange = 100 
  }

  const winRateChange = winRate - prevWinRate

  const tradesChange = prev.count > 0 ? ((curr.count - prev.count) / prev.count) * 100 : 0

  const rrChange = riskReward - prevRiskReward

  const topTrades = [...trades]
    .sort((a, b) => (parseFloat(b.pnl) || 0) - (parseFloat(a.pnl) || 0))
    .slice(0, 5)

  return {
    totalPnl: curr.pnl,
    winRate,
    totalTrades: curr.count,
    avgRiskReward: `1:${riskReward.toFixed(1)}`,
    
    pnlChange,
    winRateChange,
    tradesChange,
    rrChange,

    winningTrades: curr.wins,
    losingTrades: curr.losses,
    beTrades: curr.be,
    topTrades
  }
}

/**
 * Formats a numeric value into a string representing currency (e.g., +$100.00 or -$50.00).
 *
 * @param {number} value - The raw numeric value.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (value) => {
  const num = parseFloat(value) || 0
  const sign = num >= 0 ? "+" : "-"
  return `${sign}$${Math.abs(num).toFixed(2)}`
}

/**
 * Formats a numeric value into a percentage string (e.g., +10.5% or -5.0%).
 *
 * @param {number} value - The raw numeric value.
 * @returns {string} The formatted percentage string.
 */
export const formatPercentage = (value) => {
  const num = parseFloat(value) || 0
  const sign = num >= 0 ? "+" : "" 
  return `${sign}${num.toFixed(1)}%`
}