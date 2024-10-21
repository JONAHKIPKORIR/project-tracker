import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications


const AddProject = ({ onProjectAdded }) => { // Add onProjectAdded prop to call after a successful submission
  const [project, setProject] = useState({
    name: '',
    description: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects', project);
      toast.success('Project added successfully'); // Use toast for success notification
      setProject({ name: '', description: '', status: 'Pending' });
      onProjectAdded(); // Call the function to fetch projects again
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project.'); // Use toast for error notification
    }
  };

  return (
    <div className="add-project-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
          className="form-input"
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
          className="form-textarea"
        />
        <select name="status" value={project.status} onChange={handleChange} className="form-select">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="form-button">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
