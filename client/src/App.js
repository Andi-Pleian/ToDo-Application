import React from 'react';
import {Routes, Route} from 'react-router';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ToDoList from './pages/ToDo/ToDoList';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path ="/" element={<Landing />} />
      <Route path ="/Login" element={<Login />} />
      <Route path ="/Register" element={<Register />} />
      <Route path ="/to-do-list" element={<ToDoList />} />
    </Routes>
  )
}

export default App