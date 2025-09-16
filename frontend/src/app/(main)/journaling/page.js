'use client'

import Button from "@/components/ui/button";
import PopUp from "@/components/popup";
import { useState } from "react"

export default function Journaling() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)

  return (
    <div className="grid">
      <div className={`grid ${isBlurred ? 'blur-sm' : ''} transition-all duration-300`}>
          <div className="w-full h-full p-5 grid gap-4 grid-rows-[auto_1fr_1fr] bg-gray-100">
            <div className="bg-black flex content-center">
              <h2 className="text-2xl font-semibold text-gray-100 p-2">📊 Trade Log</h2>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg p-2">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Asset</th>
                    <th className="border p-3 text-left">Direction</th>
                    <th className="border p-3 text-left">Entry</th>
                    <th className="border p-3 text-left">Exit</th>
                    <th className="border p-3 text-left">Size</th>
                    <th className="border p-3 text-left">PnL</th>
                    <th className="border p-3 text-left">Outcome</th>
                    <th className="border p-3 text-left">Session</th>
                    <th className="border p-3 text-left">Strategy</th>
                    <th className="border p-3 text-left">Reviewed</th>
                    <th className="border p-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border p-3">EUR/USD</td>
                    <td className="border p-3">Buy</td>
                    <td className="border p-3">1.0500</td>
                    <td className="border p-3">1.0600</td>
                    <td className="border p-3">1 lot</td>
                    <td className="border p-3 text-green-600">+100</td>
                    <td className="border p-3 bg-green-100">Win</td>
                    <td className="border p-3">London</td>
                    <td className="border p-3">Breakout</td>
                    <td className="border p-3">✅</td>
                    <td className="border p-3">Good setup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
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
        />}
    </div>
  );
}
