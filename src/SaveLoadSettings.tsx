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
  //   console.log("Enable Save Hooks: you should see this in the console!");
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

const SaveLoadSettings: React.FC<SaveLoadSettingsProps> = (props) => {
  const [enableSave, setEnableSave] = useState(false);

  useEffect(() => {
    // Load defaults if not found in localStorage
    if (!localStorage.getItem("mapLinks")) {
      console.log(
        "No custom map links detected, creating defaults. You should only see this once."
      );
      props.setMapLinksHook(mapLinksDefault);
      localStorage.setItem("mapLinks", JSON.stringify(mapLinksDefault));
    } else if (localStorage.getItem("mapLinks")) {
      props.setMapLinksHook(
        JSON.parse(localStorage.getItem("mapLinks") as string)
      );
    }

    if (!localStorage.getItem("quickLinks")) {
      console.log(
        "No custom quick links detected, creating defaults. You should only see this once."
      );
      props.setQuickLinksHook(quickLinksDefault);
      localStorage.setItem("quickLinks", JSON.stringify(quickLinksDefault));
    } else if (localStorage.getItem("quickLinks")) {
      props.setQuickLinksHook(
        JSON.parse(localStorage.getItem("quickLinks") as string)
      );
    }
    setEnableSave(true);
  }, []);

  return (
    <div>
      {enableSave && (
        <EnableSaveHooks
          mapLinksReference={props.mapLinksReference}
          quickLinksReference={props.quickLinksReference}
        />
      )}
    </div>
  );
};

export default SaveLoadSettings;
