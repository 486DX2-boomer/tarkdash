import "./App.css";
import LinkSection from "./LinkSection";
import Feeds from "./Feeds";
import mapLinks from "./Maps";
import quickLinks from "./QuickLinks";

function App() {
  return (
    <div
      id="App"
      className="flex flex-col bg-stone-800 min-h-full md:min-h-screen"
    >
      <div
        id="header-wrapper"
        className="flex flex-col ml-2 mt-3 mb-2 space-y-3 mr-2 rounded-xl p-2"
      >
        <h1 className="text-4xl text-red-400">Tarkdash</h1>
        <span className="text-white text-xl">🧩helpful links for EFT🧩</span>
      </div>
      <div id="sub-wrapper" className="flex flex-col md:flex-row self-center">
        <div
          id="left-wrapper"
          className="flex flex-col ml-2 bg-stone-700 p-2 rounded-xl shadow-xl max-h-fit overflow-y-auto mb-2 md:pr-8 md:mb-0 mr-2 md:mr-0"
        >
          <LinkSection links={mapLinks} header="Maps" id="map-section" />
          <LinkSection
            links={quickLinks}
            header="Helpful Quick Links"
            id="quick-links"
          />
        </div>
        <div id="right-wrapper" className="flex flex-col md:flex-row">
          <Feeds />
        </div>
      </div>
    </div>
  );
}

export default App;
