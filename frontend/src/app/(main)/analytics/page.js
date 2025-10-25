import Header from "@/components/header"
import Button from "@/components/ui/button"
export default function Analytics(){
    return(
        <div className="grid grid-rows-[auto_1fr]">
             <Header />
             <div className="flex flex-col max-w-full my-5 mx-70 gap-10">
                <div className="flex bg-gray-200 w-auto h-fit rounded-xl justify-end m-0">
                    <div className="grid grid-cols-6 gap-2 w-auto h-fit py-2 px-2 justify-items-center m-0">
                                    <Button className="text-xs py-0 px-5" text="1W" border/>
                                    <Button className="text-xs py-0 px-5" text="1M" />
                                    <Button className="text-xs py-0 px-5" text="3M" border/>
                                    <Button className="text-xs py-0 px-5" text="6M" border/>
                                    <Button className="text-xs py-0 px-5" text="1Y" border/>
                                    <Button className="text-xs py-0 px-5" text="ALL" border/>
                    </div>
                </div>

                <div className="flex w-auto h-fit rounded-xl justify-end">
                    <div className="grid grid-cols-4 gap-10 h-fit w-full justify-center">
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                    </div>
                </div>

                <div className="grid grid-cols-[70%_1fr] w-auto h-auto gap-10 rounded-xl justify-between">
                    <div className="flex h-200 w-full justify-center py-2 bg-gray-200 rounded-xl"></div>       
                    <div className="flex h-200 w-full justify-center py-2 bg-gray-200 rounded-xl"></div>
                </div>

                <div className="flex w-auto h-auto gap-5 rounded-xl justify-between">
                    <div className="flex h-100 w-full justify-center py-2 bg-gray-200 rounded-xl"></div>       
                </div>
             </div>
             
        </div>
    )
}