'use client'

import { useState, useEffect } from "react"
import { FETCH_URL } from "@/lib/constants"

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
        const normalizedSessions = list.map(s => ({
          session_id: s.session_id ?? s.id,
          name: s.name ?? s.session_name ?? s.title ?? `Session ${s.session_id || s.id}`,
        }))
        
        setData({
          trades: tradesData,
          sessions: normalizedSessions,
          isLoading: false,
          error: null,
        })

      } catch (err) {
        console.error("Failed to load data:", err)
        setData(prev => ({ ...prev, isLoading: false, error: err }))
      }
    }

    loadData()
  }, [])

  const addTrade = (newTrade) => {
    setData(prev => ({
      ...prev,
      trades: [...prev.trades, newTrade],
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