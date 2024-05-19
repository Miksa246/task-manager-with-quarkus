import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleSaveTask = (task) => {
        if (task.id) {
            axios.put(`http://localhost:8080/tasks/${task.id}`, task)
                .then(response => {
                    const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);
                    setTasks(updatedTasks);
                })
                .catch(error => console.error('Error updating task:', error));
        } else {
            axios.post('http://localhost:8080/tasks', task)
                .then(response => {
                    setTasks([...tasks, response.data]);
                })
                .catch(error => console.error('Error saving task:', error));
        }
    };

    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`)
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<h2>Home</h2>} />
                    <Route path="/tasks" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} />} />
                    <Route path="/tasks/new" element={<TaskForm onSave={handleSaveTask} />} />
                    <Route path="/tasks/:id" element={<TaskForm tasks={tasks} onSave={handleSaveTask} />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
