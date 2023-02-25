import { Timeline } from "react-twitter-widgets";
import { useState, useEffect } from "react";

interface Post {
  data: {
    id: string;
    url: string;
    title: string;
  };
}

const truncate = (str: string) => {
  if (str.length > 60) {
    return str.slice(0, 60) + "...";
  } else return str;
};

const eftVgGeneral = () => {
  return (
    <>
      4ch's API doesn't allow CORS, so unless I have an external proxy running,
      I can't parse its catalog
    </>
  );
};

const eftRedditHot = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/EscapefromTarkov/hot.json?limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data.data.children));
  }, []);

  return (
    <>
      <div>
        <h3>Top cringe from /r/EscapefromTarkov</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.data.id}>
              <a href={post.data.url}>{truncate(post.data.title)}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const bsgTwitterFeed = () => {
  return (
    <>
      <div className="bsg-twit-embed">
        <h2>Feeds</h2>
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "bstategames",
          }}
          options={{
            height: "540",
            width: "480",
            theme: "dark",
          }}
        />
      </div>
    </>
  );
};

const Feeds = () => {
  return (
    <div className="feeds">
      {bsgTwitterFeed()}
      {eftRedditHot()}
      {/* {eftVgGeneral()} */}
    </div>
  );
};

export default Feeds;
