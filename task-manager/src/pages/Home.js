import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";

import {
  createTask,
  deleteTask,
  getTasksList,
  updateTask,
} from "../services/api";
import TaskTable from "../components/TaskTable";
import ViewEditModal from "../components/ViewEditModal";
import { toast, ToastContainer } from "react-toastify";
import CreatetaskModal from "../components/CreatetaskModal";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [modalShowViewEdit, setModalShowViewEdit] = useState(false);
  const [modalShowNew, setModalShowNew] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    assignedPerson: "",
    status: "Pending",
  });
  const itemsPerPage = 5; // For pagination

  const fetchTasks = async () => {
    setTasks(await getTasksList());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Sort function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Filter by search and status
  const filteredTasks = sortedTasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  //create new task
  const handleCreateTask = async () => {
    const taskWithIdDate = {
      ...newTask,
      id: String(Math.floor(Math.random() * 1000)),
      createdAt: new Date().toLocaleDateString("en-US"),
    };
    const res = await createTask(taskWithIdDate);
    if (res) {
      setModalShowNew(false);
      setNewTask({
        id: "",
        title: "",
        assignedPerson: "",
        status: "Pending",
      });
      fetchTasks();
      toast.success("Task created succesfully", {
        theme: "colored",
      });
    }
  };

  //handle save
  const handleSave = async () => {
    const updated = await updateTask(currentTask.id, currentTask);
    if (updated) {
      setModalShowViewEdit(false);
      fetchTasks();
      toast.success("Task updated succesfully", {
        theme: "colored",
      });
    }
  };
  //on delete click
  const handleDelete = async (taskId) => {
    const deleteMsg = await deleteTask(taskId);
    if (deleteMsg) {
      fetchTasks();
      toast.error(deleteMsg, {
        theme: "colored",
      });
    }
  };
  return (
    <div className="mt-5 p-5">
      <h1 className="text-center mb-5 display-4 text-dark font-weight-bold">
        TASK MANAGER APP
      </h1>
      <ToastContainer />
      {/* Search and Filter Bar */}
      <Row className="mb-4 align-items-end">
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="border"
              id="dropdown-basic"
            >
              Filter by Status: {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterStatus("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("Pending")}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("In Progress")}>
                In Progress
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("Completed")}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-end"
          onClick={() => setModalShowNew(true)}
        >
          <Button variant="primary">Create New Task</Button>
        </Col>
      </Row>

      {/* Task Table */}
      <TaskTable
        handleSort={handleSort}
        sortConfig={sortConfig}
        currentTasks={currentTasks}
        setModalShow={setModalShowViewEdit}
        setCurrentTask={setCurrentTask}
        setIsEditing={setIsEditing}
        handleDelete={handleDelete}
      />
      {/* View/Edit Modal*/}
      <ViewEditModal
        isEditing={isEditing}
        modalShow={modalShowViewEdit}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleSave={handleSave}
        setModalShow={setModalShowViewEdit}
      />
      {/* Create new task Modal*/}
      <CreatetaskModal
        newTask={newTask}
        setNewTask={setNewTask}
        show={modalShowNew}
        setModalShowNew={setModalShowNew}
        handleCreateTask={handleCreateTask}
      />
      {/* Pagination */}
      <Pagination className="justify-content-center ">
        {renderPagination()}
      </Pagination>
    </div>
  );
};

export default Home;
