// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify'; // <-- Remove toast from import
import 'react-toastify/dist/ReactToastify.css';
import ProjectList from './components/ProjectList';

const App = () => {
  return (
    <div className="App">
      <ProjectList />
      <ToastContainer />
    </div>
  );
};

export default App;
