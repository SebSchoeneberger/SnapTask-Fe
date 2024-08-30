import React, { createContext, useState, useEffect } from "react";
import { themesSwap } from "../Components/ThemesSwap";
export const ColorContext = createContext();

const storageKey = "snap-task-theme";

const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState({});
  const [theme, setTheme] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || themesSwap[0]);

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);

    const convertToHSL = (variable) => {
      const color = rootStyle.getPropertyValue(variable).trim();
      const [lightness, chroma, hue] = color.split(" ");
      // Properly convert the variables to HSL
      const h = parseFloat(hue); // Hue remains the same
      const s = parseFloat(chroma) * 400; // Chroma is saturation
      const l = parseFloat(lightness) * 0.75; // Lightness should also be scaled to 0-100%

      // console.log(h, s, l);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    setColors({
      primary: convertToHSL("--p"),
      secondary: convertToHSL("--s"),
      accent: convertToHSL("--a"),
      neutral: convertToHSL("--n"),
      info: convertToHSL("--in"),
      success: convertToHSL("--su"),
      warning: convertToHSL("--wa"),
      error: convertToHSL("--er"),
      baseContent: convertToHSL("--bc"),
    });
  }, [theme]);

  return <ColorContext.Provider value={{ colors, theme, setTheme }}>{children}</ColorContext.Provider>;
};

export default ColorProvider;
