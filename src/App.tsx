import "./App.css";
import { useState, useEffect, SetStateAction } from "react";
import LinkSection from "./LinkSection";
import { twitterFeed, redditFeed } from "./Feeds";
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
    <div id="App" className="min-h-screen bg-zinc-900 sans">
      <SaveLoadSettings
        setMapLinksHook={setMapLinks}
        mapLinksReference={mapLinks}
        setQuickLinksHook={setQuickLinks}
        quickLinksReference={quickLinks}
      />
      <div id="header-wrapper" className="h-fit p-2">
        <h1 className="font-semibold text-4xl text-amber-400">Tarkdash</h1>
        <span className="text-white font-medium">
          🧩helpful links for EFT🧩
        </span>
      </div>
      <div
        id="sub-wrapper"
        className="flex flex-col md:flex-row justify-evenly min-h-[800px]"
      >
        <div
          id="link-wrapper"
          className="flex flex-col md:w-1/5 p-1 m-1 bg-zinc-700 rounded-sm shadow-md text-amber-400"
        >
          {/* Link sections */}
          <LinkSection links={[...mapLinks]} header="Maps" id="map-section" />
          <button
            className="bg-zinc-800 rounded-sm hover:bg-zinc-600 w-64 self-center"
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
            className="bg-zinc-800 rounded-sm hover:bg-zinc-600 w-64 self-center"
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
        <div
          id="tweet-wrapper"
          className="flex flex-col w-auto p-1 m-1 bg-zinc-700 rounded-sm shadow-md text-amber-400"
        >
          {twitterFeed()}
        </div>
        <div
          id="reddit-wrapper"
          className="flex flex-col w-auto p-1 m-1 bg-zinc-700 rounded-sm shadow-md text-amber-400"
        >
          {redditFeed()}
        </div>
        <div
          id="widget-wrapper"
          className="flex flex-col md:w-1/6 p-1 m-1 bg-zinc-700 rounded-sm shadow-md text-amber-400"
        >
          <Widgets />
        </div>
      </div>
      <div
        id="footer"
        className=" fixed bottom-0 right-0 p-2 bg-zinc-800 rounded-sm"
      >
        <button
          id="aboutToggle"
          className="text-amber-400 hover:text-amber-300 p-1 m-1"
          onClick={handleAboutToggled}
        >
          About
        </button>
        {aboutToggled && <About toggleAbout={setAboutToggled} />}
        <button
          id="settingsModalToggle"
          className="text-amber-400 hover:text-amber-300 p-1 m-1"
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
