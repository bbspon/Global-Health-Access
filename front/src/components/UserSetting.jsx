import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserSetting = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    tier: "",
  });

  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    darkTheme: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bbsUser");

    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      setUser({
        name: parsed?.user?.name || "User",
        email: parsed?.user?.email || "",
        phone: parsed?.user?.phone || "",
        tier: parsed?.user?.tier || "Gold Tier",
      });

      setLoading(false);
    } catch (err) {
      console.log("Error parsing user", err);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const refreshFromDB = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("bbsUser"));
        if (!stored || !stored.token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URI}/auth/me`, {
          headers: { Authorization: `Bearer ${stored.token}` },
        });

        const data = res.data;

setUser({
  name: data?.user?.name || "User",
  email: data?.user?.email || "",
  phone: data?.user?.phone || "",
  tier: data?.user?.tier || "Gold Tier",
});


        stored.user = data;
        localStorage.setItem("bbsUser", JSON.stringify(stored));
      } catch (err) {
        console.log("DB refresh failed:", err);
      }
    };

    refreshFromDB();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bbsUser");
    navigate("/login");
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("userPreferences", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSupportClick = (type) => {
    switch (type) {
      case "faq":
        window.open("https://example.com/faq", "_blank");
        break;
      case "contact":
          navigate("/contact-us");
        break;
      case "feedback":
        navigate("/feedback-engine");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* HEADER PROFILE */}
      <div className="d-flex align-items-center p-4 bg-warning">
        <div
          className="bg-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "70px", height: "70px" }}
        >
          <span className="fw-bold text-secondary" style={{ fontSize: "24px" }}>
            {user?.name?.charAt?.(0) || "U"}
          </span>
        </div>

        <div className="ms-3">
          <h4 className="fw-bold mb-0">{user.name}</h4>
          <p className="text-dark m-0">{user.tier}</p>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="btn btn-dark ms-auto"
        >
          Edit Profile
        </button>
      </div>

      <div className="container py-4">
        {/* ACCOUNT */}
        <div className="card p-3 mb-3">
          <h5 className="fw-bold mb-2">Account</h5>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone || "Not added"}</p>
        </div>

        {/* PREFERENCES */}
        <div className="card p-3 mb-3">
          <h5 className="fw-bold mb-3">Preferences</h5>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="pushNotif"
              checked={preferences.pushNotifications}
              onChange={() => handlePreferenceChange("pushNotifications")}
            />
            <label className="form-check-label" htmlFor="pushNotif">Push Notifications</label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="emailNotif"
              checked={preferences.emailNotifications}
              onChange={() => handlePreferenceChange("emailNotifications")}
            />
            <label className="form-check-label" htmlFor="emailNotif">Email Notifications</label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="smsNotif"
              checked={preferences.smsNotifications}
              onChange={() => handlePreferenceChange("smsNotifications")}
            />
            <label className="form-check-label" htmlFor="smsNotif">SMS Notifications</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkTheme"
              checked={preferences.darkTheme}
              onChange={() => handlePreferenceChange("darkTheme")}
            />
            <label className="form-check-label" htmlFor="darkTheme">Dark Theme</label>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="card p-3 mb-3">
          <h5 className="fw-bold">Support</h5>

          {/* <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleSupportClick("faq"); }}
            className="btn btn-link text-primary p-0 mt-2"
          >
            Help & FAQ
          </a> */}
          <br />
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleSupportClick("contact"); }}
            className="btn btn-link text-primary p-0 mt-2"
          >
            Contact Support
          </a>
          <br />
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleSupportClick("feedback"); }}
            className="btn btn-link text-primary p-0 mt-2"
          >
            Feedback / Rate App
          </a>
        </div>

        {/* ACCOUNT ACTIONS */}
        <div className="card p-3 mb-3">
          <h5 className="fw-bold">Account Actions</h5>

          <button onClick={handleLogout} className="btn btn-danger mt-3">
            Logout
          </button>

          <button className="btn btn-outline-danger mt-2">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
