interface Link {
  name: string;
  url: string;
}

const LinkSection = (props: {
  links: Link[];
  header: string;
  className: string;
}) => {
  const list = props.links.map((e) => {
    return (
      <li key={e.name}>
        <a href={e.url}>{e.name}</a>
      </li>
    );
  });
  return (
    <div className={props.className}>
      <h2>{props.header}</h2>
      <ul>{list}</ul>
    </div>
  );
};

export default LinkSection;
