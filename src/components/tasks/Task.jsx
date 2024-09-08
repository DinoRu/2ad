// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddTask from "./AddTask";
import config from "../../config/config";

const Task = () => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const apiBaseUrl = config.apiBaseUrl;
  const handleDownload = async () => {
    const apiurl = `${apiBaseUrl}/meters/download`;
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
      link.setAttribute("download", "Meters.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.error("Error download file: ", e);
    }
  };

  const clearUploadedFiles = async () => {
    setDeleting(true);
    const apiurl = `${apiBaseUrl}/meters/delete`;
    try {
      const response = await axios.delete(apiurl);
      if (response.status === 200) {
        alert("Файл успешно удален");
        navigate("/");
        console.log("Файл успешно удален");
      } else {
        console.log("Не успешно");
      }
    } catch (e) {
      console.error("Error to clearing files", e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex mt-5 align-items-center justify-content-between">
        <div>
          <button
            className="btn btn-primary btn-lg me-4"
            onClick={() => setModalIsOpen(true)}
          >
            Загрузить Файл
          </button>
          <button
            className="btn btn-success btn-lg me-3"
            onClick={handleDownload}
          >
            Скачать
          </button>
        </div>
        <button
          className="btn btn-danger btn-lg me-3"
          onClick={clearUploadedFiles}
        >
          Удалить
        </button>
      </div>
      <hr />
      {deleting && <div className="alert alert-info mt-3">Удаляется.....</div>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Загрузить Файл"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",

            width: "70%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <AddTask closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default Task;
