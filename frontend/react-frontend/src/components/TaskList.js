import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

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
                        <TaskItem key={task.id} task={task} onDelete={onDelete} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TaskList;
