import Link from "./ILink";

const LinkSection = (props: { links: Link[]; header: string; id: string }) => {
  const list = props.links.map((e) => {
    return (
      <li key={e.name} className="p-1">
        <a href={e.url} target="_blank" className="">
          ◽ {e.name}
        </a>
      </li>
    );
  });
  return (
    <article className="pb-1" id={props.id}>
      <h2 className="font-medium text-lg pl-1 pt-1">{props.header}</h2>
      <ul className="pl-1">{list}</ul>
    </article>
  );
};

export default LinkSection;
