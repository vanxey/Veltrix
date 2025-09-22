'use client'

import Button from "@/components/ui/button";
import PopUp from "@/components/popup";
import TradeTable from "@/components/tradeTable";
import Header from "@/components/header";
import { useState,useEffect } from "react"

export default function Journaling() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

   const [trades, setTrades] = useState([]);
      useEffect(() => {
        fetch("http://localhost:4000/trade")
          .then(res => res.json())
          .then(data => setTrades(data))
          .catch(err => console.error(err));
      }, [])

  // not dynamic
  //   const [trades, setTrades] = useState([
  //   {
  //     // asset: "GBP/USD",
  //     // direction: "Sell",
  //     // entry: "1.2450",
  //     // exit: "1.2380",
  //     // size: "2",
  //     // pnl: "140",
  //     // outcome: "Win",
  //     // session: "New York",
  //     // strategy: "Pullback",
  //     // reviewed: "✅",
  //     // notes: "Good confluence with 200 EMA + key resistance zone. Could have held longer.",
  //     // stopLoss: "1.2480",
  //     // takeProfit: "1.2350",
  //     // dateTime: "2025-09-17T14:30",
  //     // screenshot: null,  placeholder — would normally be a File or URL
  //   },
  // ]);

    const handleDeleteTrade = async (tradeId) =>{
      // console.log(tradeId)
      // trades.filter(trade => console.log(trade.trade_id))
      try {
        const response = await fetch(`http://localhost:4000/trade/${tradeId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          const error = await response.json();
          console.error("Failed to delete trade:", error);
          return
        }

        console.log(`Trade with ID ${tradeId} deleted successfully.`);
  
        setTrades(trades.filter(trade => trade.trade_id != tradeId));
        } catch (err) {
          console.error("Network error:", err);
        }
      }

      const handleSaveTrade = (trades) => {
        setTrades([...trades, trades]);
        setIsVisible(false);
        setIsBlurred(false);
      }

  return (
    // bg-[url(/gradient.svg)] bg-contain
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
                  setIsOpen(true)
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
            setIsOpen(false)
          }}
          onSave={handleSaveTrade}
          isOpen={isOpen}
        />}
    </div>
  );
}
