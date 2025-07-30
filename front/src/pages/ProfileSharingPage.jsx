import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const ProfileSharingPage = () => {
  const [settings, setSettings] = useState({
    showName: true,
    showAge: false,
    showConditions: false,
    showAppointments: false,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  console.log("📦 bbsUserData:", bbsUserData);

  const userId = bbsUserData?.user?.id; // ✅ use `id`, not `_id`
  const shareLink = `${window.location.origin}/shared-profile/${userId}`;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/public-profile/settings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your sharing settings.");
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/public-profile/settings`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Sharing settings saved successfully.");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to save settings.");
      setMessage(null);
    }
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=Check my health profile: ${shareLink}`,
      "_blank"
    );
  };

  return (
    <div className="container py-4">
      <h4>Control What You Share</h4>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Check
          type="checkbox"
          label="Show Name"
          checked={settings.showName}
          onChange={() =>
            setSettings({ ...settings, showName: !settings.showName })
          }
        />
        <Form.Check
          type="checkbox"
          label="Show Age"
          checked={settings.showAge}
          onChange={() =>
            setSettings({ ...settings, showAge: !settings.showAge })
          }
        />
        <Form.Check
          type="checkbox"
          label="Show Medical Conditions"
          checked={settings.showConditions}
          onChange={() =>
            setSettings({
              ...settings,
              showConditions: !settings.showConditions,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Show Appointments"
          checked={settings.showAppointments}
          onChange={() =>
            setSettings({
              ...settings,
              showAppointments: !settings.showAppointments,
            })
          }
        />

        <Button onClick={handleSave} className="mt-3">
          Save Settings
        </Button>
      </Form>

      <hr />
      <h5 className="mt-4">Your Public Profile Link:</h5>
      <p>{shareLink}</p>
      <Button variant="success" onClick={shareOnWhatsApp}>
        Share via WhatsApp
      </Button>
      <Button
        variant="secondary"
        className="ms-2"
        onClick={() => navigator.clipboard.writeText(shareLink)}
      >
        Copy Link
      </Button>
    </div>
  );
};

export default ProfileSharingPage;
