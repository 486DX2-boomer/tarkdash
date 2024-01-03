import React, { useEffect, useState } from "react";
import Link from "./ILink";

import mapLinksDefault from "./MapLinks";
import quickLinksDefault from "./QuickLinks";

interface SaveLoadSettingsProps {
  setMapLinksHook: React.Dispatch<React.SetStateAction<Link[]>>;
  setQuickLinksHook: React.Dispatch<React.SetStateAction<Link[]>>;
  mapLinksReference: Link[];
  quickLinksReference: Link[];
}

interface EnableSaveHooksProps {
  mapLinksReference: Link[];
  quickLinksReference: Link[];
}

const EnableSaveHooks = (props: EnableSaveHooksProps) => {
  // Autosave changes to mapLinks
  useEffect(() => {
    localStorage.setItem("mapLinks", JSON.stringify(props.mapLinksReference));
  }, [props.mapLinksReference]);

  // Autosave changes to quickLinks
  useEffect(() => {
    localStorage.setItem(
      "quickLinks",
      JSON.stringify(props.quickLinksReference)
    );
  }, [props.quickLinksReference]);

  return <></>;
};

const loadDefaultsFromLocalStorage = (
  itemName: string,
  setHook: React.Dispatch<React.SetStateAction<Link[]>>,
  defaultData: Link[]
) => {
  if (!localStorage.getItem(itemName)) {
    console.log(
      `No custom ${itemName} detected, creating defaults. You should only see this once.`
    );
    setHook(defaultData);
    localStorage.setItem(itemName, JSON.stringify(defaultData));
  } else {
    setHook(JSON.parse(localStorage.getItem(itemName) as string));
  }
};

const SaveLoadSettings: React.FC<SaveLoadSettingsProps> = (props) => {
  const [enableSave, setEnableSave] = useState(false);

  useEffect(() => {
    // Load defaults for mapLinks
    loadDefaultsFromLocalStorage(
      "mapLinks",
      props.setMapLinksHook,
      mapLinksDefault
    );

    // Load defaults for quickLinks
    loadDefaultsFromLocalStorage(
      "quickLinks",
      props.setQuickLinksHook,
      quickLinksDefault
    );

    setEnableSave(true);
  }, []);

  return (
    <>
      {enableSave && (
        <EnableSaveHooks
          mapLinksReference={props.mapLinksReference}
          quickLinksReference={props.quickLinksReference}
        />
      )}
    </>
  );
};

export default SaveLoadSettings;
