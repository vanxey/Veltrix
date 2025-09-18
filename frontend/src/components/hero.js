import Button from "./ui/button"

export default function Hero(){
    return(
        <div className="grid w-full h-full">
        <div className="flex flex-col gap-10 md:gap-5 place-content-center place-items-center  h-full w-full bg-cover bg-linear-155 from-gray-950 to-blue-500 text-white font-sans px-5">
          <div><h1 className="drop-shadow-xl w-auto font-black md:text-6xl text-4xl text-center">Elevate Your <span className="text-blue-500">Trading</span></h1></div>
          <div className="flex w-auto font-semibold md:text-xl text-md text-gray-300 text-center"><p>
            Professional trading for journaling, performance analytics and{' '}
            <span className="hidden md:inline"><br /></span>
            market intelligence. Transform your trading strategy with data-driven{' '}
            <span className="hidden md:inline"><br /></span>
            insights.
            </p></div>
          <div className="flex flex-row gap-5">
            <Button text="Eplore Services ->"/>
            <Button text="View Pricing" border/>
          </div>
        </div>
      </div>
    )
}