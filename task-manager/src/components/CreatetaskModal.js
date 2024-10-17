import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreatetaskModal({
  show,
  setModalShowNew,
  handleCreateTask,
  newTask,
  setNewTask,
}) {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  //handle close modal
  const handleClose = () => {
    setNewTask({
      title: "",
      assignedPerson: "",
      status: "Pending",
    });
    setModalShowNew(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter task title"
              value={newTask.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAssignedPerson" className="mb-3">
            <Form.Label>Assigned Person</Form.Label>
            <Form.Control
              type="text"
              name="assignedPerson"
              placeholder="Enter person name"
              value={newTask.assignedPerson}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newTask.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateTask}
          disabled={!newTask.title || !newTask.assignedPerson}
        >
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreatetaskModal;
