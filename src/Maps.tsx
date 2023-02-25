const links = [
  {
    mapName: "Woods",
    mapLink: "https://mapgenie.io/tarkov/maps/woods",
  },
  {
    mapName: "Reserve",
    mapLink:
      "https://www.gamemaps.co.uk/game/tarkov/maps/reserve_cardinaln_reemr",
  },
  {
    mapName: "Shoreline",
    mapLink:
      "https://www.gamemaps.co.uk/game/tarkov/maps/interchange_nightshade_yundaz_ver2",
  },
  {
    mapName: "Lighthouse",
    mapLink:
      "https://www.eftmaps.net/wp-content/uploads/2022/01/re3mrLighthouseIsometricDay-2048x1322.png",
  },
  { mapName: "Customs", mapLink: "https://mapgenie.io/tarkov/maps/customs" },
  {
    mapName: "Labs",
    mapLink:
      "https://www.gamemaps.co.uk/game/tarkov/maps/the_labs_clean_2d_monkimonkimonk",
  },
  {
    mapName: "Streets",
    mapLink:
      "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/1/17/StreetsOfTarkov3DMapByRE3MR.jpg",
  },
];

const MapSection = () => {
  const list = links.map((l) => {
    return (
      <p>
        <a href={l.mapLink}>{l.mapName}</a>
      </p>
    );
  });

  return (
    <div className="map-section">
      <h2>Maps</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default MapSection;
