const links = [
  {
    name: "Shooter Born in Heaven Ranges",
    url: "https://imgur.com/a/LAWSkJk?fbclid=IwAR09r_hgLEgVMqnllMUOJcw5ebSjr-jo-2FYLIFi7sTGhpzH0ojmFjtySis",
  },
  {
    name: "Extracts",
    url: "https://eftfg.com/extractions",
  },
  {
    name: "Items to Keep",
    url: "https://eftfg.com/items",
  },
  { name: "Quests Tree", url: "https://eft.monster/quest-tree" },
  {
    name: "Ammo Chart",
    url: "https://eft-ammo.com/",
  },
  {
    name: "Tarkov.dev",
    url: "https://tarkov.dev/",
  },
  {
    name: "Tarkov Tracker",
    url: "https://tarkovtracker.io/",
  },
];

const QuickLinks = () => {
  const list = links.map((l) => {
    return (
      <li key={l.name}>
        <a href={l.url}>{l.name}</a>
      </li>
    );
  });
  return (
    <div className="quicklinks">
      <h2>Helpful Quick Links</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default QuickLinks;
