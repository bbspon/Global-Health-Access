import React, { useState } from "react";

const translations = {
  en: {
    title: "Offline Health Access Kiosk",
    selectLanguage: "Select Language:",
    enterPatientId: "Enter Patient ID / Aadhaar / QR Code:",
    fetchDataBtn: "Fetch Patient Data",
    patientDetails: "Patient Details",
    plan: "Plan",
    medicalHistory: "Medical History",
    uploadDocs: "Upload Prescription / Reports:",
    queueSyncBtn: "Queue Data for Sync",
    noFilesAlert: "Please upload at least one document.",
    enterIdAlert: "Please enter Patient ID or scan QR",
  },
  hi: {
    title: "ऑफ़लाइन हेल्थ एक्सेस कियोस्क",
    selectLanguage: "भाषा चुनें:",
    enterPatientId: "रोगी आईडी / आधार / क्यूआर कोड दर्ज करें:",
    fetchDataBtn: "डेटा प्राप्त करें",
    patientDetails: "रोगी विवरण",
    plan: "योजना",
    medicalHistory: "मेडिकल इतिहास",
    uploadDocs: "प्रिस्क्रिप्शन / रिपोर्ट अपलोड करें:",
    queueSyncBtn: "डेटा सिंक के लिए कतारबद्ध करें",
    noFilesAlert: "कृपया कम से कम एक दस्तावेज़ अपलोड करें।",
    enterIdAlert: "कृपया रोगी आईडी दर्ज करें या क्यूआर स्कैन करें",
  },
  ta: {
    title: "ஆஃப்லைன் சுகாதார அணுகல் கியாஸ்க்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்:",
    enterPatientId: "Пациент ஐடி / ஆதார் / QR குறியீட்டை உள்ளிடவும்:",
    fetchDataBtn: "தகவல் பெறுக",
    patientDetails: "நோயாளி விவரங்கள்",
    plan: "திட்டம்",
    medicalHistory: "மருத்துவ வரலாறு",
    uploadDocs: "மருத்துவக் குறிப்பு / அறிக்கைகள் பதிவேற்று:",
    queueSyncBtn: "தரவை ஒத்திசைக்க வரிசைப்படுத்தவும்",
    noFilesAlert: "தயவுசெய்து குறைந்தது ஒரு கோப்பை பதிவேற்றவும்.",
    enterIdAlert: "தயவுசெய்து நோயாளி ஐடியை உள்ளிடவும் அல்லது QR ஐ ஸ்கேன் செய்யவும்",
  },
  ar: {
    title: "كشك الوصول الصحي دون اتصال",
    selectLanguage: "اختر اللغة:",
    enterPatientId: "أدخل معرف المريض / الهوية / رمز الاستجابة السريعة:",
    fetchDataBtn: "جلب بيانات المريض",
    patientDetails: "تفاصيل المريض",
    plan: "الخطة",
    medicalHistory: "التاريخ الطبي",
    uploadDocs: "تحميل الوصفة / التقارير:",
    queueSyncBtn: "وضع البيانات في قائمة المزامنة",
    noFilesAlert: "يرجى تحميل ملف واحد على الأقل.",
    enterIdAlert: "يرجى إدخال معرف المريض أو مسح رمز الاستجابة السريعة",
  },
};

export default function OfflineAccessKiosk() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [patientID, setPatientID] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);

  // This function should now fetch real patient data from MongoDB
  const handleFetchPatient = async () => {
    if (!patientID.trim()) {
      alert(t.enterIdAlert);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/kiosk/patient/${patientID}`
      );
      const data = await response.json();
      setPatientData(data);
    } catch (err) {
      alert("Patient not found or server error");
    }
  };

  const handleFileChange = (e) => {
    setUploadFiles(Array.from(e.target.files));
  };

  // This function should now send the uploaded prescriptions to backend
  const handleQueueSync = async () => {
    if (uploadFiles.length === 0) {
      alert(t.noFilesAlert);
      return;
    }

    const formData = new FormData();
    formData.append("patientId", patientID);
    uploadFiles.forEach((file) => formData.append("files", file));

    try {
      await fetch("http://localhost:5000/api/kiosk/upload", {
        method: "POST",
        body: formData,
      });

      alert("Upload successful. Data queued for sync.");
      setPatientID("");
      setPatientData(null);
      setUploadFiles([]);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4>🩺 {t.title}</h4>
        </div>
        <div className="card-body">
          {/* Language Select */}
          <div className="mb-3">
            <label htmlFor="languageSelect" className="form-label">
              {t.selectLanguage}
            </label>
            <select
              id="languageSelect"
              className="form-select w-auto"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* Patient ID Input */}
          <div className="mb-3">
            <label htmlFor="patientIDInput" className="form-label">
              {t.enterPatientId}
            </label>
            <input
              type="text"
              id="patientIDInput"
              className="form-control"
              placeholder={t.enterPatientId}
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={handleFetchPatient}
            >
              {t.fetchDataBtn}
            </button>
          </div>

          {/* Patient Details */}
          {patientData && (
            <div className="card border-info mb-3">
              <div className="card-header bg-info text-white">
                {t.patientDetails}
              </div>
              <div className="card-body">
                <h5 className="card-title">{patientData.name}</h5>
                <p>
                  <strong>{t.plan}:</strong> {patientData.plan}
                </p>
                <p>
                  <strong>{t.medicalHistory}:</strong>
                </p>
                <ul>
                  {patientData &&
                  patientData.history &&
                  patientData.history.length > 0 ? (
                    <ul>
                      {patientData.history.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No patient history found.</p>
                  )}
                </ul>

                {/* Document Upload */}
                <div className="mb-3">
                  <label htmlFor="docUpload" className="form-label">
                    {t.uploadDocs}
                  </label>
                  <input
                    type="file"
                    id="docUpload"
                    className="form-control"
                    accept="image/*,application/pdf"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={handleQueueSync}
                  disabled={uploadFiles.length === 0}
                >
                  {t.queueSyncBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
