import React from "react";
import CreateAreaModal from "../Components/CreateAreaModal";

const Areas = () => {
  return (
    <div>
      <h1>Areas Page</h1>
      <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Create Area</button>
      <CreateAreaModal />
    </div>
  );
};

export default Areas;
