'use client'

import Button from "@/components/ui/button";
import PopUp from "@/components/popup";
import TradeTable from "@/components/tradeTable";
import Header from "@/components/header";
import { useState } from "react";
import { useTrades } from "@/hooks/useTrades";

export default function Journaling() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  
  const { trades, isLoading, deleteTrade, addTrade } = useTrades();

  const handleSaveTrade = (newTrade) => {
    addTrade(newTrade); 
    setIsVisible(false);
    setIsBlurred(false);
  };

  const openPopup = () => {
    setIsVisible(true);
    setIsBlurred(true);
  };

  const closePopup = () => {
    setIsVisible(false);
    setIsBlurred(false);
  };

  return (
    <div className="grid">
      <div className={`grid ${isBlurred ? 'blur-sm' : ''} transition-all duration-300 grid-rows-[auto_1fr_1fr]`}>
        <Header />
        <div className="w-full h-full p-5 grid gap-4 grid-rows-[auto_1fr_1fr] ">
          <div className=" flex content-center">
            <h2 className="text-2xl font-semibold text-black p-2">Trade Log</h2>
          </div>
          
          {isLoading ? (
            <div>Loading trades...</div>
          ) : (
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
        />
      )}
    </div>
  );
}