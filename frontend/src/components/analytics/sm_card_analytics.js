export default function SM_Card_Analytics({icon, title, stat, win_loss, className = "" }){
    return (
        <div className={`flex flex-col gap-2 shadow-lg border border-gray-100 h-50 w-auto bg-white rounded-xl p-5
            hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group
            ${className}`}>
            <div className="flex flex-row text-md font-semibold h-auto p-1 items-center">
                <div className="flex grow"><div className="flex items-center justify-center rounded-xl h-12 w-12 bg-green-200 shadow-md object-fit p-2">{icon}</div></div>
                <div className="flex items-center gap-2">
                    <div className="flex">{win_loss.split("")[0] === "+" ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill=""><g fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 3.5h4v4"/><path d="M13.5 3.5L7.85 9.15a.5.5 0 0 1-.7 0l-2.3-2.3a.5.5 0 0 0-.7 0L.5 10.5"/></g></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill="#000000"><g fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 10.5h4v-4"/><path d="M13.5 10.5L7.85 4.85a.5.5 0 0 0-.7 0l-2.3 2.3a.5.5 0 0 1-.7 0L.5 3.5"/></g></svg>}</div>
                    <div className="flex">{win_loss.split("")[0] === "+" ? <div style={{color: "#059669"}}>{win_loss}</div> : <div style={{color: "#e11d48"}}>{win_loss}</div>}</div>
                </div>   
            </div>
            <div className="flex text-md text-gray-400 font-bold">{title}</div>
            <div className="flex text-3xl font-bold">{stat}</div>
        </div>
    )
}