import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicalVault = () => {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    name: "",
    category: "",
    date: "",
    tags: "",
  });

const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
const token = bbsUserData?.token;

  // 🔁 Fetch Records
  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/medical-vault`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  // ⬆️ Upload Record
  const handleUpload = async () => {
    if (!file || !uploadData.name || !uploadData.date || !uploadData.category) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", uploadData.name);
    formData.append("category", uploadData.category);
    formData.append("date", uploadData.date);
    formData.append(
      "tags",
      JSON.stringify(uploadData.tags.split(",").map((tag) => tag.trim()))
    );

    try {
      setUploading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URI}/medical-vault/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploading(false);
      setUploadModal(false);
      fetchRecords();
    } catch (err) {
      console.error("Upload error:", err);
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container p-4">
      <h2 className="text-xl font-bold mb-4">🧬 My Medical Vault</h2>

      <button
        onClick={() => setUploadModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        📤 Upload Record
      </button>

      <input
        type="text"
        placeholder="Search records..."
        className="w-full p-2 border rounded mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {records.map((record, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">📄 {record.name}</h3>
            <p>
              <strong>Type:</strong> {record.category}
            </p>
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {record.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`http://localhost:5000${record.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block bg-green-600 text-white px-4 py-1 rounded"
            >
              👁 View
            </a>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Upload Medical Record
            </h3>

            <input
              type="text"
              placeholder="Name"
              value={uploadData.name}
              onChange={(e) =>
                setUploadData({ ...uploadData, name: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={uploadData.category}
              onChange={(e) =>
                setUploadData({ ...uploadData, category: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="date"
              value={uploadData.date}
              onChange={(e) =>
                setUploadData({ ...uploadData, date: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={uploadData.tags}
              onChange={(e) =>
                setUploadData({ ...uploadData, tags: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => setUploadModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalVault;
