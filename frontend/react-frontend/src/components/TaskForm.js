import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ tasks, onSave }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: '' });

    useEffect(() => {
        if (id) {
            const existingTask = tasks.find(task => task.id.toString() === id);
            if (existingTask) {
                setTask(existingTask);
            }
        }
    }, [id, tasks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task);
        navigate('/tasks');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    );
};

export default TaskForm;
