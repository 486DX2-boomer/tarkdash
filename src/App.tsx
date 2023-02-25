import "./App.css";
import LinkSection from "./LinkSection";
import Feeds from "./Feeds";
import mapLinks from "./Maps";
import quickLinks from "./QuickLinks";

function App() {
  return (
    <div id="App">
      <div id="header-wrapper">
        <h1>Tarkdash</h1>
        🧩helpful links for EFT🧩
      </div>
      <div id="sub-wrapper">
        <div id="left-wrapper">
          <LinkSection links={mapLinks} header="Maps" id="map-section" />
          <LinkSection
            links={quickLinks}
            header="Helpful Quick Links"
            id="quick-links"
          />
        </div>
        <div id="right-wrapper">
          <Feeds />
        </div>
      </div>
    </div>
  );
}

export default App;
