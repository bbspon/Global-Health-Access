import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  PencilSquare,
  Eye,
  Trash,
  PlusCircle,
  Files,
  Stars,
  Search,
  InfoCircle,
} from "react-bootstrap-icons";

// Dummy Plan Data
const initialPlans = [
  {
    id: 1,
    name: "Basic Care",
    tier: "Basic",
    price: "₹199/month",
    features: ["OPD", "Lab Tests"],
    status: "Published",
  },
  {
    id: 2,
    name: "Premium Wellness",
    tier: "Premium",
    price: "₹799/month",
    features: ["OPD", "Lab Tests", "Ambulance", "Telemedicine"],
    status: "Draft",
  },
];

const PlanManagementDashboard = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [previewPlan, setPreviewPlan] = useState(null);
  const [filterTier, setFilterTier] = useState("All");
  const [searchText, setSearchText] = useState("");

  const userRole = "admin"; // Change to "viewer" to test permissions

  const handleEdit = (plan) => {
    if (userRole !== "admin") return;
    setEditingPlan(plan);
    setShowModal(true);
  };

  const handleClone = (plan) => {
    if (userRole !== "admin") return;
    const cloned = {
      ...plan,
      id: Date.now(),
      name: `${plan.name} (Clone)`,
      status: "Draft",
    };
    setPlans((prev) => [...prev, cloned]);
  };

  const handleDelete = (planId) => {
    if (userRole !== "admin") return;
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== planId));
    }
  };

  const handleCreateNew = () => {
    if (userRole !== "admin") return;
    setEditingPlan(null);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPlan = {
      id: editingPlan?.id || Date.now(),
      name: form.planName.value,
      tier: form.tier.value,
      price: form.price.value,
      status: form.status.value,
      features: form.features.value.split(",").map((f) => f.trim()),
    };

    if (editingPlan) {
      setPlans((prev) => prev.map((p) => (p.id === newPlan.id ? newPlan : p)));
    } else {
      setPlans((prev) => [...prev, newPlan]);
    }

    setShowModal(false);
  };

  const filteredPlans = plans.filter(
    (p) =>
      (filterTier === "All" || p.tier === filterTier) &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const tierOptions = ["All", "Basic", "Plus", "Premium", "Super Premium"];

  return (
    <Container className="p-5 border  rounded-4 my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>🛠️ Plan Management Engine</h3>
          {userRole === "admin" && (
            <Button variant="success" onClick={handleCreateNew}>
              <PlusCircle className="me-1" />
              Create Plan
            </Button>
          )}
      </div>


         <div className="d-flex gap-3 mb-5 ">
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search plan..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>

          <Form.Select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="me-2 d-flex align-items-center w-auto"
          >
            {tierOptions.map((tier, idx) => (
              <option key={idx}>{tier}</option>
            ))}
          </Form.Select>

        
        </div>
      <Row>
        {filteredPlans.map((plan) => (
          <Col md={6} lg={4} key={plan.id} className="mb-4">
            <Card
              className="text-white shadow-sm border-0"
              style={{
                backgroundImage: `url('https://st.depositphotos.com/1028979/4049/i/450/depositphotos_40493159-stock-photo-doctor-working-with-healthcare-icons.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "15px",
                minHeight: "330px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.45)",
                  zIndex: 1,
                }}
              />
              <Card.Body style={{ position: "relative", zIndex: 2 }}>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>{plan.name}</span>
                  <Badge
                    bg={plan.status === "Published" ? "success" : "secondary"}
                  >
                    {plan.status}
                  </Badge>
                </Card.Title>

                <h6 className="text-light">
                  {plan.tier} Tier{" "}
                  {plan.tier === "Super Premium" && (
                    <Stars className="text-warning ms-1" />
                  )}
                </h6>

                {/* Price Box */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "10px",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  💰 {plan.price}
                </div>

                <div className="mb-2">
                  {plan.features.map((feat, i) => (
                    <Badge
                      key={i}
                      pill
                      bg="info"
                      className="me-1 text-dark"
                    >
                      {feat}
                    </Badge>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-5 align-items-center">
                  <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setPreviewPlan(plan)}
                    >
                      <Eye />
                    </Button>
                  </OverlayTrigger>

                  {userRole === "admin" && (
                    <>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleEdit(plan)}
                        >
                          <PencilSquare />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Clone</Tooltip>}>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleClone(plan)}
                        >
                          <Files />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(plan.id)}
                        >
                          <Trash />
                        </Button>
                      </OverlayTrigger>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* View Modal */}
      <Modal show={!!previewPlan} onHide={() => setPreviewPlan(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔍 Plan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewPlan && (
            <>
              <h5>{previewPlan.name}</h5>
              <p><strong>Tier:</strong> {previewPlan.tier}</p>
              <p><strong>Price:</strong> {previewPlan.price}</p>
              <p><strong>Status:</strong> 
                <Badge bg={previewPlan.status === "Published" ? "success" : "secondary"} className="ms-2">
                  {previewPlan.status}
                </Badge>
              </p>
              <p>
                <strong>Features:</strong>{" "}
                {previewPlan.features.map((f, i) => (
                  <Badge key={i} className="me-1" bg="info">
                    {f}
                  </Badge>
                ))}
              </p>
              <hr />
              <p>
                <InfoCircle className="me-1" />
                <strong>Usage Limits:</strong>{" "}
                <em className="text-muted">Coming soon...</em>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPreviewPlan(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingPlan ? "Edit Plan" : "Create New Plan"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                name="planName"
                type="text"
                defaultValue={editingPlan?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Tier</Form.Label>
              <Form.Select name="tier" defaultValue={editingPlan?.tier || "Basic"}>
                <option>Basic</option>
                <option>Plus</option>
                <option>Premium</option>
                <option>Super Premium</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                defaultValue={editingPlan?.price || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={editingPlan?.status || "Draft"}>
                <option>Draft</option>
                <option>Published</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Features (comma-separated)</Form.Label>
              <Form.Control
                name="features"
                type="text"
                defaultValue={editingPlan?.features?.join(", ") || ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Plan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default PlanManagementDashboard;
