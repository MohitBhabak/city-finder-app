import React from 'react';
import { MapPin, SlidersHorizontal, Map, Sparkles, Building2 } from 'lucide-react';

export default function Header({ 
  matchingCount, 
  totalCount, 
  mobileTab, 
  setMobileTab, 
  onResetFilters 
}) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 lg:px-6 py-3 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-full">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <MapPin className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-outfit">
                Ontario City Finder
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Southern ON
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              Filter municipalities by demographic, economic & accessibility metrics
            </p>
          </div>
        </div>

        {/* Right side stats & Mobile tab toggles */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Active Cities Match Badge */}
          <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300 shadow-sm">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>
              Matching: <strong className="text-emerald-400 font-semibold">{matchingCount}</strong>
              <span className="text-slate-500 mx-1">/</span>
              {totalCount} cities
            </span>
          </div>

          {/* Mobile View Toggle Buttons */}
          <div className="flex md:hidden bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMobileTab('filters')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mobileTab === 'filters'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter & List
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mobileTab === 'map'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Map View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
