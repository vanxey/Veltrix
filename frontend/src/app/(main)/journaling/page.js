'use client'

import Button from "@/components/ui/button"
import PopUp from "@/components/popup_form"
import TradeTable from "@/components/trade_table/trade_table"
import Header from "@/components/header"
import { useState } from "react"
import { useTrades } from "@/hooks/useTrades" 
import { useAuth } from "@/hooks/useAuth"

export default function Journaling() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)
  
  const { trades, sessions, tags, isLoading, deleteTrade, addTrade, error} = useTrades()
  const { user } = useAuth()

  const handleSaveTrade = async (form) => {
    try {
      await addTrade(form) 
      setIsVisible(false)
      setIsBlurred(false)
    } catch (err) {
      console.error("Failed to save trade:", err)
    }
  }

  const openPopup = () => {
    setIsVisible(true)
    setIsBlurred(true)
  }

  const closePopup = () => {
    setIsVisible(false)
    setIsBlurred(false)
  }

  return (
    <div className="grid">
      <div className={`grid ${isBlurred ? 'blur-sm' : ''} transition-all duration-300 grid-rows-[auto_1fr_1fr]`}>
        <Header />
        <div className="w-full h-full p-5 grid gap-4 grid-rows-[auto_1fr_1fr]">
          <div className=" flex content-center">
            <h2 className="text-2xl font-semibold text-black p-2">Overview of {user ? `${user.username}'s` : ''} trade logs</h2>
          </div>
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Loading trades...</div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!isLoading && !error && (
            <TradeTable trades={trades} onDelete={deleteTrade} />
          )}

          <Button onClick={openPopup}>Add Journal</Button>
        </div>
      </div>
      
      {isVisible && (
        <PopUp
          isOpen={isVisible}
          onClose={closePopup}
          onSave={handleSaveTrade}
          sessions={sessions}
          tags={tags}
        />
      )}
    </div>
  )
}