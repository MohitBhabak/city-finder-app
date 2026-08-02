# Interactive Ontario City Finder - Development Specification & Architecture Prompt

## Executive Summary & Vision
This document provides complete instructions for building the **Ontario City Finder** web application. The application allows users to filter municipalities across Southern and Southwestern Ontario using key demographic, real estate, income, and accessibility metrics. Matching cities are displayed dynamically on an interactive map and list view, enabling users to click on a city to view detailed information and quick links to Wikipedia resources.

---

## Technical Stack & Architecture

### Frontend Architecture
- **Framework:** React 18+ (Vite setup) or Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with Lucide React icons
- **State Management:** React Context API or Zustand for global filter state
- **Mapping Engine:** Leaflet.js via `react-leaflet` with OpenStreetMap base tiles (or Mapbox GL JS if API key is provided)
- **Component Library (Optional):** shadcn/ui for polished slider, select, and dialog components

### Data Layer Architecture
- **Data Format:** Static JSON file (`src/data/ontario_cities.json`) containing curated demographic, geographic, and accessibility metadata.
- **Data Processing:** Client-side filtering in real-time using optimized memoization (`useMemo`).

---

## Data Schema (`ontario_cities.json`)

Each city object in the JSON data array must strictly follow this structure:

```json
[
  {
    "id": "brampton",
    "cityName": "Brampton",
    "region": "Peel Region",
    "coordinates": {
      "lat": 43.7315,
      "lng": -79.7624
    },
    "population": 656480,
    "visibleMinorityPercentage": 80.6,
    "avg4BedHousePrice": 1250000,
    "travelTimeToCostcoMinutes": 8,
    "travelTimeToCityOver500kMinutes": 0,
    "nearestCityOver500k": "Brampton",
    "medianHouseholdIncome": 98000,
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Brampton"
  }
]
```

### Reference Data Requirements (Initial Dataset Scope - ~35 Southern Ontario Municipalities)
Ensure dataset includes major urban, suburban, and regional centers in Southern Ontario:
- **GTA & Golden Horseshoe:** Toronto, Mississauga, Brampton, Hamilton, Markham, Vaughan, Oakville, Burlington, Richmond Hill, Oshawa, Barrie, St. Catharines, Niagara Falls, Guelph.
- **Southwestern Ontario:** London, Windsor, Kitchener, Waterloo, Cambridge, Brantford, Chatham-Kent, Sarnia, Woodstock, Stratford, St. Thomas.
- **Eastern & Central Ontario:** Ottawa, Kingston, Peterborough, Belleville, Orillia, Kawartha Lakes, Cobourg, Midland.

*(Data sources referenced: Statistics Canada 2021 Census for population, visible minority percentage, and median household income; Regional real estate board averages for recent 4-bedroom detached homes).*

---

## Filter Criteria & UI Controls

The application layout features a **Sidebar / Control Panel** with responsive slider controls:

1. **Population (Range Slider)**
   - Min: 10,000 | Max: 3,000,000 | Step: 10,000
   - Filter logic: `city.population >= minPop && city.population <= maxPop`

2. **Visible Minority % (Min Slider)**
   - Range: 0% to 100% | Step: 5%
   - Filter logic: `city.visibleMinorityPercentage >= minMinority`

3. **Average 4-Bed Detached House Price (Max Slider)**
   - Range: $400,000 to $2,500,000+ | Step: $50,000
   - Reference standard: 4-bedroom detached home built within the last 10 years.
   - Filter logic: `city.avg4BedHousePrice <= maxPrice`

4. **Travel Time to Nearest Costco (Max Slider)**
   - Range: 5 mins to 120+ mins | Step: 5 mins
   - Filter logic: `city.travelTimeToCostcoMinutes <= maxCostcoTime`

5. **Travel Time to Nearest City > 500k Population (Max Slider)**
   - Target cities over 500k: Toronto, Ottawa, Mississauga, Brampton, Hamilton.
   - Range: 0 mins to 180+ mins | Step: 15 mins
   - Filter logic: `city.travelTimeToCityOver500kMinutes <= maxBigCityTime`

6. **Median Household Income (Min Slider)**
   - Range: $50,000 to $160,000+ | Step: $5,000
   - Data origin: Statistics Canada Census.
   - Filter logic: `city.medianHouseholdIncome >= minIncome`

---

## Map & Visual Interface Design Guidelines

### Layout Structure
- **Desktop:** Two-column split layout.
  - **Left Side (350px - 400px fixed width):** Clean filter sidebar, active results counter, "Reset Filters" button, and matching city list view.
  - **Right Side (Flex-1 / Full Remaining Screen):** Interactive map canvas.
- **Mobile:** Tabbed interface switching between "Filter & List" and "Map View" with a sticky filter button.

### Interactive Map Requirements
- Default center: `[43.9, -79.8]` (Southern Ontario focus), Zoom Level: `8`.
- Render matching cities as custom SVG map markers/dots.
- Non-matching cities should either be hidden or rendered as faint gray dots to maintain context.
- **Marker Hover/Click State:**
  - Hovering shows a sleek tooltip with City Name and Population.
  - Clicking opens a detailed popup/modal card containing:
    - City Name & Region
    - Population & Median Household Income
    - Visible Minority %
    - Estimated 4-Bed House Price
    - Travel time to Costco & Major Metro Center
    - Direct link button: *"Read on Wikipedia"* (`target="_blank" rel="noopener noreferrer"`).

---

## Implementation Checklist for the AI Coding Agent

- [ ] Setup React + Vite project with Tailwind CSS and `react-leaflet` / `leaflet`.
- [ ] Create `src/data/ontario_cities.json` with accurate baseline data for 30+ Southern Ontario municipalities based on 2021 Census metrics.
- [ ] Implement responsive UI layout (Sidebar + Map).
- [ ] Build state management for filters (Population, Minority %, House Price, Costco Distance, Big City Distance, Median Income).
- [ ] Connect state to Leaflet map markers dynamically.
- [ ] Build city detail modal / popup with Wikipedia outbound link.
- [ ] Add animations and hover states for markers and sidebar cards.

---

# Prompt to Copy/Paste into Your AI Coding Agent

Below is the structured prompt you can directly provide to Cursor, Claude Dev, Bolt, or v0 to build the app:

```text
You are an expert full-stack developer. Build a modern, responsive web application called "Ontario City Finder" using React, Tailwind CSS, Lucide Icons, and React-Leaflet.

### Key Objectives:
The app helps users find the ideal city to live in Southern Ontario by filtering municipalities based on specific demographic, economic, and lifestyle factors, rendering matching cities dynamically on an interactive map.

### 1. Data Requirements:
Create a dataset in `src/data/ontario_cities.json` containing at least 35 Southern Ontario municipalities (e.g., Toronto, Mississauga, Brampton, Hamilton, Markham, Oakville, Burlington, Kitchener, Waterloo, London, Guelph, Barrie, Oshawa, Ottawa, St. Catharines, Windsor, Niagara Falls, Kingston, Peterborough, Brantford, etc.).
Each city object must include:
- `id` (string)
- `cityName` (string)
- `region` (string)
- `coordinates`: `{ "lat": number, "lng": number }`
- `population` (number - StatCan 2021 Census)
- `visibleMinorityPercentage` (number - 0 to 100)
- `avg4BedHousePrice` (number - reference for 4-bed detached built in last 10 yrs)
- `travelTimeToCostcoMinutes` (number)
- `travelTimeToCityOver500kMinutes` (number - nearest metro >500k pop)
- `nearestCityOver500k` (string)
- `medianHouseholdIncome` (number - StatCan 2021 Census)
- `wikipediaUrl` (string - direct Wikipedia link)

### 2. UI Layout & UX:
- Desktop: Split layout with a fixed sidebar on the left and full-height map on the right.
- Mobile: Responsive view with tab toggling between Map and Filter List.
- Design: Modern, clean styling with soft borders, rounded corners, desaturated subtle backgrounds, and high readability.

### 3. Sidebar Filter Controls:
Create interactive slider inputs with clean labels and formatted numerical readouts for:
- Population Range (Min/Max sliders or Min filter)
- Minimum Visible Minority Percentage (%)
- Maximum Average 4-Bed House Price ($)
- Maximum Travel Time to Nearest Costco (minutes)
- Maximum Travel Time to Nearest City > 500k Population (minutes)
- Minimum Median Household Income ($)
Include a prominent "Reset All Filters" button and an active counter showing "X cities match your criteria".

### 4. Interactive Map Features:
- Center on Southern Ontario (`lat: 43.9, lng: -79.8`, zoom level 8).
- Render custom SVG markers or dots for filtered matching cities.
- Marker click opens an informative popup with formatted metrics ($ CAD, mins, percentages, population) and a direct button linking to the city's Wikipedia page in a new tab.

Please output complete, clean, modular code for components (`FilterSidebar`, `CityMap`, `CityCard`, `CityDetailModal`) and the main application setup.
```
