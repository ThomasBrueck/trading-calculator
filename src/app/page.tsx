import TradingCalculator from "@/components/TradingCalculator";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12 md:p-24 bg-[#000000]">
      <div className="mb-10 mt-4 md:mt-0 flex flex-col items-center animate-fade-in-down">
        <div className="relative p-2 rounded-full">
          <Image 
            src="/logo.png" 
            alt="Trading Calculator Logo" 
            width={200} 
            height={200} 
            className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            priority
          />
        </div>
      </div>
      <TradingCalculator />
    </main>
  );
}