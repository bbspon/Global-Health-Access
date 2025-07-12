import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ProfileSharingPage = () => {
  const [settings, setSettings] = useState({
    showName: true,
    showAge: false,
    showConditions: false,
    showAppointments: false,
  });

  const userId = localStorage.getItem("userId");
  const shareLink = `${window.location.origin}/shared-profile/${userId}`;

  useEffect(() => {
    axios.get("/api/public-profile/settings").then((res) => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const handleSave = async () => {
    await axios.post("/api/public-profile/settings", settings);
    alert("Sharing settings saved");
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
