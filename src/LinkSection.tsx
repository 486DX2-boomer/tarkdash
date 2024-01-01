import Link from "./ILink";

const LinkSection = (props: { links: Link[]; header: string; id: string }) => {
  const list = props.links.map((e) => {
    return (
      <li key={e.name} className="pb-0.5">
        <a href={e.url} target="_blank" className="hover:text-red-300">
          ◽ {e.name}
        </a>
      </li>
    );
  });
  return (
    <div id={props.id}>
      <h2 className="text-white text-xl mb-2">{props.header}</h2>
      <ul className="text-red-400 mb-1">{list}</ul>
    </div>
  );
};

export default LinkSection;
