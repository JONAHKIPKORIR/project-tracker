// src/components/EditProjectModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // <-- Add this import


const EditProjectModal = ({ project, onClose, onUpdate }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = { name, description, status };
      await axios.put(`https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects/${project.id}`, updatedProject);
      toast.success('Project updated successfully!');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error('Error updating project');
      console.error('Error updating project:', err);
    }
  };
  

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Project</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project Name"
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default EditProjectModal;
