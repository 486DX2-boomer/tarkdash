import React, { useState, useEffect, Dispatch } from "react";
import Link from "./ILink";

interface LinkFormProps {
  links: Link[];
  toggleModal: () => void;
  setLinksHook: Dispatch<React.SetStateAction<Link[]>>;
  defaultLinks: Link[];
}

const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const LinkForm = ({
  links,
  handleFormChange,
  handleDelete,
}: {
  links: Link[];
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number) => void;
}) => {
  return (
    <div>
      {links.map((l, index) => (
        <div key={index} className="p-1">
          <label htmlFor={`name-${index}`} className="text-amber-400 pr-2">
            Name:
          </label>
          <input
            type="text"
            id={`name-${index}`}
            required
            className="bg-stone-200 text-black p-1 mr-2"
            value={l.name}
            onChange={handleFormChange}
            data-index={index}
          />

          <label htmlFor={`url-${index}`} className="text-amber-400 pr-2">
            URL
          </label>
          <input
            type="url"
            id={`url-${index}`}
            required
            className="bg-stone-200 text-black p-1 text-sm"
            value={l.url}
            onChange={handleFormChange}
            data-index={index}
          />
          <button
            id="delete-button"
            className="cursor-pointer p-1 bg-stone-200 text-red-900 hover:text-red-600 rounded-sm font-black ml-4"
            onClick={() => handleDelete(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

const CustomizeLinksForm: React.FC<LinkFormProps> = (props: LinkFormProps) => {
  const [formData, setFormData] = useState([...props.links]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRevertToDefaultWarning, setShowRevertToDefaultWarning] =
    useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [type, indexString] = id.split("-");
    const index = parseInt(indexString, 10);

    if (type === "name" || type === "url") {
      const updatedFormData = formData.map((link, i) =>
        i === index ? { ...link, [type]: value } : link
      );

      setFormData(updatedFormData);
    }
  };

  const handleDelete = (index: number) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleFormSave = () => {
    // Validate URLs before saving
    const areUrlsValid = formData.every((link) => validateUrl(link.url));

    // Check for duplicate names or URLs
    const areNamesUnique =
      new Set(formData.map((link) => link.name)).size === formData.length;
    const areUrlsUnique =
      new Set(formData.map((link) => link.url)).size === formData.length;

    if (areUrlsValid && areNamesUnique && areUrlsUnique) {
      // All validations passed, save the form
      props.setLinksHook(formData);
      props.toggleModal();
    } else {
      // Handle validation errors
      if (!areUrlsValid) {
        setErrorMessage("Invalid URL: must start with https://");
      } else if (!areNamesUnique) {
        setErrorMessage("Duplicate names are not allowed");
      } else if (!areUrlsUnique) {
        setErrorMessage("Duplicate URLs are not allowed");
      }
    }
  };

  const handleShowDefaultWarning = () => {
    setShowRevertToDefaultWarning(true);
  };

  const handleRevertToDefault = () => {
    // set parent component's links state to defaults
    props.setLinksHook(props.defaultLinks);
    props.toggleModal();
  };

  const handleAddNew = () => {
    // Clone the existing links array to avoid mutating the state directly
    const updatedLinks = [...formData];
    // Add a new blank link
    updatedLinks.push({ name: "", url: "" });
    // Update the state with the new links
    setFormData(updatedLinks);
  };

  return (
    <div
      id="modal"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 shadow-lg"
    >
      <div
        id="modal-content"
        className="bg-zinc-800 p-6 rounded flex-row overflow-scroll max-h-screen"
      >
        <button
          className="close cursor-pointer font-bold bg-zinc-700 text-amber-400 hover:bg-zinc-600 p-1 round-sm"
          onClick={props.toggleModal}
        >
          Close
        </button>

        {errorMessage && (
          <span id="error-message" className="pl-2 text-red-500 font-medium">
            {errorMessage}
          </span>
        )}

        <LinkForm
          links={formData}
          handleFormChange={handleFormChange}
          handleDelete={handleDelete}
        />

        <button
          id="add-new"
          className="cursor-pointer font-medium bg-stone-800 text-amber-400 hover:bg-zinc-600 p-1 ml-1 mr-1"
          onClick={handleAddNew}
        >
          Add New +
        </button>

        <button
          id="save"
          className="cursor-pointer font-medium bg-stone-800 text-amber-400 hover:bg-zinc-600 p-1"
          onClick={handleFormSave}
        >
          Save
        </button>

        <button
          id="revert-to-default"
          className="cursor-pointer font-medium bg-stone-800 text-amber-400 hover:bg-zinc-600 p-1 ml-1 mr-1"
          onClick={handleShowDefaultWarning}
        >
          Revert to Default
        </button>
        {showRevertToDefaultWarning && (
          <div className="text-red-500 font-bold">
            This will revert all your link customizations to default.
            <br /> Are you sure?
            <button
              className="bg-zinc-900 text-amber-400 hover:bg-zinc-600 m-2 p-1"
              onClick={handleRevertToDefault}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeLinksForm;
