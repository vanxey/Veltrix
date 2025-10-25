import Header from "@/components/header"
import Button from "@/components/ui/button"
export default function Analytics(){
    return(
        <div className="grid grid-rows-[auto_1fr]">
             <Header />
             <div className="flex flex-col w-full">
                <div className="flex bg-gray-200 w-auto h-fit m-5 rounded-xl justify-end">

                    <div className="grid grid-cols-6 gap-2 w-auto h-fit py-2 justify-items-center">
                                    <Button className="text-xs py-0 px-5" text="1W" border/>
                                    <Button className="text-xs py-0 px-5" text="1M" />
                                    <Button className="text-xs py-0 px-5" text="3M" border/>
                                    <Button className="text-xs py-0 px-5" text="6M" border/>
                                    <Button className="text-xs py-0 px-5" text="1Y" border/>
                                    <Button className="text-xs py-0 px-5" text="ALL" border/>
                    </div>
                </div>

                <div className="flex w-auto h-fit m-5 rounded-xl justify-end">

                    <div className="grid grid-cols-4 gap-2 h-fit w-full justify-center py-2">
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                                    <div className="grid h-50 w-auto bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
             </div>
             
        </div>
    )
}