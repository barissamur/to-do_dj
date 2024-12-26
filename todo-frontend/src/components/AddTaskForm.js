import { useState } from "react";
import axios from "axios";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API'ye POST isteği gönder
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tasks/",
        { title, description, completed: false },
        { withCredentials: true }
      );

      // Görev eklendiğinde listeyi güncelle
      onTaskAdded(response.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Görev eklenirken bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Başlık
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Açıklama
        </label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        ></textarea>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Görev Ekle
      </button>
    </form>
  );
};

export default AddTaskForm;
