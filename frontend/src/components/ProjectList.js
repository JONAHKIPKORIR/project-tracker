// src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProjectModal from './EditProjectModal';
import AddProject from './AddProject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects/${id}`);
      fetchProjects();
      toast.success('Project deleted successfully.');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project.');
    }
  };

  const filteredProjects = projects
    .filter((project) => statusFilter === '' || project.status === statusFilter)
    .filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="project-list-container">
      <h1>Project List</h1>
      
      <div className="actions">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={() => setShowAddProjectForm(!showAddProjectForm)} className="toggle-button">
          {showAddProjectForm ? 'Hide Add Project Form' : 'Add New Project'}
        </button>
      </div>

      {showAddProjectForm && <AddProject onProjectAdded={fetchProjects} />}

      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <div key={project.id} className="project-item">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Status: <span className={`status-${project.status.toLowerCase()}`}>{project.status}</span></p>
            <div className="project-buttons">
              <button onClick={() => setSelectedProject(project)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}

      {selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={fetchProjects}
        />
      )}
    </div>
  );
};

export default ProjectList;
