// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDownload = async () => {
    const apiurl = "http://45.147.176.236:5000/tasks/download";
    try {
      const response = await axios.post(
        apiurl,
        {},
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Report.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.error("Error download file: ", e);
    }
  };

  const clearUploadedFiles = async () => {
    setDeleting(true);
    const apiurl = "http://45.147.176.236:5000/tasks/clear";
    try {
      const response = await axios.delete(apiurl);
      if (response.status === 200) {
        alert("Файл успешно удален");
        navigate("/");
      }
    } catch (e) {
      console.error("Error to clearing files", e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex mt-5 align-items-center">
        <Link to="/add_task" className="btn btn-primary btn-lg me-4">
          Загружать
        </Link>
        <button
          className="btn btn-success btn-lg me-3"
          onClick={handleDownload}
        >
          Скачать
        </button>
        <button
          className="btn btn-danger btn-lg me-3"
          onClick={clearUploadedFiles}
        >
          Удалить
        </button>
      </div>
      <hr />
      {deleting && <div className="alert alert-info mt-3">Удаляется.....</div>}
    </div>
  );
};

export default Task;
