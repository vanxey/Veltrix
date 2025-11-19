export const calculateAnalytics = (trades = []) => {
  if (!trades.length) {
    return {
      totalPnl: 0,
      winRate: 0,
      totalTrades: 0,
      avgRiskReward: 0,
      winningTrades: 0,
      losingTrades: 0,
      topTrades: []
    };
  }

  let totalPnl = 0
  let winningTrades = 0
  let losingTrades = 0
  let totalWinPnl = 0
  let totalLossPnl = 0

  trades.forEach(trade => {
    const pnl = parseFloat(trade.pnl) || 0
    totalPnl += pnl

    if (trade.outcome === 'Win') {
      winningTrades++
      totalWinPnl += pnl
    } else if (trade.outcome === 'Loss') {
      losingTrades++
      totalLossPnl += Math.abs(pnl)
    }
  })

  const totalTrades = trades.length
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0

  const avgWin = winningTrades > 0 ? totalWinPnl / winningTrades : 0
  const avgLoss = losingTrades > 0 ? totalLossPnl / losingTrades : 1
  const riskRewardRatio = avgLoss > 0 ? (avgWin / avgLoss).toFixed(1) : 0

  const topTrades = [...trades]
    .sort((a, b) => (parseFloat(b.pnl) || 0) - (parseFloat(a.pnl) || 0))
    .slice(0, 5)

  return {
    totalPnl,
    winRate,
    totalTrades,
    avgRiskReward: `1:${riskRewardRatio}`,
    winningTrades,
    losingTrades,
    topTrades
  }
}

export const formatCurrency = (value) => {
  const sign = value >= 0 ? "+" : "-"
  return `${sign}$${Math.abs(value).toFixed(2)}`
}

export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`
}