'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function MD_card_analytics({title, chart, chart_title, chart_data, win_title, win_data, loss_title, loss_data, className=""}){
    const data = {
        datasets: [
            {
                responsive: true,
                label: 'Win Rate Percentage',
                data: [68.4, 31.6],
                backgroundColor: ['#059669', '#fee2e2'],
                borderWidth: 0,
                cutout: "75%",
            },
        ],
    }

    return (
        <div className={`flex flex-col gap-10 shadow-md border border-gray-100 w-auto bg-white rounded-xl p-5
            ${className}`}>

            <div className="flex text-2xl font-bold">{title}</div>

            <div className="flex flex-col place-items-center">
                <div className="relative">
                    <div className="flex" style={{height: "200px", width: "200px"}}><Doughnut data={data}/></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold">{chart_data}</div>
                        <div className="text-gray-600 text-xs">{chart_title}</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className="flex shadow-sm flex-row font-semibold bg-green-100 h-auto w-full p-4 rounded-2xl">
                <div className="flex items-center gap-3 grow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 14 14" fill=""><g fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 3.5h4v4"/><path d="M13.5 3.5L7.85 9.15a.5.5 0 0 1-.7 0l-2.3-2.3a.5.5 0 0 0-.7 0L.5 10.5"/></g></svg>
                    <div className="flex">{win_title}</div>
                </div>
                <div className="flex text-2xl font-bold" style={{color: "#059669"}}>{win_data}</div>
            </div>

            <div className="flex shadow-sm flex-row font-semibold bg-red-100 h-auto w-full p-4 rounded-2xl">
                <div className="flex items-center gap-3 grow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 14 14" fill="#000000"><g fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 10.5h4v-4"/><path d="M13.5 10.5L7.85 4.85a.5.5 0 0 0-.7 0l-2.3 2.3a.5.5 0 0 1-.7 0L.5 3.5"/></g></svg>
                    <div className="flex">{loss_title}</div>
                </div>
                <div className="flex text-2xl font-bold" style={{color: "#e11d48"}}>{loss_data}</div>
            </div>
            </div>
            

            
        </div>
    )
}