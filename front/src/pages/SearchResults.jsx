import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState({
    doctors: [],
    hospitals: [],
    labs: [],
  });

  useEffect(() => {
    if (!query) return;
    loadResults();
  }, [query]);

  const loadResults = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/search?q=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.log("Search Error:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Search results for "{query}"</h2>

      <h3>Doctors</h3>
      {results.doctors.map((d) => (
        <div>{d.name}</div>
      ))}

      <h3>Hospitals</h3>
      {results.hospitals.map((h) => (
        <div>{h.clinicName}</div>
      ))}

      <h3>Labs</h3>
      {results.labs.map((l) => (
        <div>{l.labName}</div>
      ))}
    </div>
  );
}
