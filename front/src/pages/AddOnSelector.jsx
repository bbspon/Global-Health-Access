import React, { useState } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Badge,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import {
  FaInfoCircle,
  FaRobot,
  FaUsers,
  FaShoppingCart,
  FaBolt,
  FaCartPlus,
} from "react-icons/fa";

// Replace this with the full 25+ add-ons list
const allAddOns = [
  {
    id: 1,
    name: "Emergency Boost",
    price: 49,
    description: "SOS access, Ambulance assist, Emergency OPD visit",
    tooltip: "24x7 emergency response with hospital coordination",
    recommended: true,
    category: "Emergency",
    tags: ["Popular"],
    sponsoredBy: null,
  },
  {
    id: 2,
    name: "Maternity Add-on",
    price: 199,
    description: "All trimester scans, OBGYN consults, Delivery discount",
    tooltip: "Ideal for expecting families",
    recommended: false,
    category: "Family",
    tags: ["Top Rated"],
    sponsoredBy: "NGO",
  },
  // ... Add the rest of the add-ons here
];

const AddOnSelector = ({
  onAddOnsChange,
  onBuyNow = (addOn) => console.log("Buy Now clicked:", addOn),
  onAddToCart = (addOn) => console.log("Add to Cart clicked:", addOn),
  onBuySelectedAddOns = (addOnIds) =>
    console.log("Buy All Selected Add-ons:", addOnIds),
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleToggle = (id, price) => {
    let updated = [];
    if (selectedAddOns.includes(id)) {
      updated = selectedAddOns.filter((item) => item !== id);
      setTotalPrice(totalPrice - price);
    } else {
      updated = [...selectedAddOns, id];
      setTotalPrice(totalPrice + price);
    }
    setSelectedAddOns(updated);
    onAddOnsChange && onAddOnsChange(updated);
  };

  const renderTooltip = (tooltip) => <Tooltip>{tooltip}</Tooltip>;

  return (
    <Card className="p-4 shadow rounded-4 mb-4">
      <h5 className="mb-3">🧩 Optional Health Add-ons</h5>
      <Row xs={1} md={2} lg={2}>
        {allAddOns.map((addOn) => (
          <Col key={addOn.id} className="mb-3">
            <Card
              className={`h-100 border-${
                selectedAddOns.includes(addOn.id) ? "success" : "light"
              }`}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Form.Check
                        type="checkbox"
                        label={addOn.name}
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => handleToggle(addOn.id, addOn.price)}
                      />
                      <Card.Subtitle className="text-muted small mt-1 mb-2">
                        ₹{addOn.price} / One-time
                      </Card.Subtitle>
                    </div>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(addOn.tooltip)}
                    >
                      <span>
                        <FaInfoCircle className="text-primary" />
                      </span>
                    </OverlayTrigger>
                  </div>

                  <Card.Text className="small">{addOn.description}</Card.Text>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {addOn.recommended && (
                      <Badge bg="warning" text="dark">
                        <FaRobot className="me-1" />
                        AI Suggestion
                      </Badge>
                    )}
                    {addOn.tags.map((tag, idx) => (
                      <Badge key={idx} bg="info">
                        {tag}
                      </Badge>
                    ))}
                    {addOn.sponsoredBy && (
                      <Badge bg="success">
                        <FaUsers className="me-1" />
                        {addOn.sponsoredBy === "Employer"
                          ? "Included by Employer"
                          : "Sponsored by NGO"}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => onAddToCart(addOn)}
                  >
                    <FaShoppingCart className="me-1" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onBuyNow(addOn)}
                  >
                    <FaBolt className="me-1" />
                    Buy Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Total Add-on Cost:</strong>
        <span className="fs-5 fw-bold text-success">₹{totalPrice}</span>
      </div>

      {selectedAddOns.length > 0 && (
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onBuySelectedAddOns(selectedAddOns)}
          >
            <FaCartPlus className="me-2" />
            Buy All Selected Add-ons (₹{totalPrice})
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AddOnSelector;
