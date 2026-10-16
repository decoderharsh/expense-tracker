import React, { useState ,useEffect} from "react";
import ThemeContext from "./themeContext";
const themeState = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");

   useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === "dark" ? "light" : "dark"
    );
  };
  return (
    
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        {children}
      </ThemeContext.Provider>
  );
};

export default themeState;
