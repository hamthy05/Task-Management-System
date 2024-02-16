import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, Input, Typography } from "@material-tailwind/react";

const CreateTask = () => {
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
      const response = await axios.post(
        "http://localhost:5000/api/createTask",
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
          <Typography
            className="text-blue-gray-500 text-2xl font-bold"
            color="blue-gray"
          >
            Add New Task
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter task details.
          </Typography>

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className=" flex flex-col gap-5">
              <Typography
                variant="h6"
                className="text-blue-gray-500 text-lg font-bold"
              >
                Task Name
              </Typography>
              <Input
                type="text"
                id="task_name"
                name="task_name"
                size="lg"
                placeholder="Enter the task name"
                style={{ width: "100%" }}
                className="mt-1 border rounded-lg border-black p-5  font-bold focus:border-gray-900 "
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={handleChange}
                value={formData.task_name}
                // required
              />

              <div className="flex flex-col gap-5">
                <label
                  htmlFor="description"
                  className="mt-1 text-blue-gray-500 text-lg font-bold "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter the Description"
                  className="border rounded-lg border-black p-5 focus:border-gray-900 resize-none "
                  onChange={handleChange}
                  value={formData.description}
                  required
                ></textarea>
              </div>

              <Typography
                color="blue-gray"
                className="mt-1 text-blue-gray-500 text-lg font-bold"
              >
                Date
              </Typography>
              <Input
                id="due_date"
                name="due_date"
                type="date"
                size="lg"
                placeholder=""
                style={{ width: "100%" }}
                className="mb-5 border rounded-lg border-black p-5  font-bold focus:border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={handleChange}
                value={formData.due_date}
                required
              />
            </div>

            <div className="mb-4  flex flex-col gap-5">
              <label
                htmlFor="priority"
                className="text-blue-gray-500 text-xl font-bold "
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="border rounded-lg border-black p-3 focus:border-gray-900 bg-white"
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
              className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              value="Add New"
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateTask;
