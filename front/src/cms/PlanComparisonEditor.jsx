import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Table } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultPlans = ['Basic', 'Prime', 'Elite'];
const defaultFeatures = ['OPD Visits', 'Lab Tests', 'Surgery Coverage'];

const initialTable = defaultFeatures.map((feature, i) => ({
  id: `feature-${i}`,
  title: feature,
  values: defaultPlans.map(() => '✅'),
}));

const PlanComparisonEditor = () => {
  const [plans, setPlans] = useState(defaultPlans);
  const [rows, setRows] = useState(initialTable);

  const handleAddPlan = () => {
    const name = prompt('Enter new Plan name:');
    if (name) {
      setPlans([...plans, name]);
      setRows(rows.map(row => ({
        ...row,
        values: [...row.values, '❌'],
      })));
    }
  };

  const handleAddFeature = () => {
    const name = prompt('Enter new Feature name:');
    if (name) {
      setRows([...rows, {
        id: `feature-${rows.length}`,
        title: name,
        values: plans.map(() => '❌'),
      }]);
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

  return (
    <Container className="my-4">
      <h3 className="mb-4">📊 Plan Comparison Table Editor</h3>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleAddPlan}>➕ Add Plan Column</Button>{' '}
          <Button variant="success" onClick={handleAddFeature}>➕ Add Feature Row</Button>
        </Col>
      </Row>

      <Card className="p-3 shadow">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table-body">
            {(provided) => (
              <Table bordered responsive hover {...provided.droppableProps} ref={provided.innerRef}>
                <thead className="table-dark">
                  <tr>
                    <th>Feature</th>
                    {plans.map((plan, idx) => (
                      <th key={idx}>{plan}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided) => (
                        <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <td><strong>{row.title}</strong></td>
                          {row.values.map((val, pIdx) => (
                            <td key={pIdx}>
                              <Form.Select
                                value={val}
                                onChange={(e) => handleCellChange(index, pIdx, e.target.value)}
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
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </Card>

      <Row className="mt-4">
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={() => alert('🔧 Export to be implemented')}>💾 Export Table</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanComparisonEditor;

