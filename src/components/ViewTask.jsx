import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);
  const [mediumTasks, setMediumTasks] = useState([]);
  const [highTasks, setHighTasks] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [filterTerm]);

  const fetchData = () => {
    const apiUrl = filterTerm
      ? `https://task-management-system-1.vercel.app/getSearchTask?task_name=${filterTerm}`
      : "https://task-management-system-1.vercel.app/getAllTask";

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (filterTerm) {
          setTasks(response.data.data);
        } else {
          setLowTasks(response.data.lowDetail);
          setMediumTasks(response.data.mediumDetail);
          setHighTasks(response.data.highDetail);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`https://task-management-system-1.vercel.app/deleteTask/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        fetchData();
        alert("Task deleted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const editTask = (taskId) => {
    navigate(`/editTask/${taskId}`);
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/createNew");
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-5">
        TASK MANAGEMENT SYSTEM
      </h1>
      <div className="flex mb-2 bg-red-400 p-5 justify-start  items-center w-full relative ">
        <label htmlFor="filterTerm" className="text-lg font-bold pl-5">
          Filter by Task Name:
        </label>
        <input
          style={{ width: "500px" }}
          type="text"
          id="filterTerm"
          name="filterTerm"
          className="border border-black p-2 ml-5"
          value={filterTerm}
          placeholder="Enter task name"
          onChange={(e) => setFilterTerm(e.target.value)}
        />
        <div style={{ width: "50%", paddingLeft: "20px" }}>
          <button
            type="button"
            onClick={handleAddClick}
            style={{
              // zIndex: 2,
              position: "absolute",
              right: "10%",
              top: "25%",
              width: "15%",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" /> ADD
          </button>
        </div>
      </div>
      {filterTerm ? (
        tasks.map((task) => (
          <div className=" my-5" style={{ width: "750px" }} key={task._id}>
            {/* <div style={{ width: '200px' }}></div> */}
            <div className=" p-8 bg-white items-right rounded-lg shadow-lg">
              <h1 className="text-xl font-bold">Task: {task.task_name}</h1>
              <p>Description: {task.description}</p>
              <p>
                {task.due_date ? task.due_date.slice(0, 10) : "No due date"}
              </p>
              <p
                style={{
                  color:
                    task.priority === "high"
                      ? "maroon"
                      : task.priority === "medium"
                      ? "blue"
                      : "green",
                }}
              >
                {task.priority.toUpperCase()}
                <div
                  className="mt-2"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      editTask(task._id);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTask(task._id);
                    }}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                  </button>
                </div>
              </p>
            </div>
          </div>
        ))
      ) : (
        // hamthyyyy work here
        // create 3 columns for low, medium and high priority tasks
        // use tailwindcss grid system
        <div className="container mx-auto mt-8 grid grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">
              Low Priority Tasks
            </h2>
            {lowTasks.map((task) => (
              <div key={task._id} className="mb-4">
                <div
                  className="p-8 bg-white items-right rounded-lg shadow-lg"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                  }}
                >
                  <h1 className="text-xl font-bold">Task: {task.task_name}</h1>
                  <p>Description: {task.description}</p>
                  <p>
                    {task.due_date ? task.due_date.slice(0, 10) : "No due date"}
                  </p>
                  <p
                    style={{
                      color:
                        task.priority === "high"
                          ? "maroon"
                          : task.priority === "medium"
                          ? "blue"
                          : "green",
                    }}
                  >
                    {task.priority.toUpperCase()}
                    <div
                      className="mt-2"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editTask(task._id);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTask(task._id);
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                        Delete
                      </button>
                    </div>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Second column */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Medium Priority Tasks
            </h2>
            {mediumTasks.map((task) => (
              <div key={task._id} className="mb-4">
                <div
                  className=" p-8 bg-white items-right rounded-lg shadow-lg"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                  }}
                >
                  <h1 className="text-xl font-bold">Task: {task.task_name}</h1>
                  <p>Description: {task.description}</p>
                  <p>
                    {task.due_date ? task.due_date.slice(0, 10) : "No due date"}
                  </p>
                  <p
                    style={{
                      color:
                        task.priority === "high"
                          ? "maroon"
                          : task.priority === "medium"
                          ? "blue"
                          : "green",
                    }}
                  >
                    {task.priority.toUpperCase()}
                    <div
                      className="mt-2"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editTask(task._id);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTask(task._id);
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                        Delete
                      </button>
                    </div>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Third column */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-800">
              High Priority Tasks
            </h2>
            {highTasks.map((task) => (
              <div key={task._id} className="mb-4">
                <div
                  className=" p-8 bg-white items-right rounded-lg shadow-lg"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                  }}
                >
                  <h1 className="text-xl font-bold">Task: {task.task_name}</h1>
                  <p>Description: {task.description}</p>
                  <p>
                    {task.due_date ? task.due_date.slice(0, 10) : "No due date"}
                  </p>
                  <p
                    style={{
                      color:
                        task.priority === "high"
                          ? "maroon"
                          : task.priority === "medium"
                          ? "blue"
                          : "green",
                    }}
                  >
                    {task.priority.toUpperCase()}
                    <div
                      className="mt-2"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editTask(task._id);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTask(task._id);
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                        Delete
                      </button>
                    </div>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
