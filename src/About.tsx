import { SetStateAction } from "react";

interface AboutProps {
  toggleAbout: React.Dispatch<React.SetStateAction<boolean>>;
}

const About = (props: AboutProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 shadow-lg overflow-scroll">
      <div className="bg-stone-700 p-6 rounded text-white max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-red-400">Tarkdash</h2>
        <p className="text-lg mb-2">All your Tarkov references in one place.</p>
        <p className="text-sm italic mb-2">
          Customize or add more links using Customize buttons. Your
          customizations are saved on your device.
        </p>
        <p className="text-md mb-2">
          Built with{" "}
          <a
            className="text-red-400 hover:text-red-300"
            href="https://vitejs.dev/"
          >
            Vite
          </a>
          ,{" "}
          <a
            className="text-red-400 hover:text-red-300"
            href="https://tailwindcss.com/"
          >
            TailwindCSS
          </a>
        </p>
        <p className="text-sm italic text-red-400 mb-2">
          Check the{" "}
          <a
            className="text-rose-600 underline hover:text-red-300 cursor-pointer"
            href="https://github.com/486DX2-boomer/tarkdash"
          >
            repo.
          </a>
        </p>
        <p className="text-lg mb-2">Special thanks to:</p>
        <ul className="list-disc pl-6">
          <li>
            <a
              href="https://tarkov.dev/"
              className="text-red-400 hover:underline"
            >
              https://tarkov.dev/
            </a>{" "}
            for providing their API
          </li>
        </ul>
        <button
          id="aboutClose"
          className="cursor-pointer bg-stone-800 text-red-400 font-bold p-2 mt-2 hover:bg-stone-600"
          onClick={() => {
            props.toggleAbout(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default About;
