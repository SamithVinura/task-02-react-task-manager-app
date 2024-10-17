/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ViewEditModal({
  isEditing,
  modalShow,
  currentTask,
  setCurrentTask,
  handleSave,
  setModalShow,
}) {
  const [initialTask, setInitialTask] = useState(null);
  const [saveEnable, setSaveEnable] = useState(false);

  //check is task is change or not
  useEffect(() => {
    const isEqual = _.isEqual(currentTask, initialTask);
    setSaveEnable(!isEqual);
  }, [currentTask, initialTask]);

  useEffect(() => {
    setInitialTask(currentTask);
  }, [modalShow]);
  return (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Task" : "View Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentTask ? (
          <Form>
            <Form.Group controlId="formTaskTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentTask.title || ""}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, title: e.target.value })
                }
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formCreatedDate" className="mb-3">
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                type="text"
                value={currentTask.createdAt || ""}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formAssignedPerson" className="mb-3">
              <Form.Label>Assigned Person</Form.Label>
              <Form.Control
                type="text"
                value={currentTask.assignedPerson || ""}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    assignedPerson: e.target.value,
                  })
                }
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formTaskStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={currentTask.status || ""}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, status: e.target.value })
                }
                disabled={!isEditing}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        ) : (
          <p>No task selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Close
        </Button>
        {isEditing && (
          <Button variant="primary" onClick={handleSave} disabled={!saveEnable}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ViewEditModal;
