import "./App.css";
import { useState, useEffect, SetStateAction } from "react";
import LinkSection from "./LinkSection";
import Feeds from "./Feeds";
import CustomizeLinksForm from "./CustomizeLinksForm";
import SaveLoadSettings from "./SaveLoadSettings";
import Widgets from "./Widgets";
import About from "./About";

import mapLinksDefault from "./MapLinks";
import quickLinksDefault from "./QuickLinks";
import SettingsModal from "./SettingsModal";

function App() {
  // initialize with blank Link[], loading is handled in SaveLoadSettings
  const [mapLinks, setMapLinks] = useState([
    {
      name: "",
      url: "",
    },
  ]);
  const [quickLinks, setQuickLinks] = useState([
    {
      name: "",
      url: "",
    },
  ]);

  // handle toggling map link form on or off
  const [mapLinksModalToggled, setMapLinkModalToggled] = useState(false);
  const handleMapLinkToggle = () => {
    setMapLinkModalToggled(!mapLinksModalToggled);
  };

  // handle toggling quick link form on or off
  const [quickLinksModalToggled, setQuickLinkModalToggled] = useState(false);
  const handleQuickLinksModalToggled = () => {
    setQuickLinkModalToggled(!quickLinksModalToggled);
  };

  // about
  const [aboutToggled, setAboutToggled] = useState(false);
  const handleAboutToggled = () => {
    setAboutToggled(!aboutToggled);
  };

  // settings modal
  const [settingsModalToggled, setSettingsModalToggled] = useState(false);
  const handleSettingsModalToggled = () => {
    setSettingsModalToggled(!settingsModalToggled);
  };

  return (
    <div
      id="App"
      className="flex flex-col bg-stone-800 min-h-full md:min-h-screen"
    >
      <SaveLoadSettings
        setMapLinksHook={setMapLinks}
        mapLinksReference={mapLinks}
        setQuickLinksHook={setQuickLinks}
        quickLinksReference={quickLinks}
      />
      <div
        id="header-wrapper"
        className="flex flex-col ml-2 mt-3 mb-2 space-y-3 mr-2 rounded-xl p-2"
      >
        <h1 className="text-4xl text-red-400">Tarkdash</h1>
        <span className="text-white text-xl">🧩helpful links for EFT🧩</span>
      </div>
      <div
        id="sub-wrapper"
        className="flex flex-col md:flex-row justify-center"
      >
        <div
          id="left-wrapper"
          className="flex flex-col ml-2 bg-stone-700 p-2 rounded-xl shadow-xl max-h-fit overflow-y-auto mb-2 md:pr-8 md:mb-0 mr-2 md:mr-0"
        >
          {/* Link sections */}
          <LinkSection links={[...mapLinks]} header="Maps" id="map-section" />
          <button
            className="bg-stone-800 rounded-md text-red-400 hover:text-red-300 text-sm"
            onClick={handleMapLinkToggle}
          >
            Customize Map Links
          </button>
          {/* Customize maps form */}
          {mapLinksModalToggled && (
            <CustomizeLinksForm
              links={[...mapLinks]}
              toggleModal={handleMapLinkToggle}
              setLinksHook={setMapLinks}
              defaultLinks={mapLinksDefault}
            />
          )}

          <LinkSection
            links={[...quickLinks]}
            header="Helpful Quick Links"
            id="quick-links"
          />

          <button
            className="bg-stone-800 rounded-md text-red-400 hover:text-red-300 text-sm"
            onClick={handleQuickLinksModalToggled}
          >
            Customize Quick Links
          </button>
          {/* Customize links form */}
          {quickLinksModalToggled && (
            <CustomizeLinksForm
              links={[...quickLinks]}
              toggleModal={handleQuickLinksModalToggled}
              setLinksHook={setQuickLinks}
              defaultLinks={quickLinksDefault}
            />
          )}
        </div>
        <div id="right-wrapper" className="flex flex-col md:flex-row">
          <Feeds />
          <Widgets />
        </div>
      </div>
      <div id="footer" className="fixed bottom-0 right-0 bg-stone-900 p-2">
        <button
          id="aboutToggle"
          className="text-red-400 hover:text-red-300"
          onClick={handleAboutToggled}
        >
          About
        </button>
        {aboutToggled && <About toggleAbout={setAboutToggled} />}
        <button
          id="settingsModalToggle"
          className="text-red-400 hover:text-red-300 ml-2"
          onClick={handleSettingsModalToggled}
        >
          Import/Export Settings
        </button>
        {settingsModalToggled && (
          <SettingsModal
            mapLinks={mapLinks}
            setMapLinksHook={setMapLinks}
            quickLinks={quickLinks}
            setQuickLinksHook={setQuickLinks}
            toggleSettingsModal={setSettingsModalToggled}
          />
        )}
      </div>
    </div>
  );
}

export default App;
