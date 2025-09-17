'use client'

import Button from "@/components/ui/button";
import PopUp from "@/components/popup";
import TradeTable from "@/components/tradeTable";
import Header from "@/components/header";
import { useState } from "react"

export default function Journaling() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)

    const [trades, setTrades] = useState([
    {
      // asset: "EUR/USD",
      // direction: "Buy",
      // entry: "1.0500",
      // exit: "1.0600",
      // size: "1 lot",
      // pnl: "+100",
      // outcome: "Win",
      // session: "London",
      // strategy: "Breakout",
      // reviewed: "✅",
      // notes: "Good setup",
      asset: "GBP/USD",
      direction: "Sell",
      entry: "1.2450",
      exit: "1.2380",
      size: "2",
      pnl: "140",
      outcome: "Win",
      session: "New York",
      strategy: "Pullback",
      reviewed: "✅",
      notes: "Good confluence with 200 EMA + key resistance zone. Could have held longer.",
      // stopLoss: "1.2480",
      // takeProfit: "1.2350",
      // dateTime: "2025-09-17T14:30",
      // screenshot: null,  placeholder — would normally be a File or URL
    },
  ]);

    const handleDeleteTrade = (index) =>{
      setTrades(trades.filter((_, i) => i !== index));
    }

    const handleSaveTrade = (trade) => {
    setTrades([...trades, trade]);
    setIsVisible(false);
    setIsBlurred(false);
  };

  return (
    <div className="grid">
      <div className={`grid ${isBlurred ? 'blur-sm' : ''} transition-all duration-300 grid-rows-[auto_1fr_1fr]`}>
        <Header/>
          <div className="w-full h-full p-5 grid gap-4 grid-rows-[auto_1fr_1fr] ">
            <div className=" flex content-center">
              <h2 className="text-2xl font-semibold text-black p-2">📊 Trade Log</h2>
            </div>
            <TradeTable trades={trades} onDelete={handleDeleteTrade}/>
          
            <Button
                onOpen={()=>{
                  setIsVisible(true)
                  setIsBlurred(true)
                }}
                text="Add Journal"
                />
            
        
        </div>
    </div>
    {isVisible && <PopUp 
          onClose={()=>{
            setIsVisible(false)
            setIsBlurred(false)
          }}
          onSave={handleSaveTrade}
        />}
    </div>
  );
}
