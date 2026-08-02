import React from 'react';
import { Users, Home, ShoppingBag, Navigation, DollarSign, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

export default function CityCard({ city, isSelected, onSelect, onOpenDetails }) {
  // Format numbers nicely
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-CA').format(num);
  };

  return (
    <div
      onClick={() => onSelect(city)}
      className={`group relative rounded-xl border p-3.5 transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-500/40'
          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Selection Glow Bar */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl" />
      )}

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors text-base font-outfit">
              {city.cityName}
            </h3>
            {city.population >= 500000 && (
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/20">
                Metro Hub
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium">{city.region}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(city);
          }}
          className="text-slate-400 hover:text-emerald-400 hover:bg-slate-800 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title="View full city details"
        >
          <span>Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        {/* House Price */}
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/70">
          <div className="flex items-center gap-1 text-slate-400 mb-0.5">
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>4-Bed Detached</span>
          </div>
          <span className="font-bold text-emerald-300">
            {formatCurrency(city.avg4BedHousePrice)}
          </span>
        </div>

        {/* Median Income */}
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/70">
          <div className="flex items-center gap-1 text-slate-400 mb-0.5">
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>Median Income</span>
          </div>
          <span className="font-bold text-slate-200">
            {formatCurrency(city.medianHouseholdIncome)}
          </span>
        </div>

        {/* Population & Minority */}
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/70">
          <div className="flex items-center gap-1 text-slate-400 mb-0.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Population</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200">
              {formatNumber(city.population)}
            </span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">
              {city.visibleMinorityPercentage}% min.
            </span>
          </div>
        </div>

        {/* Costco & Metro Travel */}
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/70">
          <div className="flex items-center gap-1 text-slate-400 mb-0.5">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Costco Distance</span>
          </div>
          <span className="font-semibold text-slate-200">
            {city.travelTimeToCostcoMinutes} mins
          </span>
        </div>
      </div>

      {/* Footer Pill: Nearest >500k City */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/50">
        <div className="flex items-center gap-1">
          <Navigation className="w-3 h-3 text-indigo-400" />
          <span>Nearest Metro (&gt;500k):</span>
        </div>
        <span className="font-medium text-slate-300">
          {city.nearestCityOver500k} ({city.travelTimeToCityOver500kMinutes}m)
        </span>
      </div>
    </div>
  );
}
