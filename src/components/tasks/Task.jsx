// import axios from "axios";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Task = () => {
  const handleDownload = () => {
    try {
      axios
        .post(
          "http://45.147.176.236:5000/tasks/download?offset=0&limit=1000&order=ASC&condition=%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8F%D0%B5%D1%82%D1%81%D1%8F",
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "Report.xlsx";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        });
    } catch (e) {
      console.log(e);
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
        <Link to="/dashboard/task" className="btn btn-danger btn-lg me-3">
          Удалить
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Task;
