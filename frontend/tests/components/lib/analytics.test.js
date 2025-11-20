import { calculateAnalytics } from "@/lib/analytics.utils"

const mockTrades = [
  { pnl: 100, outcome: 'Win', size: 1 },
  { pnl: -50, outcome: 'Loss', size: 1 },
  { pnl: 200, outcome: 'Win', size: 2 },
  { pnl: 0, outcome: 'BE', size: 1 }
]

describe('calculateAnalytics', () => {
  
  test('should return default values for empty input', () => {
    const stats = calculateAnalytics([])
    expect(stats.totalPnl).toBe(0)
    expect(stats.winRate).toBe(0)
    expect(stats.winningTrades).toBe(0)
    expect(stats.losingTrades).toBe(0)
  })

  test('should calculate total PnL correctly', () => {
    const stats = calculateAnalytics(mockTrades)
    expect(stats.totalPnl).toBe(250)
  })

  test('should calculate Win Rate correctly', () => {
    const stats = calculateAnalytics(mockTrades)
    expect(stats.winRate).toBe(50)
  })

  test('should count winning, losing, and BE trades correctly', () => {
    const stats = calculateAnalytics(mockTrades)
    expect(stats.winningTrades).toBe(2)
    expect(stats.losingTrades).toBe(1)
    expect(stats.totalTrades).toBe(4)
  })

  test('should calculate average Risk:Reward correctly', () => {
    const stats = calculateAnalytics(mockTrades)
    expect(stats.avgRiskReward).toBe('1:3.0')
  })

  test('should calculate PnL Change vs previous trades', () => {
    const stats = calculateAnalytics(mockTrades)
    expect(stats.pnlChange).toBeCloseTo(66.67, 1)
  })
})