'use client'

import { useState, useEffect } from "react"
import { FETCH_URL } from "@/lib/constants"
import { useAuth } from "@/hooks/useAuth"

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
  const { user } = useAuth()
  const [data, setData] = useState({
    trades: [],
    sessions: [],
    tags: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setData(prev => ({ ...prev, trades: [], isLoading: false }))
        return
      }

      try {
        const tradesRes = await fetch(`${FETCH_URL}/trade?user_id=${user.user_id}`)
        if (!tradesRes.ok) throw new Error('Failed to fetch trades')
        const tradesData = await tradesRes.json()

        const sessionsRes = await fetch(`${FETCH_URL}/session`)
        if (!sessionsRes.ok) throw new Error('Failed to fetch sessions')
        const sessionsData = await sessionsRes.json()

        const tagsRes = await fetch(`${FETCH_URL}/tags?user_id=${user.user_id}`)
        if (!tagsRes.ok) throw new Error('Failed to fetch tags')
        const tagsData = await tagsRes.json()

        const list = Array.isArray(sessionsData) ? sessionsData : (sessionsData.rows || sessionsData.sessions || [])
        const processedSessions = list.map(s => ({
          session_id: s.session_id ?? s.id,
          name: s.name ?? s.session_name ?? s.title ?? `Session ${s.session_id || s.id}`,
        }))
        
        const processedTrades = tradesData.map(processTrade)

        setData({
          trades: processedTrades,
          sessions: processedSessions,
          tags: tagsData,
          isLoading: false,
          error: null,
        })

      } catch (err) {
        console.error("Failed to load data:", err)
        setData(prev => ({ ...prev, isLoading: false, error: err.message }))
      }
    }

    loadData()
  }, [user])

  const addTrade = async (form) => {
    if (!user) return

    const tradeData = {
      user_id: user.user_id,
      asset: form.asset,
      direction: form.direction,
      entry_date: form.entry_date,
      exit_date: form.exit_date,
      size: Number(form.size),
      pnl: Number(form.pnl) || null,
      outcome: form.outcome || null,
      session_id: form.session_id || null,
      strategy: form.strategy || null,
      is_reviewed: form.is_reviewed ? true : false,
      notes: form.notes || null,
      screenshot_url: null,
      tags: form.tags || [],
    }

    try {
      const response = await fetch(`${FETCH_URL}/trades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create trade')
      }

      const result = await response.json()
      const processedNewTrade = processTrade(result)

      const matchedSession = data.sessions.find(s => s.session_id === result.session_id)
      if (matchedSession) {
        processedNewTrade.session_name = matchedSession.name
      }
      
      setData(prev => ({
        ...prev,
        error: null,
        trades: [processedNewTrade, ...prev.trades],
      }))

      return processedNewTrade
    } catch (err) {
      console.error("Network error:", err)
      setData(prev => ({ ...prev, error: err.message }))
      throw err
    }
  }

  const deleteTrade = async (trade_id) => {
    try {
      const response = await fetch(`${FETCH_URL}/trade/${trade_id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        console.error("Failed to delete trade:", await response.json())
        return 
      }
      
      setData(prev => ({
        ...prev,
        trades: prev.trades.filter(trade => trade.trade_id !== trade_id),
      }))

    } catch (err) {
      console.error("Network error:", err)
      setData(prev => ({ ...prev, error: err.message }))
    }
  }

  const addTag = async (tag_data) => {
    if (!user) return

    try {
      const response = await fetch(`${FETCH_URL}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user.user_id,
            tag_name: tag_data.name,
            tag_type: tag_data.type,
            tag_color: tag_data.color
        }),
      })

      if (!response.ok) throw new Error('Failed to add tag')
      
      const newTag = await response.json()
      setData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag].sort((a,b) => a.tag_name.localeCompare(b.tag_name))
      }))
      
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const deleteTag = async (tag_id) => {
    if (!user) return

    try {
      const response = await fetch(`${FETCH_URL}/tags/${tag_id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error('Failed to delete tag')
      }
      setData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag.tag_id !== tag_id)
      }))

    } catch (err) {
      console.error(err)
    }
  }
  
  return { ...data, addTrade, deleteTrade, addTag, deleteTag }
}