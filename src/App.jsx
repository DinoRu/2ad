import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
import Task from "./components/tasks/Task";
import AddTask from "./components/tasks/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Task />}></Route>
        <Route path="/add_task" element={<AddTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
