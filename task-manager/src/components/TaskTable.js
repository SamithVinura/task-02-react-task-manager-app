import React from "react";

import { Table, Button } from "react-bootstrap";
import {
  BsEye,
  BsPencil,
  BsTrash,
  BsArrowUp,
  BsArrowDown,
} from "react-icons/bs";
function TaskTable({
  handleSort,
  sortConfig,
  currentTasks,
  setModalShow,
  setCurrentTask,
  setIsEditing,
  handleDelete,
}) {
  //on view click
  const handleView = (task) => {
    setModalShow(true);
    setCurrentTask(task);
    setIsEditing(false);
  };

  //on edit click
  const handleEdit = (task) => {
    setModalShow(true);
    setCurrentTask(task);
    setIsEditing(true);
  };

  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          <th>Task ID</th>
          <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
            Title{" "}
            {sortConfig.key === "title" &&
              (sortConfig.direction === "asc" ? (
                <BsArrowUp />
              ) : (
                <BsArrowDown />
              ))}
          </th>
          <th
            onClick={() => handleSort("createdDate")}
            style={{ cursor: "pointer" }}
          >
            Created Date{" "}
            {sortConfig.key === "createdDate" &&
              (sortConfig.direction === "asc" ? (
                <BsArrowUp />
              ) : (
                <BsArrowDown />
              ))}
          </th>
          <th>Assigned Person</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.createdAt}</td>
            <td>{task.assignedPerson}</td>
            <td>{task.status}</td>
            <td>
              <Button
                variant="info"
                className="me-4"
                onClick={() => handleView(task)}
              >
                <BsEye /> {/* Eye icon */}
              </Button>
              <Button
                variant="warning"
                className="me-4"
                onClick={() => handleEdit(task)}
              >
                <BsPencil /> {/* Pencil icon */}
              </Button>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                <BsTrash /> {/* Trash icon */}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TaskTable;
