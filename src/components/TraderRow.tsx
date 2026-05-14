"use client";

import { ChangeEvent } from "react";
import { Trader } from '@/components/TradingCalculator';

type TraderRowProps = {
  trader: Trader;
  accountValue: number | string;
  handleTraderChange: (
    id: number,
    field: keyof Omit<Trader, "id">,
    value: string
  ) => void;
  removeTrader: (id: number) => void;
};

const formatCurrency = (value: number) => {
  if (isNaN(value)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default function TraderRow({
  trader,
  accountValue,
  handleTraderChange,
  removeTrader,
}: TraderRowProps) {
  const capitalNumber = Number(trader.capital) || 0;
  const microlotajeNumber = Number(trader.microlotaje) || 0;
  const drawdownNumber = Number(trader.drawdown) || 0;
  const accountValueNumber = Number(accountValue) || 0;

  const capitalPerMicrolot =
    microlotajeNumber > 0 ? capitalNumber / microlotajeNumber : 0;

  const proportionality =
    accountValueNumber > 0 && capitalPerMicrolot > 0
      ? capitalPerMicrolot / accountValueNumber
      : 0;

  const riskPercentage =
    drawdownNumber > 0 && proportionality > 0
      ? drawdownNumber * proportionality
      : 0;

  const ratio = riskPercentage > 0 ? drawdownNumber / riskPercentage : 0;
  const lotajeAOperar = riskPercentage > 0 ? (ratio < 1 ? 1 / 100 : ratio / 100) : 0.01;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Omit<Trader, "id">
  ) => {
    handleTraderChange(trader.id, field, e.target.value);
  };

  return (
    <tr className="flex flex-col md:table-row bg-gray-800/40 md:bg-transparent rounded-2xl md:rounded-none border border-gray-700 md:border-b shadow-lg md:shadow-none mb-6 md:mb-0 w-full">
      
      {/* Trader Name */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 bg-gray-800/80 md:bg-transparent border-b border-gray-700 md:border-none w-full">
        <span className="md:hidden font-semibold text-gray-400 text-sm uppercase tracking-wide">Trader</span>
        <div className="flex justify-end md:justify-start w-full">
          <input
            type="text"
            value={trader.name}
            onChange={(e) => handleTraderChange(trader.id, "name", e.target.value)}
            className="p-1.5 md:p-2 rounded-md bg-transparent hover:bg-gray-700/50 focus:bg-gray-900 border border-transparent focus:border-blue-500 text-white w-full md:w-32 text-right md:text-left font-bold text-sm md:text-base focus:outline-none transition-colors"
            placeholder="Nombre"
          />
        </div>
      </td>

      {/* Microlotaje */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Microlotaje</span>
        <div className="flex justify-end md:justify-start w-full">
          <input
            type="text"
            inputMode="decimal"
            value={trader.microlotaje || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "");
              handleTraderChange(trader.id, "microlotaje", val);
            }}
            className="p-1.5 rounded-md bg-gray-900 border border-gray-700 text-white w-20 md:w-20 text-right md:text-left focus:outline-none focus:border-blue-500 font-semibold text-sm"
            placeholder="0"
          />
        </div>
      </td>

      {/* Capital */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Capital</span>
        <div className="flex justify-end md:justify-start w-full">
          <input
            type="text"
            inputMode="decimal"
            value={Number(trader.capital) ? `$${Number(trader.capital).toLocaleString("en-US")}` : ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "");
              handleTraderChange(trader.id, "capital", val);
            }}
            className="p-1.5 rounded-md bg-gray-900 border border-gray-700 text-white w-24 md:w-24 text-right md:text-left focus:outline-none focus:border-blue-500 font-semibold text-sm"
            placeholder="$0.00"
          />
        </div>
      </td>

      {/* Capital/Microlote */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Cap / Microlote</span>
        <span className="font-semibold text-right md:text-left text-sm text-gray-200">{formatCurrency(capitalPerMicrolot)}</span>
      </td>

      {/* Proporcionalidad */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Proporción</span>
        <span className="font-semibold text-right md:text-left text-sm text-gray-200">{proportionality.toFixed(2)}</span>
      </td>

      {/* Drawdown */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Drawdown</span>
        <div className="flex justify-end md:justify-start w-full">
          <input
            type="text"
            inputMode="decimal"
            value={trader.drawdown || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
              handleTraderChange(trader.id, "drawdown", val);
            }}
            className="p-1.5 rounded-md bg-gray-900 border border-gray-700 text-white w-20 md:w-20 text-right md:text-left focus:outline-none focus:border-blue-500 font-semibold text-sm"
            placeholder="0"
          />
        </div>
      </td>

      {/* % Riesgo */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">% Riesgo</span>
        <span className="font-semibold text-right md:text-left text-sm text-gray-200">{riskPercentage.toFixed(2)}%</span>
      </td>

      {/* Lotaje a operar */}
      <td className="grid grid-cols-2 items-center md:table-cell p-3 md:p-4 bg-gray-800/30 md:bg-transparent border-b border-gray-700/50 md:border-none w-full">
        <span className="md:hidden font-medium text-gray-400 text-sm">Lotaje a operar</span>
        <span className="text-blue-400 font-bold text-base md:text-base text-right md:text-left">{lotajeAOperar.toFixed(2)}</span>
      </td>

      {/* Acción */}
      <td className="block md:table-cell p-3 md:p-4 w-full">
        <button
          onClick={() => removeTrader(trader.id)}
          className="w-full bg-red-900/30 md:bg-transparent text-red-400 hover:text-red-100 hover:bg-red-600 border border-red-900/50 md:border-none py-2 px-4 rounded-lg transition-all flex items-center justify-center font-medium text-sm"
        >
          <span className="md:hidden">Eliminar Trader</span>
          <span className="text-xl leading-none hidden md:inline" title="Eliminar">&times;</span>
        </button>
      </td>
    </tr>
  );
}