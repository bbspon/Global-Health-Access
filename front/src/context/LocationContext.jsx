import React, { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    country: "India",
    city: "",
  });

  // Load saved location on refresh
  useEffect(() => {
    const saved = localStorage.getItem("bbs_location");
    if (saved) {
      setLocation(JSON.parse(saved));
    }
  }, []);

  const updateCity = (city) => {
    const newLocation = { country: "India", city };
    setLocation(newLocation);
    localStorage.setItem("bbs_location", JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider value={{ location, updateCity }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
