import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [area, setArea] = useState("All Areas");
  return (
    <TaskContext.Provider value={{ area, setArea }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
