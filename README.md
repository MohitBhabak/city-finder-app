# 🏙️ Ontario City Finder

An interactive web application designed to help home buyers, commuters, and families discover their ideal municipality or community in Southern Ontario based on demographic, economic, real estate, and travel accessibility metrics.

![Ontario City Finder](https://img.shields.io/badge/React-18-blue?logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss) ![Leaflet](https://img.shields.io/badge/Leaflet-Map-10b981?logo=leaflet) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features

- **📍 120+ Southern Ontario Settlements (>5k Population)**  
  Includes Statistics Canada census figures for all municipalities, towns, townships, and distinct urban communities south of Sudbury/French River (from Toronto, Mississauga, Ottawa, and Hamilton to Georgetown, Caledonia, Simcoe, Fergus, Elora, Petawawa, and Kincardine).

- **⌨️ Direct Typed Numeric Filters**  
  - **Min & Max Population**: Type exact population thresholds (e.g., `5,000` to `35,000` for small towns, `35,000` to `150,000` for mid-size cities, or `500,000+` for metropolitan hubs).
  - **Min Household Income**: Type minimum median household income levels ($ CAD).

- **🎛️ Real Estate & Travel Accessibility Controls**  
  - **Max 4-Bed House Price**: Filter by average 4-bedroom detached house prices.
  - **Min Visible Minority %**: Filter by demographic diversity percentages.
  - **Max Costco Distance**: Filter by driving minutes to the nearest Costco warehouse.
  - **Max Time to Metro (>500k)**: Filter by driving minutes to major Tier-1 metropolitan hubs (Toronto, Ottawa, Mississauga, Brampton, Hamilton).

- **🗺️ Interactive Map & Instant Single-Click Popups**  
  - Interactive Leaflet map with custom status pins (Matching vs. Filtered).
  - **Instant Single-Click Popups**: Map pin info cards open immediately on the first click while the map smoothly animates/flies to the target location.
  - **100% Free Basemaps (No API Key Required)**: Seamless basemap switching between OpenStreetMap Humanitarian, Esri World Street Map, and Esri Topographic with zero API key watermarks or rate limit worries.
  - Detail modal dialogs with comprehensive metrics and direct outbound links to Wikipedia pages.

- **⚡ Dual-Mode Execution**  
  - **Standalone Mode**: Double-click `index.html` to run locally directly from disk without CORS issues or node server requirements.
  - **Modern Vite React App**: Full modular component architecture ready for development or production bundling (`npm run dev`).

---

## 📊 Dataset & Metrics

Each community object in `src/data/ontario_cities.json` includes:

| Metric | Description |
| :--- | :--- |
| `cityName` | Name of the settlement or community |
| `region` | County, regional municipality, or single-tier region |
| `coordinates` | Latitude and Longitude for Leaflet map pin placement |
| `population` | Urban settlement / community population (2021 Census) |
| `visibleMinorityPercentage` | Visible minority population percentage (%) |
| `avg4BedHousePrice` | Estimated average price for a 4-bedroom house ($ CAD) |
| `medianHouseholdIncome` | Median household income ($ CAD) |
| `travelTimeToCostcoMinutes` | Driving time in minutes to the nearest Costco |
| `travelTimeToCityOver500kMinutes` | Driving time in minutes to nearest metro (>500k pop) |
| `nearestCityOver500k` | Name of the nearest metro (>500k pop) |
| `wikipediaUrl` | Wikipedia reference URL |

---

## 🚀 Getting Started

### Option 1: Standalone (No Node.js Required)
Simply download or clone the repository and open `index.html` directly in any modern web browser:
```bash
# Open index.html directly in browser
open index.html
```

### Option 2: Vite Development Server
```bash
# 1. Clone the repository
git clone https://github.com/MohitBhabak/city-finder-app.git

# 2. Navigate to directory
cd city-finder-app

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

---

## 📂 Project Structure

```
city-finder-app/
├── index.html                  # Standalone executable web app with embedded data & CDNs
├── package.json                # Project dependencies & Vite scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Project documentation
├── src/
│   ├── main.jsx                # React DOM entry point
│   ├── App.jsx                 # Main application state & layout controller
│   ├── index.css               # Global Tailwind CSS & Leaflet custom styling
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar & mobile tab switcher
│   │   ├── FilterSidebar.jsx   # Typed numeric inputs, sliders & city card list
│   │   ├── CityMap.jsx         # React-Leaflet map, custom icons & popups
│   │   ├── CityCard.jsx        # Sidebar city item card
│   │   └── CityDetailModal.jsx # Detailed city metric modal & Wikipedia link
│   └── data/
│       └── ontario_cities.json # 120+ Southern Ontario settlement dataset
```

---

## 🛠️ Built With

- **[React 18](https://react.dev/)** - Frontend UI library
- **[Leaflet](https://leafletjs.com/)** & **[React-Leaflet](https://react-leaflet.js.org/)** - Interactive mapping library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Lucide React](https://lucide.dev/)** - Modern UI icons
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Babel Standalone](https://babeljs.io/)** - Browser-side JSX transformation for standalone execution

---

## 📜 License

This project is licensed under the MIT License.
