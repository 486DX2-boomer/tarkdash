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

// request from a friend: embed Gigabeef's latest video
const ytGigabeefEmbed = () => {
  return (
    <div className="hidden md:flex flex-col bg-stone-700 rounded-xl pl-2 pr-2 pt-1 shadow-xl mr-2">
      <h2 className="text-xl text-white pb-2">Latest Gigabeef vid</h2>
      <iframe
        id="gigabeef-embed"
        width="560"
        height="540"
        src="https://www.youtube.com/embed?listType=user_uploads&list=Gigabeef"
        className="rounded-xl shadow-xl"
      ></iframe>
    </div>
  );
};

// The idea here was that the youtube embed could cycle through different channels
// But for some arbitrary nonsense reason, only Gigabeef's embed works.
// The code is fine, it's working as intended, it's something with Youtube not allowing embeds
const ytEmbed = () => {
  const [ytChannel, setYtChannel] = useState<string>("Gigabeef");
  const [ytChannelIndex, setYtChannelIndex] = useState<number>(0);

  const channels = ["Gigabeef", "Pestily", "JesseKazam"];

  const handleClick = () => {
    if (ytChannelIndex < channels.length - 1) {
      setYtChannelIndex(ytChannelIndex + 1);
      setYtChannel(channels[ytChannelIndex + 1]);
    } else {
      setYtChannelIndex(0);
      setYtChannel(channels[0]);
    }
  };

  return (
    <div>
      <h2>
        Latest vid from <button onClick={handleClick}>{ytChannel}</button>
      </h2>
      <iframe
        id={ytChannel + "embed"}
        width="400"
        height="240"
        src={
          "https://www.youtube.com/embed?listType=user_uploads&list=" +
          ytChannel
        }
      ></iframe>
    </div>
  );
};

// Even though this component works as intended and does exactly what it's supposed to do, /eftg/ just never shows up in the request.
// I manually checked to make sure /eftg/ is actually in the catalog, it's there, but I just can't find it for whatever reason.
const eftVgGeneral = () => {
  const [eftgLink, setEftgLink] = useState<string>("");

  useEffect(() => {
    // use allorigins to bypass CORS
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://a.4cdn.org/vg/catalog.json"
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // console.log(JSON.parse(data.contents));
        for (let p = 0; p < 10; p++) {
          const page = JSON.parse(data.contents)[p];
          for (let t = 0; t < 10; t++) {
            const thread = page.threads[t];
            // console.log(thread.sub);
            if (thread.sub.includes("eftg")) {
              // console.log("EFTG found: " + thread.no);
              setEftgLink(`https://boards.4channel.org/vg/thread/${thread.no}`);
              return;
            } else {
              setEftgLink("Sorry, couldn't find /eftg/ in the catalog.");
            }
          }
        }
      });
  }, []);

  return <div id="eft-general-link">{eftgLink}</div>;
};

const eftRedditHot = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.reddit.com/r/EscapefromTarkov/hot.json?limit=15")
      .then((res) => res.json())
      .then((data) => setPosts(data.data.children))
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h3 className="font-medium text-lg p-1">
        Top cringe from{" "}
        <a
          className="underline"
          href="https://www.reddit.com/r/EscapefromTarkov/"
        >
          /r/EscapefromTarkov
        </a>
      </h3>
      <div id="reddit-posts" className="">
        {loading && (
          <span className="material-symbols-outlined flex justify-center mt-8 animate-spin">
            progress_activity
          </span>
        )}
        {!loading && (
          <ul>
            {posts.map((post) => (
              <li key={post.data.id} className="mb-2">
                <a href={post.data.url} target="_blank" className="">
                  ◽ {truncate(post.data.title)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const bsgTwitterFeed = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <h2 className="font-medium text-lg p-1">Feeds</h2>
      <div id="bsg-twit-embed" className="m-2 h-full">
        {loading && (
          <span className="material-symbols-outlined flex justify-center mt-8 animate-spin">
            progress_activity
          </span>
        )}
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "tarkov",
          }}
          options={{
            height: "720",
            width: "480",
            theme: "dark",
          }}
          onLoad={() => {
            setLoading(false);
          }}
        />
      </div>
    </>
  );
};

export const twitterFeed = () => {
  return (
    <article id="twitter" className="">
      {bsgTwitterFeed()}
      {/* {eftRedditHot()} */}
      {/* {ytGigabeefEmbed()} */}
    </article>
  );
};

export const redditFeed = () => {
  return (
    <article id="reddit" className="">
      {/* {bsgTwitterFeed()} */}
      {eftRedditHot()}
      {/* {ytGigabeefEmbed()} */}
    </article>
  );
};
