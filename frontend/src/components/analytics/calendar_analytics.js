'use client'
import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentMonth = 'June 2024';

const tradingData = {
  3: { profit: 290, trades: 2 },
  5: { profit: 670, trades: 1 },
  7: { profit: 950, trades: 3 },
  12: { profit: 540, trades: 1 },
  14: { profit: 320, trades: 2 },
  18: { profit: 315, trades: 1 },
  21: { profit: 1075, trades: 2 },
  23: { profit: -280, trades: 1 },
  26: { profit: 690, trades: 2 },
  28: { profit: -88, trades: 1 },
};

export default function Calendar_analytics() {
  const daysInMonth = [
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, null, null, null, null, null, null,
  ];

  const getProfitColor = (profit) => {
    if (!profit) return 'text-gray-500';
    return profit > 0 ? 'text-emerald-600' : 'text-red-600';
  };

  const formatProfit = (profit) => {
    if (profit === undefined) return '';
    const sign = profit >= 0 ? '+' : '';
    return `${sign}${Math.abs(profit)}`;
  };

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trading Calendar</h2>
        <p className="text-sm text-gray-500">View trades by day</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-600 hover:text-gray-900 transition-colors">&lt;</button>
        <h3 className="text-lg font-semibold text-gray-800">{currentMonth}</h3>
        <button className="text-gray-600 hover:text-gray-900 transition-colors">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2 border-b border-gray-200">
            {day}
          </div>
        ))}

        {daysInMonth.map((day, index) => {
          const data = tradingData[day];
          const hasData = !!data;
          const profitColor = getProfitColor(data?.profit);
          
          return (
            <div
              key={index}
              className={`
                min-h-[80px] p-1.5 border border-gray-100 rounded-md transition-shadow cursor-pointer
                ${hasData ? 'bg-white hover:shadow-lg' : 'bg-gray-50 text-gray-400 pointer-events-none'}
                ${(index + 1) % 7 === 0 || index % 7 === 0 ? 'bg-gray-100' : ''} 
              `}
            >
              <div className="text-sm font-semibold mb-1">
                {day}
              </div>

              {hasData && (
                <div className="flex flex-col items-start space-y-0.5">
                  <div className={`text-xs font-bold ${profitColor}`}>
                    {formatProfit(data.profit)}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {data.trades} trade{data.trades > 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};