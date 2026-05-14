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

      <footer className="mt-16 w-full max-w-7xl text-[10px] sm:text-xs text-gray-500 text-justify leading-relaxed opacity-80 border-t border-gray-800 pt-8 pb-4 px-4 sm:px-0">
        <p className="mb-3">
          Las operaciones de trading conllevan riesgos inherentes y, al optar por aplicarlas en su plan de trading, el usuario debe ser consciente de que no habrá responsabilidad legal por las eventuales pérdidas o ganancias generadas. Las señales proporcionadas no están dirigidas a todos los inversores y deben ser evaluadas en relación con el capital de inversión individual. El inversor podría potencialmente perder todo su capital de inversión. El capital de riesgo es dinero que puede ser perdido sin poner en peligro la seguridad financiera o el estilo de vida del usuario. El capital destinado al trading debe ser capital de riesgo. Los resultados pasados no garantizan resultados futuros. Cada usuario es responsable de su cuenta y, en consecuencia, exime al broker o a sus IBs de cualquier responsabilidad relacionada con su dinero, resultados y operaciones.
        </p>
        <p>
          No se autoriza su reenvío, copia, distribución o uso por terceros, parcial o totalmente, sin la autorización escrita y formalmente firmada. Cualquier incumplimiento de esta cláusula será objeto de acciones legales.
        </p>
      </footer>
    </main>
  );
}