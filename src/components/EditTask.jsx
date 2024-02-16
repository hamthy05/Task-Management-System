import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Input, Typography } from "@material-tailwind/react";

const EditTasks = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState([]);

  useEffect(() => {
    fetchData();
  }, [taskId]);

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/getOneTask/${taskId}`, "", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const taskData = response.data.data;

        setTask(taskData);
        setFormData({
          task_name: taskData.task_name,
          description: taskData.description,
          due_date: taskData.due_date,
          priority: taskData.priority,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    due_date: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateTask/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Successfully stored on the backend
        alert("Task added successfully!");
        navigate("/home");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 flex flex-col items-center ">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Edit Task
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Edit your task details.
          </Typography>
          <hr />

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Task Name
              </Typography>
              <Input
                type="text"
                id="task_name"
                name="task_name"
                style={{ width: "100%" }}
                size="lg"
                placeholder="Task name"
                className=" border border-black p-2  font-bold focus:border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={handleChange}
                value={formData.task_name}
                required
              />
              <div className="mb-1 flex flex-col gap-6">
                <label
                  htmlFor="description"
                  className="text-blue-gray-500 text-lg font-bold "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="More details"
                  className="border border-black p-2 focus:border-gray-900 resize-none "
                  onChange={handleChange}
                  value={formData.description}
                  required
                ></textarea>
              </div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3  font-bold"
              >
                Date
              </Typography>
              <Input
                id="due_date"
                name="due_date"
                type="date"
                style={{ width: "100%" }}
                size="lg"
                placeholder="********"
                className=" border border-black p-2  font-bold focus:border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={handleChange}
                value={formData.due_date}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-6">
              <label
                htmlFor="priority"
                className="text-blue-gray-500 text-xl font-bold mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="border border-black p-2 focus:border-gray-900 bg-white"
                onChange={handleChange}
                value={formData.priority}
                required
              >
                <option>Select.. </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <input
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              value="Update"
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditTasks;
