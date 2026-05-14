"use client";

import { useState } from "react";
import TraderRow from "./TraderRow";

export type Trader = {
  id: number;
  name: string;
  microlotaje: number | string;
  capital: number | string;
  drawdown: number | string;
};

const initialTraders: Trader[] = [
  { id: 1, name: "BTC Master", microlotaje: 2, capital: 4032, drawdown: 14.28 },
  { id: 2, name: "Record Brak", microlotaje: 10, capital: 15581, drawdown: 14.07 },
  { id: 3, name: "Midasalgo", microlotaje: 2, capital: 14686, drawdown: 12.30 },
  { id: 4, name: "Lemonal", microlotaje: 1, capital: 7096, drawdown: 5.64 },
  { id: 5, name: "Mtrader2", microlotaje: 50, capital: 5611, drawdown: 2.43 },
  { id: 6, name: "Lexo", microlotaje: 8, capital: 81749, drawdown: 0.78 },
];

export default function TradingCalculator() {
  const [traders, setTraders] = useState<Trader[]>(initialTraders);
  const [accountValue, setAccountValue] = useState<number | string>(450);
  const [nextId, setNextId] = useState(7);

  const addTrader = () => {
    setTraders((prevTraders) => [
      ...prevTraders,
      {
        id: nextId,
        name: `Trader ${nextId}`,
        microlotaje: 0,
        capital: 0,
        drawdown: 0,
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeTrader = (id: number) => {
    setTraders((prevTraders) =>
      prevTraders.filter((trader) => trader.id !== id)
    );
  };

  const handleTraderChange = (
    id: number,
    field: keyof Omit<Trader, "id">,
    value: string
  ) => {
    setTraders((prevTraders) =>
      prevTraders.map((trader) =>
        trader.id === id
          ? { ...trader, [field]: value }
          : trader
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 w-full sm:w-auto bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
          <label className="text-gray-300 font-medium text-lg w-full sm:w-auto text-left">Tu cuenta:</label>
          <input
            type="text"
            inputMode="decimal"
            value={accountValue ? `$${Number(accountValue).toLocaleString("en-US")}` : ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "");
              setAccountValue(val);
            }}
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 text-white w-full sm:w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xl font-semibold transition-all"
            placeholder="$0.00"
          />
        </div>
        <button
          onClick={addTrader}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 text-lg flex items-center justify-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Añadir Trader
        </button>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm lg:text-base block md:table border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-gray-700">
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Trader
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Microlotaje
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Capital
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Cap / Microlote
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Proporción
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Drawdown
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                % Riesgo
              </th>
              <th className="p-4 text-left font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Lotaje a operar
              </th>
              <th className="p-4 text-center font-semibold text-gray-400 uppercase tracking-wider text-xs">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-6 md:table-row-group md:gap-0 bg-transparent">
            {traders.map((trader) => (
              <TraderRow
                key={trader.id}
                trader={trader}
                accountValue={accountValue}
                handleTraderChange={handleTraderChange}
                removeTrader={removeTrader}
              />
            ))}
          </tbody>
        </table>
        {traders.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-gray-800/30 rounded-xl mt-6 border border-dashed border-gray-700">
            <p className="text-lg">No hay traders activos.</p>
            <p className="text-sm mt-2">Añade uno nuevo para empezar a calcular el lotaje.</p>
          </div>
        )}
      </div>
    </div>
  );
}
