'use client';
import { useState, useEffect } from "react";
import { FETCH_URL } from "@/lib/constants";

export function useTrades() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${FETCH_URL}/trade`)
      .then(res => res.json())
      .then(data => {
        setTrades(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch trades:", err);
        setIsLoading(false);
      });
  }, []); 

  const deleteTrade = async (tradeId) => {
    try {
      const response = await fetch(`${FETCH_URL}/trade/${tradeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete trade:", await response.json());
        return;
      }
      
      setTrades(currentTrades => currentTrades.filter(trade => trade.trade_id !== tradeId));
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const addTrade = (newTrade) => {
    setTrades(currentTrades => [...currentTrades, newTrade]);
  };
  
  return { trades, isLoading, deleteTrade, addTrade };
}