const links = [
  {
    name: "Keybinds",
    url: "https://gist.github.com/TheDonDope/8327101ead7758b9bfc6e86b9a776f80",
  },
  {
    name: "Virion's Weapon Modding Guide",
    url: "https://docs.google.com/spreadsheets/d/1yHyVEVB5oN0qL_pR1qTNP1_ICmzJ3SCFJQNb6XDM_DQ/edit",
  },
  {
    name: "Shooter Born in Heaven Ranges",
    url: "https://imgur.com/a/LAWSkJk?fbclid=IwAR09r_hgLEgVMqnllMUOJcw5ebSjr-jo-2FYLIFi7sTGhpzH0ojmFjtySis",
  },
  {
    name: "EFT Field Guide",
    url: "https://eftfg.com/",
  },
  { name: "Quests Tree", url: "https://eft.monster/quest-tree" },
  {
    name: "Ammo Chart",
    url: "https://eft.monster/",
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
