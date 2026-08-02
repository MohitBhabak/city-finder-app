import React, { useEffect } from 'react';
import { X, ExternalLink, Home, DollarSign, Users, ShoppingBag, Navigation, MapPin, Sparkles, Building } from 'lucide-react';

export default function CityDetailModal({ city, onClose }) {
  if (!city) return null;

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('en-CA').format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background Banner */}
        <div className="h-28 bg-gradient-to-r from-emerald-900/60 via-slate-900 to-indigo-900/60 p-6 flex flex-col justify-end relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-950 p-2 rounded-full border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {city.region}
            </span>
            {city.population >= 500000 && (
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Major Metro
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-white font-outfit mt-1">
            {city.cityName}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* House Price */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Home className="w-4 h-4 text-emerald-400" />
                <span>4-Bed Detached Price</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">
                {formatCurrency(city.avg4BedHousePrice)}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Reference: built within 10 yrs</p>
            </div>

            {/* Household Income */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <DollarSign className="w-4 h-4 text-teal-400" />
                <span>Median Household Income</span>
              </div>
              <div className="text-lg font-bold text-teal-300">
                {formatCurrency(city.medianHouseholdIncome)}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">StatCan 2021 Census</p>
            </div>

            {/* Population */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Population</span>
              </div>
              <div className="text-lg font-bold text-slate-100">
                {formatNumber(city.population)}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">StatCan 2021 Census</p>
            </div>

            {/* Visible Minority */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Visible Minority</span>
              </div>
              <div className="text-lg font-bold text-purple-300">
                {city.visibleMinorityPercentage}%
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Cultural diversity metric</p>
            </div>
          </div>

          {/* Accessibility & Proximity Section */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-outfit flex items-center gap-2">
              <Navigation className="w-4 h-4 text-indigo-400" />
              Proximity & Travel Metrics
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Nearest Costco</span>
                  <span className="font-semibold text-slate-200">
                    {city.travelTimeToCostcoMinutes} minutes
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Metro &gt;500k ({city.nearestCityOver500k})</span>
                  <span className="font-semibold text-slate-200">
                    {city.travelTimeToCityOver500kMinutes} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
            >
              Close
            </button>

            <a
              href={city.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Read on Wikipedia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
