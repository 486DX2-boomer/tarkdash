interface Link {
  name: string;
  url: string;
}

const LinkSection = (props: { links: Link[]; header: string; id: string }) => {
  const list = props.links.map((e) => {
    return (
      <li key={e.name}>
        <a href={e.url} target="_blank">
          {e.name}
        </a>
      </li>
    );
  });
  return (
    <div id={props.id}>
      <h2>{props.header}</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default LinkSection;
