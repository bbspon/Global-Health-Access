import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const defaultPlans = ["Basic", "Prime", "Elite"];
const defaultFeatures = ["OPD Visits", "Lab Tests", "Surgery Coverage"];

const initialTable = defaultFeatures.map((feature, i) => ({
  id: `feature-${i}`,
  title: feature,
  values: defaultPlans.map(() => "✅"),
}));

const PlanComparisonEditor = () => {
  const [plans, setPlans] = useState(defaultPlans);
  const [rows, setRows] = useState(initialTable);
  const hospitalId = "64ffabc0123abc456789de01";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/plancomparison/${hospitalId}`)
      .then((res) => {
        console.log("API Data:", res.data); // ✅ Debugging
        if (res.data) {
          setPlans(res.data.plans || defaultPlans);
          setRows(
            (res.data.rows || initialTable).map((row, i) => ({
              ...row,
              id: row.id || `feature-${i}`,
            }))
          );
        }
      })
      .catch((err) => console.error("❌ Failed to load table", err));
  }, []);

  const handleAddPlan = () => {
    const name = prompt("Enter new Plan name:");
    if (name) {
      setPlans([...plans, name]);
      setRows(
        rows.map((row) => ({
          ...row,
          values: [...row.values, "❌"],
        }))
      );
    }
  };

  const handleAddFeature = () => {
    const name = prompt("Enter new Feature name:");
    if (name) {
      setRows([
        ...rows,
        {
          id: `feature-${rows.length}`,
          title: name,
          values: plans.map(() => "❌"),
        },
      ]);
    }
  };

  const handleCellChange = (rowIdx, planIdx, val) => {
    const updated = [...rows];
    updated[rowIdx].values[planIdx] = val;
    setRows(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newRows = Array.from(rows);
    const [movedRow] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, movedRow);
    setRows(newRows);
  };

  const handleSave = () => {
    axios
      .post(`${import.meta.env.VITE_API_URI}/plancomparison`, {
        hospitalId,
        plans,
        rows,
      })
      .then(() => alert("✅ Table saved successfully!"))
      .catch(() => alert("❌ Failed to save table"));
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">📊 Plan Comparison Table Editor</h3>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleAddPlan}>
            ➕ Add Plan Column
          </Button>{" "}
          <Button variant="success" onClick={handleAddFeature}>
            ➕ Add Feature Row
          </Button>{" "}
          <Button variant="outline-dark" onClick={handleSave}>
            💾 Save Table
          </Button>
        </Col>
      </Row>

      <Card className="p-3 shadow">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table bordered responsive hover>
            <thead className="table-dark">
              <tr>
                <th>Feature</th>
                {plans.map((plan, idx) => (
                  <th key={idx}>{plan}</th>
                ))}
              </tr>
            </thead>
            <Droppable droppableId="table-body">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td>
                            <strong>{row.title}</strong>
                          </td>
                          {row.values.map((val, pIdx) => (
                            <td key={pIdx}>
                              <Form.Select
                                value={val}
                                onChange={(e) =>
                                  handleCellChange(index, pIdx, e.target.value)
                                }
                              >
                                <option value="✅">✅ Yes</option>
                                <option value="❌">❌ No</option>
                                <option value="ℹ️">ℹ️ Info</option>
                              </Form.Select>
                            </td>
                          ))}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </Card>
    </Container>
  );
};

export default PlanComparisonEditor;
