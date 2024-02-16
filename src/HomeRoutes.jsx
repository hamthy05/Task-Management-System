import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTask from "./components/ViewTask";
import CreateTask from "./components/CreateTask";
import NoContent from "./Nocontent";
import EditTasks from "./components/EditTask";

export default function HomeRoutes() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ViewTask />} />
                    <Route path="/home" element={<ViewTask />} />
                    <Route path="/createNew" element={<CreateTask />} />
                    <Route path="/editTask/:taskId" element={<EditTasks />} />
                    <Route path="*" element={<NoContent />} />
                </Routes>

                
            </BrowserRouter>
        </>

        

    );

}
