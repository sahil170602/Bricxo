"use client";

import { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function MaterialCalculator() {
  const [area, setArea] = useState<number | ''>(''); 
  const [result, setResult] = useState<{ label: string; value: string; unit: string; color: string }[] | null>(null);

  const calculateAll = () => {
    if (!area || Number(area) <= 0) return;
    const sqft = Number(area);

    // 1. Concrete Slab Calculations (Standard 5" Slab)
    const volumeCFT = sqft * 0.416;
    const slabCement = volumeCFT * 0.18;
    const slabSand = volumeCFT * 0.0025;
    const slabAggregate = volumeCFT * 0.0035;

    // 2. Brick Wall Calculations (Standard 9" Wall for same footprint)
    const wallArea = sqft * 1.5;
    const brickCount = wallArea * 10;
    const wallCement = wallArea * 0.025;
    const wallSand = wallArea * 0.0018;

    // 3. TMT Bar (Steel) Calculation
    // Standard residential ratio: ~3.5kg per sq. ft (Slab + Beams + Columns)
    const totalSteelKg = sqft * 3.5;
    const totalSteelTons = (totalSteelKg / 1000).toFixed(2);

    // 4. Totals
    const totalCement = Math.ceil(slabCement + wallCement);
    const totalSand = (slabSand + wallSand).toFixed(2);
    const totalBricks = Math.ceil(brickCount);
    const totalAggregate = slabAggregate.toFixed(2);

    setResult([
      { label: 'Total Cement', value: String(totalCement), unit: 'Bags', color: 'bg-blue-50 text-blue-600' },
      { label: 'TMT Steel', value: totalSteelTons, unit: 'Tons', color: 'bg-orange-50 text-orange-600' }, // ✅ Added Steel
      { label: 'Red Bricks', value: String(totalBricks), unit: 'Pcs', color: 'bg-red-50 text-red-600' },
      { label: 'Total Sand', value: totalSand, unit: 'Tons', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'Aggregate (Grit)', value: totalAggregate, unit: 'Tons', color: 'bg-gray-50 text-gray-600' },
    ]);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-orange-50 w-32 h-32 rounded-bl-full -mr-8 -mt-8 z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#FF8237] text-white p-3 rounded-xl">
            <Calculator size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Project Estimator</h2>
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase mb-6 tracking-wider">Full Structure Estimate</p>

        {/* Square Foot Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Total Plot/Floor Area (Sq. Ft)</label>
          <input 
            type="number" 
            value={area} 
            onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))} 
            className="w-full p-4 bg-gray-50 rounded-xl font-black text-2xl text-gray-900 outline-none focus:ring-2 ring-[#FF8237]/20 border border-gray-100" 
            placeholder="e.g. 1200" 
          />
        </div>

        <button onClick={calculateAll} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 mb-6 shadow-lg shadow-gray-200">
          Calculate Materials <ArrowRight size={18} />
        </button>

        {result && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Estimates for {area} sqft Build</h3>
              <RefreshCw size={14} className="cursor-pointer text-gray-400 hover:text-[#FF8237]" onClick={() => {setArea(''); setResult(null);}} />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {result.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50 group hover:border-[#FF8237] transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-10 rounded-full ${item.color.split(' ')[0]}`}></div>
                    <div>
                      <span className="block font-bold text-gray-700 text-sm">{item.label}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block font-black text-2xl text-gray-900">{item.value}</span>
                    </div>
                    <Link 
                      href={`/search?q=${item.label.replace('Total ', '').replace(' (Grit)', '')}`}
                      className="p-2 bg-orange-50 text-[#FF8237] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingCart size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
               <div className="text-blue-600"><span className="text-xs font-bold font-mono">i</span></div>
               <p className="text-[10px] text-blue-700 leading-tight font-medium">
                 Estimate includes 5" Slab, 9" Brick Walls, and standard TMT reinforcement for the specified area.
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}