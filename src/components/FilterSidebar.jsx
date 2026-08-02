import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Users, 
  Home, 
  ShoppingBag, 
  Navigation, 
  DollarSign, 
  ArrowUpDown,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  Type
} from 'lucide-react';
import CityCard from './CityCard';

export default function FilterSidebar({
  filters,
  setFilters,
  resetFilters,
  matchingCities,
  totalCitiesCount,
  selectedCity,
  onSelectCity,
  onOpenDetails
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('population-desc');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  const formatCurrency = (val) => {
    if (val >= 2500000) return '$2,500,000+';
    return '$' + (val / 1000).toFixed(0) + 'k';
  };

  const displayedCities = matchingCities
    .filter(city => 
      city.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.region.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'population-desc': return b.population - a.population;
        case 'population-asc': return a.population - b.population;
        case 'price-asc': return a.avg4BedHousePrice - b.avg4BedHousePrice;
        case 'price-desc': return b.avg4BedHousePrice - a.avg4BedHousePrice;
        case 'income-desc': return b.medianHouseholdIncome - a.medianHouseholdIncome;
        case 'minority-desc': return b.visibleMinorityPercentage - a.visibleMinorityPercentage;
        case 'costco-asc': return a.travelTimeToCostcoMinutes - b.travelTimeToCostcoMinutes;
        case 'metro-asc': return a.travelTimeToCityOver500kMinutes - b.travelTimeToCityOver500kMinutes;
        default: return 0;
      }
    });

  const applyPreset = (presetKey) => {
    resetFilters();
    switch (presetKey) {
      case 'small-towns':
        setFilters(prev => ({ ...prev, minPopulation: 5000, maxPopulation: 35000 }));
        break;
      case 'mid-sized':
        setFilters(prev => ({ ...prev, minPopulation: 35000, maxPopulation: 150000 }));
        break;
      case 'affordable':
        setFilters(prev => ({ ...prev, maxHousePrice: 750000 }));
        break;
      case 'commuter':
        setFilters(prev => ({ ...prev, maxCostcoTime: 20, maxMetroTime: 40 }));
        break;
      default:
        break;
    }
  };

  return (
    <aside className="w-full md:w-[380px] lg:w-[420px] bg-slate-950/90 flex flex-col h-full border-r border-slate-800/80 shadow-2xl z-20 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-slate-100 text-sm tracking-wide font-outfit uppercase">
              Filter Criteria
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 md:hidden bg-slate-800/60 px-2 py-1 rounded"
            >
              {isFilterCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              {isFilterCollapsed ? 'Expand Controls' : 'Collapse Controls'}
            </button>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-2.5 py-1 rounded-lg transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-0.5">
            Presets:
          </span>
          <button
            onClick={() => applyPreset('small-towns')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-cyan-300 px-2.5 py-1 rounded-md border border-slate-700/60 transition-colors"
          >
            🏡 Small Towns (5k-35k)
          </button>
          <button
            onClick={() => applyPreset('mid-sized')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-teal-300 px-2.5 py-1 rounded-md border border-slate-700/60 transition-colors"
          >
            🏙️ Mid-Size (35k-150k)
          </button>
          <button
            onClick={() => applyPreset('affordable')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-300 px-2.5 py-1 rounded-md border border-slate-700/60 transition-colors"
          >
            💰 Under $750k
          </button>
        </div>
      </div>

      {/* Filter Inputs (Typed Number Inputs for Pop Min/Max & Income) */}
      <div className={`p-4 space-y-4 border-b border-slate-800/80 bg-slate-900/30 overflow-y-auto max-h-[50vh] ${
        isFilterCollapsed ? 'hidden md:block' : 'block'
      }`}>
        {/* 1. Population Range - Direct Typed Inputs */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs mb-1">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Population Range (Type numbers)</span>
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Min Population</span>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={filters.minPopulation}
                onChange={(e) => setFilters(prev => ({ ...prev, minPopulation: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Max Population</span>
              <input
                type="number"
                placeholder="e.g. 3000000"
                value={filters.maxPopulation}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPopulation: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-400 font-bold focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 2. Minimum Household Income - Direct Typed Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs mb-1">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-teal-400" />
              <span>Min Household Income ($ CAD)</span>
            </label>
          </div>
          
          <div className="relative">
            <span className="absolute left-2.5 top-1.5 text-xs text-teal-400 font-bold">$</span>
            <input
              type="number"
              placeholder="e.g. 50000"
              value={filters.minIncome}
              onChange={(e) => setFilters(prev => ({ ...prev, minIncome: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-6 pr-3 py-1.5 text-xs text-teal-300 font-bold focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* 3. Maximum House Price Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Max 4-Bed House Price</span>
            </label>
            <span className="font-bold text-emerald-400 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              {formatCurrency(filters.maxHousePrice)}
            </span>
          </div>
          <input
            type="range"
            min="400000"
            max="2500000"
            step="50000"
            value={filters.maxHousePrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxHousePrice: Number(e.target.value) }))}
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>$400k</span>
            <span>$1.5M</span>
            <span>$2.5M+</span>
          </div>
        </div>

        {/* 4. Minimum Visible Minority Percentage Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Min Visible Minority %</span>
            </label>
            <span className="font-bold text-purple-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              {filters.minVisibleMinority}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters.minVisibleMinority}
            onChange={(e) => setFilters(prev => ({ ...prev, minVisibleMinority: Number(e.target.value) }))}
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 5. Max Travel Time to Costco */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Max Time to Costco</span>
            </label>
            <span className="font-bold text-amber-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              {filters.maxCostcoTime >= 120 ? '120+ mins' : `${filters.maxCostcoTime} mins`}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={filters.maxCostcoTime}
            onChange={(e) => setFilters(prev => ({ ...prev, maxCostcoTime: Number(e.target.value) }))}
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>5m</span>
            <span>60m</span>
            <span>120m+</span>
          </div>
        </div>

        {/* 6. Max Travel Time to Nearest Metro >500k */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Navigation className="w-3.5 h-3.5 text-indigo-400" />
              <span>Max Time to Metro (&gt;500k)</span>
            </label>
            <span className="font-bold text-indigo-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
              {filters.maxMetroTime >= 180 ? '180+ mins' : `${filters.maxMetroTime} mins`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="15"
            value={filters.maxMetroTime}
            onChange={(e) => setFilters(prev => ({ ...prev, maxMetroTime: Number(e.target.value) }))}
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0m (In City)</span>
            <span>90m</span>
            <span>180m+</span>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="p-3 bg-slate-900/80 border-b border-slate-800/80 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <span>Communities</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {displayedCities.length}
            </span>
          </span>

          <div className="flex items-center gap-1 text-xs">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-emerald-500 text-xs"
            >
              <option value="population-desc">Pop: High → Low</option>
              <option value="population-asc">Pop: Low → High</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="income-desc">Income: High → Low</option>
              <option value="minority-desc">Minority %: High → Low</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search town, city or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* City Cards List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-950/40">
        {displayedCities.length > 0 ? (
          displayedCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              isSelected={selectedCity?.id === city.id}
              onSelect={onSelectCity}
              onOpenDetails={onOpenDetails}
            />
          ))
        ) : (
          <div className="text-center py-10 px-4 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-2">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="text-slate-200 font-semibold text-sm">No communities match criteria</h4>
            <p className="text-xs text-slate-400 mt-1 mb-3">
              Try adjusting your typed values or clearing filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-lg shadow-emerald-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
