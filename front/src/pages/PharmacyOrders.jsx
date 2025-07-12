// src/pages/PharmacyOrders.jsx
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const PharmacyOrders = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [prescription, setPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refillAlert, setRefillAlert] = useState(null);

  useEffect(() => {
    axios
      .get("/api/medicines")
      .then((res) => {
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.medicines || [];
        setMedicines(result);
      })
      .catch((err) => {
        console.error(err);
        setMedicines([]);
        setError("⚠️ Failed to load medicines. Please try again.");
      });
  }, []);

  const addToCart = (item) => {
    const exists = cart.find((m) => m.id === item.id);
    if (!exists) setCart([...cart, { ...item, quantity: 1 }]);
  };

  const handleUpload = (e) => {
    setPrescription(e.target.files[0]);
  };

  const placeOrder = async () => {
    if (!deliveryMode) return alert("Please select delivery mode");
    if (cart.length === 0 && !prescription)
      return alert("Add medicines or upload prescription");

    setLoading(true);
    try {
      const formData = new FormData();
      cart.forEach((item, i) => {
        formData.append(`items[${i}][id]`, item.id);
        formData.append(`items[${i}][qty]`, item.quantity);
      });
      if (prescription) formData.append("prescription", prescription);
      formData.append("deliveryMode", deliveryMode);

      await axios.post("/api/pharmacy/order", formData);
      alert("✅ Order placed successfully!");
      setCart([]);
      setPrescription(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Error placing order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h3>💊 Order Medicines</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Control
        type="text"
        placeholder="🔍 Search by medicine name"
        className="my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {medicines.length > 0 ? (
          medicines
            .filter((m) =>
              m.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((m) => (
              <div key={m.id} className="col-md-4 mb-3">
                <div className="card p-3 shadow-sm">
                  <h5>{m.name}</h5>
                  <p>₹{m.price} | Stock: {m.stock}</p>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => addToCart(m)}
                  >
                    ➕ Add
                  </Button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-muted">No medicines available.</p>
        )}
      </div>

      <hr />
      <h4>🛒 Your Cart</h4>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      setCart((prev) =>
                        prev.map((c, i) =>
                          i === idx ? { ...c, quantity: qty } : c
                        )
                      );
                    }}
                    min={1}
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setCart((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    ❌ Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="mb-3">
        <Form.Label>📎 Upload Prescription (Optional)</Form.Label>
        <Form.Control
          type="file"
          accept="image/*,.pdf"
          onChange={handleUpload}
        />
        {prescription && (
          <small className="text-success">
            📤 File ready: {prescription.name}
          </small>
        )}
      </div>

      <div className="mb-3">
        <Form.Label>🚚 Select Delivery Mode</Form.Label>
        <Form.Select
          onChange={(e) => setDeliveryMode(e.target.value)}
          value={deliveryMode}
        >
          <option value="">-- Choose --</option>
          <option value="home">🏠 Home Delivery</option>
          <option value="pickup">🏬 In-store Pickup</option>
          <option value="express">⚡ Express (90 min)</option>
          <option value="elder">👴 Elder Assist</option>
        </Form.Select>
      </div>

      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        disabled={loading}
      >
        ✅ Confirm & Pay
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>📦 Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Items:</strong> {cart.length}
          </p>
          <p>
            <strong>Delivery:</strong> {deliveryMode}
          </p>
          {prescription && <p>Prescription: ✅ {prescription.name}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={placeOrder} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Place Order"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {refillAlert && (
        <Alert variant="info" className="mt-3">
          🔄 Don’t forget to refill your previous order!
        </Alert>
      )}
    </div>
  );
};

export default PharmacyOrders;