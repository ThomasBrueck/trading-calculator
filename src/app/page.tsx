import TradingCalculator from "@/components/TradingCalculator";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8"></h1>
      <TradingCalculator />
    </main>
  );
}