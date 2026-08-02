import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink, Home, DollarSign, Users, ShoppingBag, Navigation } from 'lucide-react';

// Controller component for programmatic map panning & fixing container size bugs
function MapViewController({ selectedCity }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size after initial layout render
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  useEffect(() => {
    if (selectedCity && selectedCity.coordinates) {
      map.flyTo(
        [selectedCity.coordinates.lat, selectedCity.coordinates.lng],
        10,
        { duration: 1.2 }
      );
    }
  }, [selectedCity, map]);

  return null;
}

const createCustomIcon = (isMatching, isSelected, population) => {
  if (!isMatching) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin-nonmatching"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }

  const selectedClass = isSelected ? 'selected' : '';

  const html = `
    <div class="marker-pin-matching ${selectedClass}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white transform rotate-45">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: 'custom-div-icon',
    html: html,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26]
  });
};

export default function CityMap({
  allCities,
  matchingCityIds,
  selectedCity,
  onSelectCity,
  onOpenDetails
}) {
  const center = [43.9, -79.8];
  const zoom = 8;

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
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapViewController selectedCity={selectedCity} />

        {allCities.map((city) => {
          const isMatching = matchingCityIds.has(city.id);
          const isSelected = selectedCity?.id === city.id;

          return (
            <Marker
              key={city.id}
              position={[city.coordinates.lat, city.coordinates.lng]}
              icon={createCustomIcon(isMatching, isSelected, city.population)}
              eventHandlers={{
                click: () => {
                  onSelectCity(city);
                }
              }}
              zIndexOffset={isSelected ? 1000 : isMatching ? 500 : 1}
            >
              <Tooltip
                direction="top"
                offset={[0, isMatching ? -26 : -8]}
                opacity={0.95}
                className="custom-leaflet-tooltip"
              >
                <div className="text-center">
                  <div className="font-bold text-emerald-400">{city.cityName}</div>
                  <div className="text-[10px] text-slate-300">
                    Pop: {formatNumber(city.population)}
                  </div>
                </div>
              </Tooltip>

              <Popup className="custom-leaflet-popup">
                <div className="p-4 w-64 bg-slate-900 rounded-xl text-slate-100 font-sans">
                  <div className="border-b border-slate-800 pb-2 mb-2.5 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-base text-emerald-400 font-outfit">
                        {city.cityName}
                      </h3>
                      <p className="text-xs text-slate-400">{city.region}</p>
                    </div>
                    {isMatching ? (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Match
                      </span>
                    ) : (
                      <span className="bg-slate-800 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        Filtered
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs mb-3">
                    <div className="flex justify-between bg-slate-950/60 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-emerald-400" />
                        <span>4-Bed House</span>
                      </span>
                      <span className="font-bold text-emerald-300">
                        {formatCurrency(city.avg4BedHousePrice)}
                      </span>
                    </div>

                    <div className="flex justify-between bg-slate-950/60 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                        <span>Median Income</span>
                      </span>
                      <span className="font-semibold text-slate-200">
                        {formatCurrency(city.medianHouseholdIncome)}
                      </span>
                    </div>

                    <div className="flex justify-between bg-slate-950/60 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Population</span>
                      </span>
                      <span className="font-semibold text-slate-200">
                        {formatNumber(city.population)} ({city.visibleMinorityPercentage}% min)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] text-center pt-0.5">
                      <div className="bg-slate-950/60 p-1 rounded border border-slate-800">
                        <span className="text-slate-400 block">Costco</span>
                        <strong className="text-amber-300">{city.travelTimeToCostcoMinutes} mins</strong>
                      </div>
                      <div className="bg-slate-950/60 p-1 rounded border border-slate-800">
                        <span className="text-slate-400 block">Metro (&gt;500k)</span>
                        <strong className="text-indigo-300">{city.travelTimeToCityOver500kMinutes} mins</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenDetails(city)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-1.5 px-2 rounded-lg text-xs transition-colors"
                    >
                      Details
                    </button>
                    <a
                      href={city.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-3 rounded-lg text-xs border border-slate-700 flex items-center gap-1"
                    >
                      <span>Wiki</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
