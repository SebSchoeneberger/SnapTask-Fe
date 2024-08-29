import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect } from "react";
import Select from "react-select";

function MultiselectComponent({ users, setSelectedUsers, defaultSeleted }) {
  let defaultValues = [];
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!users || !setSelectedUsers) return null;

  const options = users.map((user) => {
    let label = "";
    if (user.firstName) label += user.firstName;
    if (user.lastName) label += " " + user.lastName;
    if (label.length === 0) label = user.email;
    else label += " - " + user.email;
    return { label, value: user._id };
  });

  if (defaultSeleted)
    defaultValues = defaultSeleted
      .map((user) => {
        return options.find((option) => option.value === user._id) || [];
      })
      .filter(Boolean);

  useEffect(() => {
    setSelectedUsers(selectedOptions.map((option) => option.value));
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(defaultValues);
  }, [defaultSeleted]);

  return (
    <div className="w-full">
      <Select className="" onChange={setSelectedOptions} options={options} isMulti value={selectedOptions} />
    </div>
  );
}

export default MultiselectComponent;
