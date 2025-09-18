import Card from "@/components/card";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-rows-[auto_1fr] font-sans h-screen w-full">
        <Header />
        <Hero />
      </div>
      <div className="grid grid-rows-[auto_1fr] h-auto md:h-auto w-full px-5">
        <div className="flex flex-col gap-5 place-content-center place-items-center h-full py-20 w-full px-5">
          <div>
            <h1 className="drop-shadow-xl w-auto font-black md:text-5xl text-3xl text-center">
              Professional Trading <span className="text-blue-600">Tools</span>
            </h1>
          </div>
          <div className="flex w-auto text-xl font-light text-gray-700 text-center">
            <p>
            Everything you need to analyze, track and improve your trading
            performance in one
            <span className="hidden md:inline"><br /></span>
            comprehensive platform.
          </p>

          </div>
        </div>

        <div className="flex flex-row gap-10 md:place-content-center md:place-items-center h-full w-full pb-10 overflow-x-auto md:h-[600px]  snap-x snap-mandatory items-stretch">
          <Card
          className="snap-start"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 21 21"
              >
                <path
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.5 6.59c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1zm-8 0c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1z"
                />
              </svg>
            }
            title="Trading Journal"
            description="Comprehensive trade logging with emotional tracking, strategy notes and automated trade import."
            items={[
              "Automated trade import from major brokers",
              "Emotional state tracking and analysis",
              "Strategy categorization and tagging",
              "Trade screenshots and chart attachments",
              "Custom trade templates and workflows",
            ]}
          />
          <Card
          className="snap-start"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 32 32"
              >
                <path fill="#fff" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
                <path
                  fill="#fff"
                  d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
                />
              </svg>
            }
            title="Performance Analytics"
            description="Advanced analytics and visualizations to understand your trading patterns and improve performance."
            items={[
              "Real-time P&L tracking and projections",
              "Risk-reward ratio analysis",
              "Win rate and expectancy calculations",
              "Drawdown analysis and recovery metrics",
              "Time-based performance breakdowns",
            ]}
          />
          <Card
          className="snap-start"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="#fff"
                  d="M2048 512v896q0 53-20 99t-55 81t-82 55t-99 21H249q-51 0-96-20t-79-53t-54-79t-20-97V256h1792v256h256zm-128 128h-128v704q0 26-19 45t-45 19q-26 0-45-19t-19-45V384H128v1031q0 25 9 47t26 38t39 26t47 10h1543q27 0 50-10t40-27t28-41t10-50V640zm-384 0H256V512h1280v128zm0 768h-512v-128h512v128zm0-256h-512v-128h512v128zm0-256h-512V768h512v128zm-640 512H256V765h640v643zm-512-128h384V893H384v387z"
                />
              </svg>
            }
            title="News Aggregation"
            description="Curated market news and analysis from trusted financial sources, personalized to your watchlist."
            items={[
              "Real-time news from 50+ financial sources",
              "AI-powered sentiment analysis",
              "Personalized news based on your portfolio",
              "Breaking news alerts and notifications",
              "Economic calendar and event tracking",
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 place-content-center place-items-center h-auto w-full py-20">
        <div className="flex bg-black w-9/10 rounded-4xl h-full flex-col gap-5 place-content-center py-10 px-5">
          <div>
            <h1 className="drop-shadow-2xl w-auto font-black text-white md:text-4xl text-2xl text-center">
              Ready to Transform Your Trading?
            </h1>
          </div>
          <div className="flex w-auto md:text-xl text-md font-light text-gray-300 text-center justify-center">
            <p>
              Join thousands of traders who have improved their performance with
              <span className="hidden md:inline"><br /></span>
              Veltrix&apos;s comprehensive platform.
            </p>

          </div>
          <div className="flex justify-center">
            <Button className="text-md p-1" text="Start Free Trial ->" />
          </div>
        </div>
      </div>
    </div>
  );
}
