import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";

function MultiselectComponent({ users = [] }) {
  const [options, setOptions] = useState([]);

  console.log(options);

  useEffect(() => {
    const userOptions = users.map((user) => {
      return { label: user.firstName, value: user._id };
    });
    console.log(options);
    console.log(userOptions);

    setOptions(userOptions);
  }, []);

  return (
    <>
      <Select options={options} isMulti />
    </>
  );
}

export default MultiselectComponent;
