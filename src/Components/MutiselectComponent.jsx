import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";

function MultiselectComponent({ users }) {
  return (
    <div className="w-full">
      <Select
        options={users.map((user) => {
          let label = "";
          if (user.firstName) label += user.firstName;
          if (user.lastName) label += " " + user.lastName;
          if (label.length === 0) label = user.email;
          else label += " - " + user.email;
          return { label, value: user._id };
        })}
        isMulti
      />
    </div>
  );
}

export default MultiselectComponent;
