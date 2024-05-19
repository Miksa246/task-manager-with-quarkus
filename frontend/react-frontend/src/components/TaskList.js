import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete }) => {
    return (
        <div>
            <h2>Task List</h2>
            <Link to="/tasks/new" className="btn btn-primary mb-3">Add New Task</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.status}</td>
                            <td>
                                <Link to={`/tasks/${task.id}`} className="btn btn-primary mr-2">Edit</Link>
                                <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TaskList;
