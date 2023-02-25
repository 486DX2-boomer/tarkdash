import "./App.css";
import LinkSection from "./LinkSection";
import Feeds from "./Feeds";
import mapLinks from "./Maps";
import quickLinks from "./QuickLinks";

function App() {
  return (
    <div className="App">
      <div className="header-wrapper">
        <h1>Tarkdash</h1>
        🧩helpful links for EFT🧩
      </div>
      <div className="sub-wrapper">
        <div className="left-wrapper">
          {/* <Maps /> */}
          {/* <QuickLinks /> */}
          <LinkSection links={mapLinks} header="Maps" className="map-section" />
          <LinkSection
            links={quickLinks}
            header="Helpful Quick Links"
            className="quick-links"
          />
        </div>
        <div className="right-wrapper">
          <Feeds />
        </div>
      </div>
    </div>
  );
}

export default App;
