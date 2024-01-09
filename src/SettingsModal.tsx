import React, { useEffect } from "react";
import { useState } from "react";

import Link from "./ILink";

interface SettingsModalProps {
  mapLinks: Link[];
  setMapLinksHook: React.Dispatch<React.SetStateAction<Link[]>>;
  quickLinks: Link[];
  setQuickLinksHook: React.Dispatch<React.SetStateAction<Link[]>>;
  toggleSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleSave = () => {
    const parsed = parseAndValidateJSON(textInput);
    if (parsed) {
      props.setMapLinksHook(parsed.mapLinks);
      props.setQuickLinksHook(parsed.quickLinks);
      props.toggleSettingsModal(false);
    } else {
      console.log("Saving failed");
    }
  };

  // function to grab customizations and serialize them
  const serializeSettings = (mapLinks: Link[], quickLinks: Link[]) => {
    return JSON.stringify({ mapLinks, quickLinks });
  };

  const parseAndValidateJSON = (
    jsonString: string
  ): { mapLinks: Link[]; quickLinks: Link[] } | null => {
    try {
      const parsedData = JSON.parse(jsonString);

      // Validate the structure
      if (
        Array.isArray(parsedData.mapLinks) &&
        Array.isArray(parsedData.quickLinks)
      ) {
        // Assuming the structure is valid, return the parsed data
        return {
          mapLinks: parsedData.mapLinks,
          quickLinks: parsedData.quickLinks,
        };
      } else {
        // Structure is invalid
        console.error("Invalid JSON structure");
        setErrorMessage("Invalid JSON");
        return null;
      }
    } catch (error) {
      // JSON parsing failed
      console.error("Error parsing JSON:", error);
      setErrorMessage("Error parsing JSON");
      return null;
    }
  };

  // On load, serialize the settings into the input form
  useEffect(() => {
    setTextInput(serializeSettings(props.mapLinks, props.quickLinks));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 shadow-lg">
      <div className="bg-zinc-800 p-4">
        <div className="text-amber-400 font-medium text-xl">
          Import/Export Settings
        </div>
        <div className="text-amber-400 pt-2 pb-2 italic">
          Copy from or paste into this box to import or export your
          customizations.
        </div>
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
        <button
          className="cursor-pointer p-1 mt-2 mb-2 text-amber-400 font-bold bg-zinc-700 hover:bg-zinc-600"
          onClick={() => {
            props.toggleSettingsModal(false);
          }}
        >
          Close
        </button>

        <textarea
          value={textInput}
          onChange={handleInputChange}
          className="bg-stone-200 text-black p-2 mt-2 w-full h-40"
        />

        <button
          className="cursor-pointer p-1 mt-2 mb-2 text-amber-400 font-bold bg-zinc-700 hover:bg-zinc-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
