import React, { useState, useMemo } from 'react';
import citiesData from './data/ontario_cities.json';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import CityMap from './components/CityMap';
import CityDetailModal from './components/CityDetailModal';

// Initial default filter state
const DEFAULT_FILTERS = {
  minPopulation: 5000,
  maxPopulation: 3000000,
  maxHousePrice: 2500000,
  minIncome: 50000,
  minVisibleMinority: 0,
  maxCostcoTime: 120,
  maxMetroTime: 180
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailModalCity, setDetailModalCity] = useState(null);
  const [mobileTab, setMobileTab] = useState('filters');

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Real-time memoized filtering supporting typed inputs
  const matchingCities = useMemo(() => {
    return citiesData.filter((city) => {
      const minP = Number(filters.minPopulation) || 0;
      const maxP = Number(filters.maxPopulation) || Infinity;
      const minInc = Number(filters.minIncome) || 0;

      const matchPop = city.population >= minP && city.population <= maxP;
      const matchPrice = city.avg4BedHousePrice <= filters.maxHousePrice;
      const matchIncome = city.medianHouseholdIncome >= minInc;
      const matchMinority = city.visibleMinorityPercentage >= filters.minVisibleMinority;
      const matchCostco = city.travelTimeToCostcoMinutes <= filters.maxCostcoTime;
      const matchMetro = city.travelTimeToCityOver500kMinutes <= filters.maxMetroTime;

      return matchPop && matchPrice && matchIncome && matchMinority && matchCostco && matchMetro;
    });
  }, [filters]);

  const matchingCityIds = useMemo(() => {
    return new Set(matchingCities.map(c => c.id));
  }, [matchingCities]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    if (window.innerWidth < 768) {
      setMobileTab('map');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <Header
        matchingCount={matchingCities.length}
        totalCount={citiesData.length}
        mobileTab={mobileTab}
        setMobileTab={setMobileTab}
        onResetFilters={handleResetFilters}
      />

      <main className="flex-1 flex overflow-hidden relative">
        <div 
          className={`h-full ${
            mobileTab === 'filters' ? 'flex w-full' : 'hidden md:flex'
          }`}
        >
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={handleResetFilters}
            matchingCities={matchingCities}
            totalCitiesCount={citiesData.length}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
            onOpenDetails={(city) => setDetailModalCity(city)}
          />
        </div>

        <div 
          className={`flex-1 h-full ${
            mobileTab === 'map' ? 'block w-full' : 'hidden md:block'
          }`}
        >
          <CityMap
            allCities={citiesData}
            matchingCityIds={matchingCityIds}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
            onOpenDetails={(city) => setDetailModalCity(city)}
          />
        </div>
      </main>

      {detailModalCity && (
        <CityDetailModal
          city={detailModalCity}
          onClose={() => setDetailModalCity(null)}
        />
      )}
    </div>
  );
}
