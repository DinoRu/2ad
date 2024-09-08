import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const AddTask = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const apiBaseUrl = config.apiBaseUrl;
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const apiurl = `${apiBaseUrl}/meters/upload`;
    if (!file) {
      setMsg("Файл не выбран");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      setMsg("Uploading....");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });
      //Send to server
      axios
        .post(apiurl, formData, {
          headers: {
            "Custom-Header": "value",
          },
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return {
                ...prevState,
                pc: (progressEvent.loaded / progressEvent.total) * 100,
              };
            });
          },
        })
        .then((res) => {
          setMsg("Uploaded successfully!");
          console.log(res.data);
        })
        .catch((e) => {
          setMsg("Failed to upload");
          console.error(e);
        });

      closeModal();
      navigate("/");
      alert("Файл успешно загружен");
      // Fermer le modal après le téléchargement
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2>Загружать Файл</h2>
        <br />
        <div className="mb-3">
          <input
            type="file"
            placeholder="Загружать Файл"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="my-4 col-12">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleUpload}
          >
            Загружать
          </button>
          {progress.started && (
            <div className="text-center">
              <progress max={100} value={progress.pc}></progress>
            </div>
          )}
          {msg && (
            <div className="text-center mt-2">
              <span>{msg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
