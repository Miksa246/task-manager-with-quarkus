import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Home from './components/Home'; 
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8080/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => setTasks(response.data))
                .catch(error => console.error('Error fetching tasks:', error));
        }
    }, [token]);

    const handleSaveTask = (task) => {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        if (task.id) {
            axios.put(`http://localhost:8080/tasks/${task.id}`, task, config)
                .then(response => {
                    const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);
                    setTasks(updatedTasks);
                })
                .catch(error => console.error('Error updating task:', error));
        } else {
            axios.post('http://localhost:8080/tasks', task, config)
                .then(response => {
                    setTasks([...tasks, response.data]);
                })
                .catch(error => console.error('Error saving task:', error));
        }
    };

    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleLogin = (token) => {
        setToken(token);
        localStorage.setItem('jwtToken', token);
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Use Home component */}
                    <Route path="/tasks" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} />} />
                    <Route path="/tasks/new" element={<TaskForm onSave={handleSaveTask} />} />
                    <Route path="/tasks/:id" element={<TaskForm tasks={tasks} onSave={handleSaveTask} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
