import Header from "@/components/header"
import Button from "@/components/ui/button"
import SM_Card_Analytics from "@/components/analytics/sm_card_analytics"
import MD_card_analytics from "@/components/analytics/md_card_analytics"
import Table_card_analytics from "@/components/analytics/table_card_analytics"
import Calendar from "@/components/calendar"

import Table_card_analytics_copy from "@/components/analytics/table_card_analytics_dynamic"
export default function Analytics(){
    return(
        <div className="grid grid-rows-[auto_1fr] w-screen">
             <Header />
             <div className="flex flex-col max-w-screen my-5 mx-auto gap-10">
                <div className="flex bg-white shadow-md border border-gray-100 w-auto h-fit rounded-xl justify-end m-0">
                    <div className="grid grid-cols-6 gap-2 w-auto h-fit py-2 px-2 justify-items-center m-0">
                                    <Button variant="secondary" size="sm" className="text-xs py-0 px-5 shadow-none">1W</Button>
                                    <Button variant="primary" size="sm" className="text-xs py-0 px-5 shadow-none">1M</Button>
                                    <Button variant="secondary" size="sm" className="text-xs py-0 px-5 shadow-none">3M</Button>
                                    <Button variant="secondary" size="sm" className="text-xs py-0 px-5 shadow-none">6M</Button>
                                    <Button variant="secondary" size="sm" className="text-xs py-0 px-5 shadow-none">1Y</Button>
                                    <Button variant="secondary" size="sm" className="text-xs py-0 px-5 shadow-none">ALL</Button>
                    </div>
                </div>

                <div className="flex w-auto h-fit rounded-xl justify-end">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-fit w-full justify-center">
                                    <SM_Card_Analytics
                                        className=""
                                        title="Total P&L"
                                        stat="+$8,234.56"
                                        win_loss="+18.2%"
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#059669" d="M12 20.75a.76.76 0 0 1-.75-.75V4a.75.75 0 0 1 1.5 0v16a.76.76 0 0 1-.75.75Z"/><path fill="#059669" d="M13.5 18.75H7a.75.75 0 0 1 0-1.5h6.5A2.54 2.54 0 0 0 16.25 15a2.54 2.54 0 0 0-2.75-2.25h-3A4 4 0 0 1 6.25 9a4 4 0 0 1 4.25-3.75H16a.75.75 0 0 1 0 1.5h-5.5A2.54 2.54 0 0 0 7.75 9a2.54 2.54 0 0 0 2.75 2.25h3A4 4 0 0 1 17.75 15a4 4 0 0 1-4.25 3.75Z"/></svg>}
                                    />
                                    <SM_Card_Analytics
                                        className=""
                                        title="Win Rate"
                                        stat="72.1%"
                                        win_loss="+4.8%"
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#059669" fillRule="evenodd" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0m9-4.375a4.375 4.375 0 1 0 0 8.75a4.375 4.375 0 0 0 0-8.75M6.125 12a5.875 5.875 0 1 1 11.75 0a5.875 5.875 0 0 1-11.75 0m4.625 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0M12 9.25a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5" clipRule="evenodd"/></svg>}
                                    />
                                    <SM_Card_Analytics
                                        className=""
                                        title="Total Trades"
                                        stat="186"
                                        win_loss="+15%"
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#059669" d="M4.5 20.25a.76.76 0 0 1-.75-.75v-15a.75.75 0 0 1 1.5 0v15a.76.76 0 0 1-.75.75Z"/><path fill="#059669" d="M19.5 20.25h-15a.75.75 0 0 1 0-1.5h15a.75.75 0 0 1 0 1.5ZM8 16.75a.76.76 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v4a.76.76 0 0 1-.75.75Zm3.5 0a.76.76 0 0 1-.75-.75V8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75Zm3.5 0a.76.76 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v4a.76.76 0 0 1-.75.75Zm3.5 0a.76.76 0 0 1-.75-.75V8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75Z"/></svg>}
                                    />
                                    <SM_Card_Analytics
                                        className=""
                                        title="Avg Risk/Reward"
                                        stat="1:2.8"
                                        win_loss="+0.3"
                                        icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></g></svg>
                                        }
                                    />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] w-auto h-auto gap-10 rounded-xl justify-between">
                    <Calendar cardTitle="Trading Calendar" cardDescription="View Trades by day" />
                    <MD_card_analytics
                        classname=""
                        title="Win Rate Analysis"
                        chart=""
                        chart_title="Win Rate"
                        chart_data="68.4%"
                        win_title="Winning Trades"
                        win_data="169"
                        loss_title="Losing Trades"
                        loss_data="78"
                    />
                </div>

                <div className="flex w-auto h-auto gap-5 rounded-xl justify-between">
                    {/* <Table_card_analytics /> */}
                          <Table_card_analytics_copy 
                            table_title="Top Performing Trades"
                            table_description="Your best trades this month"
                            button_txt="View All"
                            table_data={[
                                        {
                                            "pair": "EUR/GBP",
                                            "type": "Buy",
                                            "entry_date": "Jun 7, 2024",
                                            "lot_size": 1.2,
                                            "p_and_l": "+$825"
                                        },
                                        {
                                            "pair": "EUR/USD",
                                            "type": "Buy",
                                            "entry_date": "Jun 21, 2024",
                                            "lot_size": 1.5,
                                            "p_and_l": "+$695"
                                        },
                                        {
                                            "pair": "USD/JPY",
                                            "type": "Buy",
                                            "entry_date": "Jun 5, 2024",
                                            "lot_size": 1,
                                            "p_and_l": "+$670"
                                        },
                                        {
                                            "pair": "USD/CHF",
                                            "type": "Sell",
                                            "entry_date": "Jun 12, 2024",
                                            "lot_size": 0.8,
                                            "p_and_l": "+$540"
                                        }
                                        ]}
                          />
                </div>
             </div>
             
        </div>
    )
}