import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
// Maps section
import Maps from "./Maps";
// Quicklinks
import QuickLinks from "./QuickLinks";
// Quests section
// Ammo chart section
// Items to keep section
// BSG twitter feed
// R*ddit feed
// 4ch /eft/ general link
import Feeds from "./Feeds";

function App() {
  return (
    <div className="App">
      <h1>Tarkdash</h1>
      <Maps />
      <QuickLinks />
      <Feeds />
    </div>
  );
}

export default App;
