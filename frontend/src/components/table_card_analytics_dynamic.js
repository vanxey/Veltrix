import { jsx } from "react/jsx-runtime";
import Button from "./ui/button";

    const getTableKeys = (rows) =>{
        if(!Array.isArray(rows) || rows.length === 0) return []
        const table_keys = Object.keys(rows[0])

        return table_keys 
    }


export default function Table_card_analytics_copy({table_title, table_description,button_txt, table_data,className=""}){
    const table_keys = getTableKeys(table_data)

    const formatHeader = (key) => {
        if (key === 'p_and_l') return 'P & L'
        const withSpaces = key.replace(/_/g, ' ')
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
    }
    
    const renderCell = (row, key) => {
        const cellValue = row[key]
        const baseClass = "py-4 px-4 text-center"

        switch (key) {
            case 'pair':
                return (
                    <td key={key} className={baseClass}>
                        <div className="font-bold text-slate-900">{cellValue}</div>
                    </td>
                )
                
            case 'type':
                const typeClass = cellValue === 'Buy'
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                
                return (
                    <td key={key} className={baseClass}>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${typeClass}`}>
                            {cellValue}
                        </div>
                    </td>
                )

            case 'p_and_l':
                return (
                    <td key={key} className={baseClass}>
                        <div className="font-bold text-emerald-600">{cellValue}</div>
                    </td>
                )

            default:
                return (
                    <td key={key} className={`${baseClass} text-slate-700`}>
                        {cellValue}
                    </td>
                )
            }
    }
          
    return (
        <div className={`flex flex-col h-auto w-full p-15 gap-5 bg-white rounded-xl
        shadow-xl border border-gray-100 
        ${className}
        `}>
            <div className="flex flex-row place-items-center">
                <div className="flex flex-col grow gap-1">
                    <div className="flex text-2xl font-bold">{table_title}</div>
                    <div className="flex text-sm text-gray-500 px-1">{table_description}</div>
                </div>
                <Button variant="primary" size="sm" className="font-bold border-1 py-0 px-2 shadow-none">{button_txt}</Button>
            </div>
            <div className="flex w-full">

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                            {table_keys.map((key)=>(
                                <th key={key} className="text-center py-3 px-4 text-sm font-semibold text-slate-600">{formatHeader(key)}</th>
                            ))}
                        </tr>
                    </thead>
                 <tbody>
                    {table_data.map((row, rowIndex)=>(
                        <tr key={rowIndex} className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                        {table_keys.map((key)=>( renderCell(row, key)))}
                        </tr>
                    ))}
                </tbody>
                    </table>
            </div>
        </div> 
    )
}