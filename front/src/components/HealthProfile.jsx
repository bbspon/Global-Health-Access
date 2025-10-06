// components/HealthProfile.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Tabs,
  Tab,
  Modal,
  Button,
  Form,
  Spinner,
  Card,
  ListGroup,
} from "react-bootstrap";
import { IoChatbubbleEllipses } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock initial user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  dob: "1990-01-01",
  gender: "Male",
  tier: "Gold",
  profilePic: "",
  addresses: [
    { id: 1, label: "Home", address: "123 Main St, City, State" },
    { id: 2, label: "Office", address: "456 Work Rd, City, State" },
  ],
  appointments: [
    { id: 1, date: "2025-10-05", type: "Consultation", doctor: "Dr. Smith" },
    { id: 2, date: "2025-11-10", type: "Lab Test", doctor: "Lab Center" },
  ],
  records: [
    { id: 1, type: "Prescription", name: "Prescription 001" },
    { id: 2, type: "Lab Report", name: "Blood Test" },
  ],
  billing: [
    { id: 1, type: "Consultation", amount: "₹500", status: "Paid" },
    { id: 2, type: "Lab Test", amount: "₹1200", status: "Pending" },
  ],
};

const HealthProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({ ...mockUser });
  const messagesEndRef = useRef(null);

  const [profilePreview, setProfilePreview] = useState(user.profilePic || "");

  // Profile picture change handler
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result); // preview the image
        setEditForm((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Scroll to bottom for long lists
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [user]);

  /** ----------- Profile Edit Logic ----------- **/
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    setLoading(true);
    setTimeout(() => {
      setUser((prev) => ({ ...prev, ...editForm }));
      setLoading(false);
      setShowEditProfile(false);
    }, 1000);
  };

  /** ----------- Address Logic ----------- **/
  const handleAddressDelete = (id) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  };

  /** ----------- Appointment Logic ----------- **/
  const handleAppointmentCancel = (id) => {
    setUser((prev) => ({
      ...prev,
      appointments: prev.appointments.filter((a) => a.id !== id),
    }));
  };

  /** ----------- Billing Logic ----------- **/
  const handleBillingPay = (id) => {
    setUser((prev) => ({
      ...prev,
      billing: prev.billing.map((b) =>
        b.id === id ? { ...b, status: "Paid" } : b
      ),
    }));
  };

  /** ----------- Render JSX ----------- **/
  return (
    <>
      {/* Chatbot Button */}
      <Button
        variant="success"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          borderRadius: "50%",
          width: "65px",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IoChatbubbleEllipses size={32} />
      </Button>

      <div className="container mt-4">
        <h2 className="mb-3">User Profile</h2>

        <Tabs activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          justify
          fill
        >
          <Tab eventKey="profile" title="Profile Info" />
          <Tab eventKey="addresses" title="Addresses" />
          <Tab eventKey="appointments" title="Appointments" />
          <Tab eventKey="records" title="Medical Records" />
          <Tab eventKey="billing" title="Billing & Insurance" />
          <Tab eventKey="wellness" title="Wellness & Analytics" />
          <Tab eventKey="security" title="Security & Settings" />
          <Tab eventKey="family" title="Family / Dependents" />
        </Tabs>

        <div
          className="tab-content border rounded p-4 bg-light"
          style={{ minHeight: "400px" }}
        >
          {/* Profile Info */}
          {activeTab === "profile" && (
            <Card className="p-3">
              <div className="d-flex flex-column align-items-center mb-3">
                <img
                  src={user.profilePic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle border mb-2"
                  width={100}
                  height={100}
                />
                <div className="text-center">
                  <h4>{user.name}</h4>
                  <p className="mb-0">{user.email}</p>
                  <p className="mb-0">{user.phone}</p>
                  <p className="mb-0">
                    DOB: {user.dob} | Gender: {user.gender} | Tier: {user.tier}
                  </p>
                </div>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => {
                    setEditForm(user);
                    setProfilePreview(user.profilePic || "");
                    setShowEditProfile(true);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            </Card>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <ListGroup>
              {user.addresses.map((a) => (
                <ListGroup.Item
                  key={a.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{a.label}:</strong> {a.address}
                  </div>
                  <div>
                    <Button size="sm" variant="outline-primary" className="me-2">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleAddressDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <ListGroup>
              {user.appointments.map((a) => (
                <ListGroup.Item
                  key={a.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{a.type}</strong> with {a.doctor} on {a.date}
                  </div>
                  <div>
                    <Button size="sm" variant="outline-primary" className="me-2">
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleAppointmentCancel(a.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Medical Records */}
          {activeTab === "records" && (
            <ListGroup>
              {user.records.map((r) => (
                <ListGroup.Item
                  key={r.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {r.type}: {r.name}
                  </div>
                  <div>
                    <Button size="sm" variant="outline-primary" className="me-2">
                      Download
                    </Button>
                    <Button size="sm" variant="outline-secondary">
                      Share
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <ListGroup>
              {user.billing.map((b) => (
                <ListGroup.Item
                  key={b.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {b.type}: {b.amount}
                  </div>
                  <div>
                    <span className="me-3">{b.status}</span>
                    {b.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleBillingPay(b.id)}
                      >
                        Pay
                      </Button>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Wellness & Analytics */}
          {activeTab === "wellness" && (
            <div>
              <p>
                Track your wellness metrics here. (BP, Weight, Glucose, Activity
                trends)
              </p>
              <Button variant="outline-primary" className="me-2">
                Symptom Checker
              </Button>
              <Button variant="outline-success">View Wellness Tips</Button>
            </div>
          )}

          {/* Security & Settings */}
          {activeTab === "security" && (
            <div>
              <p>Manage password, 2FA, notifications, privacy, and sessions.</p>
              <Button variant="outline-primary" className="me-2">
                Change Password
              </Button>
              <Button variant="outline-success" className="me-2">
                Enable 2FA
              </Button>
              <Button variant="outline-danger">Delete Account</Button>
            </div>
          )}

          {/* Family / Dependents */}
          {activeTab === "family" && (
            <div>
              <p>Manage family members or dependents:</p>
              <Button variant="outline-primary" className="mb-2">
                Add Family Member
              </Button>
              <ListGroup>
                <ListGroup.Item>
                  Jane Doe (Child) - View Records / Appointments
                  <Button size="sm" variant="outline-secondary" className="ms-2">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-danger" className="ms-2">
                    Remove
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditProfile} onHide={() => setShowEditProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="text-center mb-3">
              <img
                src={profilePreview || "https://via.placeholder.com/80"}
                alt="Profile Preview"
                className="rounded-circle border"
                width={100}
                height={100}
              />
            </div>
            <Form.Group className="mb-2">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={editForm.dob}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={editForm.gender}
                onChange={handleEditChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            {loading && <Spinner animation="border" className="mt-2" />}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditProfile(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProfileSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HealthProfile;
