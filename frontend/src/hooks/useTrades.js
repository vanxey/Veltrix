'use client'

import { useState, useEffect } from "react"
import { FETCH_URL } from "@/lib/constants"

const processTrade = (trade) => {
  let pnl = parseFloat(trade.pnl) || 0

  if (trade.outcome === 'Loss') {
    pnl = -Math.abs(pnl)
  } else if (trade.outcome === 'Win') {
    pnl = Math.abs(pnl)
  } else if (trade.outcome === 'BE') {
    pnl = 0
  }
  
  return { ...trade, pnl }
}

export function useTrades() {
  const [data, setData] = useState({
    trades: [],
    sessions: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const tradesRes = await fetch(`${FETCH_URL}/trade`)
        if (!tradesRes.ok) throw new Error('Failed to fetch trades')
        const tradesData = await tradesRes.json()

        const sessionsRes = await fetch(`${FETCH_URL}/session`)
        if (!sessionsRes.ok) throw new Error('Failed to fetch sessions')
        const sessionsData = await sessionsRes.json()

        const list = Array.isArray(sessionsData) ? sessionsData : (sessionsData.rows || sessionsData.sessions || [])
        const processedSessions = list.map(s => ({
          session_id: s.session_id ?? s.id,
          name: s.name ?? s.session_name ?? s.title ?? `Session ${s.session_id || s.id}`,
        }))
        
        const processedTrades = tradesData.map(processTrade)

        setData({
          trades: processedTrades,
          sessions: processedSessions,
          isLoading: false,
          error: null,
        })

      } catch (err) {
        console.error("Failed to load data:", err)
        setData(prev => ({ ...prev, isLoading: false, error: err.message }))
      }
    }

    loadData()
  }, [])

  const addTrade = (newTrade) => {
    const processedNewTrade = processTrade(newTrade)
    setData(prev => ({
      ...prev,
      trades: [...prev.trades, processedNewTrade],
    }))
  }

  const deleteTrade = async (tradeId) => {
    try {
      const response = await fetch(`${FETCH_URL}/trade/${tradeId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        console.error("Failed to delete trade:", await response.json())
        return 
      }
      
      setData(prev => ({
        ...prev,
        trades: prev.trades.filter(trade => trade.trade_id !== tradeId),
      }))

    } catch (err) {
      console.error("Network error:", err)
    }
  }
  
  return { ...data, addTrade, deleteTrade }
}