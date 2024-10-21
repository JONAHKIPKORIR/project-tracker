import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectTracker = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', status: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects', newProject);
      setNewProject({ name: '', description: '', status: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://friendly-space-tribble-vrpxq5wg66v2p9px-5000.app.github.dev/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h1>Project Tracker</h1>
      
      <form onSubmit={addProject}>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={newProject.status}
          onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      <h2>Existing Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <p>{project.name}</p>
            <p>{project.description}</p>
            <p>{project.status}</p>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTracker;
