import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { ColorContext } from "../Context/ColorProvider";
import { themesSwap } from "./ThemesSwap";

function MultiselectComponent({ users, setSelectedUsers, defaultSeleted }) {
  let defaultValues = [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { theme } = useContext(ColorContext);

  const lightThemeName = themesSwap[0];
  const darkThemeName = themesSwap[1];

  if (!users || !setSelectedUsers) return null;

  // Convert users to options for the select component
  const options = users.map((user) => {
    let label = "";
    if (user.firstName) label += user.firstName;
    if (user.lastName) label += " " + user.lastName;
    if (label.length === 0) label = user.email;
    else label += " - " + user.email;
    return { label, value: user._id };
  });

  // Set default values if they are passed
  if (defaultSeleted)
    defaultValues = defaultSeleted
      .map((user) => {
        return options.find((option) => option.value === user._id) || [];
      })
      .filter(Boolean);

  // Sending selected users to the parent component
  useEffect(() => {
    setSelectedUsers(selectedOptions.map((option) => option.value));
  }, [selectedOptions]);

  // Reset selected options when defaultSelected changes from the outside
  useEffect(() => {
    setSelectedOptions(defaultValues);
  }, [defaultSeleted]);

  // Define custom styles based on theme
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === darkThemeName ? "#2a303c" : "#fff", // Lighter dark for input field
      borderColor: theme === darkThemeName ? "#444" : "#ccc",
      boxShadow: state.isFocused ? `0 0 0 1px ${theme === darkThemeName ? "#888" : "#333"}` : provided.boxShadow,
      "&:hover": {
        borderColor: theme === darkThemeName ? "#666" : "#333",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === darkThemeName ? "#2a303c" : "#fff", // Lighter dark for dropdown background
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: theme === darkThemeName ? "#2a303c" : "#fff", // Lighter dark for menu list background
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme === darkThemeName
          ? "#242933"
          : "#ddd" // Darker background for selected options in dark theme
        : state.isFocused
        ? theme === darkThemeName
          ? "#242933"
          : "#eee"
        : provided.backgroundColor, // Darker background for hovered options in dark theme
      color:
        state.isSelected || state.isFocused
          ? theme === darkThemeName
            ? "#c0c7d1"
            : "#000" // Darker text color for selected options in dark theme
          : theme === darkThemeName
          ? "#97adb8"
          : "#000", // Lighter text color for non-selected options
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === darkThemeName ? "#c0c7d1" : "#000", // Darker text color for selected single value
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === darkThemeName ? "#97adb8" : "#666",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: theme === darkThemeName ? "#242933" : "#ddd", // Lighter dark background for multi-select labels
      color: theme === darkThemeName ? "#c0c7d1" : "#000", // Darker text color for multi-select labels
      borderRadius: "4px",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: theme === darkThemeName ? "#c0c7d1" : "#000", // Darker text color for label text
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: theme === darkThemeName ? "#c0c7d1" : "#000", // Darker text color for remove icon
      ":hover": {
        backgroundColor: theme === darkThemeName ? "#444" : "#ddd",
        color: theme === darkThemeName ? "#fff" : "#000",
      },
    }),
  };

  return (
    <div className="w-full">
      <Select className="" onChange={setSelectedOptions} options={options} isMulti value={selectedOptions} styles={customStyles} />
    </div>
  );
}

export default MultiselectComponent;
