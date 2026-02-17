import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const LabDiagnostics = () => {
  const [labs, setLabs] = useState([]); // Ensure labs is always an array
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ testType: '', location: '', homePickup: false });
  const [loading, setLoading] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch lab data on load
  useEffect(() => {
    fetchLabs();
  }, []);

  // API call to fetch labs
  const fetchLabs = async () => {
    setLoading(true);
    setError('');

    const baseUri =
      import.meta.env.VITE_API_URI ||
      `${window.location.protocol}//${window.location.host}/api`;

    try {
      const res = await axios.get(`${baseUri.replace(/\/$/, "")}/labs`);
      console.log("Lab API response:", res.data);
      if (Array.isArray(res.data)) {
        setLabs(res.data);
      } else if (Array.isArray(res.data.labs)) {
        setLabs(res.data.labs);
      } else {
        console.error('Unexpected response structure:', res.data);
        setLabs([]);
      }
    } catch (err) {
      setError('Failed to fetch labs. Try again later.');
      setLabs([]);
    }
    setLoading(false);
  };

  const handleBooking = (lab) => {
    setSelectedLab(lab);
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    if (!selectedLab) return;

    // build base URI (falls back to current host + /api)
    const baseUri =
      import.meta.env.VITE_API_URI ||
      `${window.location.protocol}//${window.location.host}/api`;

    const labId = selectedLab.id || selectedLab._id;

    try {
      await axios.post(
        `${baseUri.replace(/\/$/, "")}/labs/book`,
        { labId }
      );
      setAlertMessage(`✅ Booking confirmed with ${selectedLab.name}`);
      setShowBookingModal(false);
      setSelectedLab(null);
    } catch (err) {
      console.error('Lab booking error', err);
      const status = err.response ? ` (status ${err.response.status})` : '';
      setAlertMessage('❌ Booking failed. Please try again.' + status);
    }
  };

  const filteredLabs = Array.isArray(labs)
    ? labs.filter((lab) => {
        return (
          lab.name.toLowerCase().includes(search.toLowerCase()) &&
          (filter.testType === '' || lab.tests?.includes(filter.testType)) &&
          (filter.location === '' || lab.city.toLowerCase().includes(filter.location.toLowerCase())) &&
          (!filter.homePickup || lab.homePickup === true)
        );
      })
    : [];

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-3">🧪 Book Lab & Diagnostic Tests</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {alertMessage && <Alert variant="info">{alertMessage}</Alert>}

      <Form className="mb-4 d-flex gap-2 flex-wrap">
        <Form.Control
          placeholder="Search test or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select onChange={(e) => setFilter({ ...filter, testType: e.target.value })}>
          <option value="">All Test Types</option>
          <option value="Blood">Blood</option>
          <option value="Scan">Scan</option>
          <option value="Urine">Urine</option>
          <option value="Thyroid">Thyroid</option>
        </Form.Select>
        <Form.Control
          placeholder="Location"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        />
        <Form.Check
          type="checkbox"
          label="Home Pickup"
          onChange={(e) => setFilter({ ...filter, homePickup: e.target.checked })}
        />
        <Button variant="primary" onClick={fetchLabs}>🔍 Search</Button>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Loading labs...</p>
        </div>
      ) : (
        <Table bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Lab Name</th>
              <th>City</th>
              <th>Tests Offered</th>
              <th>Home Pickup</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No labs found</td>
              </tr>
            ) : (
              filteredLabs.map((lab) => (
                <tr key={lab.id}>
                  <td>{lab.name}</td>
                  <td>{lab.city}</td>
                  <td>{lab.tests?.join(', ')}</td>
                  <td>{lab.homePickup ? '✅' : '❌'}</td>
                  <td>
                    <Button size="sm" variant="success" onClick={() => handleBooking(lab)}>
                      Book
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Booking Confirmation Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to book with <strong>{selectedLab?.name}</strong> in <strong>{selectedLab?.city}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirmBooking}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LabDiagnostics;
