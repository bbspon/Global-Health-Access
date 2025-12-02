import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicalVault = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const API = import.meta.env.VITE_API_URI || "http://localhost:5000";

  // -----------------------------
  // FETCH RECORDS
  // -----------------------------
  const fetchRecords = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("bbsUser"));

      const res = await axios.get(`${API}/medical-vault`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setRecords(sorted);
    } catch (err) {
      console.error("Failed to load records", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // -----------------------------
  // UPLOAD RECORD
  // -----------------------------
  const uploadRecord = async () => {
    if (!file || !name || !category || !date) {
      alert("Please fill name, category, date and choose a file.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("bbsUser"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("tags", JSON.stringify([])); // REQUIRED by backend

    try {
      await axios.post(`${API}/medical-vault/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setFile(null);
      setName("");
      setCategory("");
      setDate("");

      fetchRecords();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console.");
    }
  };

  // -----------------------------
  // FILTER SEARCH
  // -----------------------------
  const filteredRecords = records.filter((r) => {
    const text = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(text) ||
      r.category.toLowerCase().includes(text)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Medical Vault</h2>

      {/* Upload Section */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Record name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-40"
        />

        <input
          type="text"
          placeholder="Category (e.g., X-ray, Prescription)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-48"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded"
        />

        <button
          onClick={uploadRecord}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Record
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search records..."
        className="w-full p-2 border-2 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ------ RECORDS TABLE ------ */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #d3dce6",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#e8f1fb", // Soft healthcare blue
                borderBottom: "2px solid #c3d4ee",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px" }}>Record Name</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>File Type</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  No records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((rec) => (
                <tr
                  key={rec._id}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f8fbff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  <td style={{ padding: "12px" }}>{rec.recordName}</td>
                  <td style={{ padding: "12px" }}>{rec.category}</td>
                  <td style={{ padding: "12px" }}>
                    {new Date(rec.date).toISOString().split("T")[0]}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {(rec.fileType || "").toString().toUpperCase() || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <a
                      href={`http://localhost:5000/uploads/medical/${rec.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#0B74D0",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalVault;
