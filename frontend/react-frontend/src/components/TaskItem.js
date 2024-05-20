import React from 'react';
import { Button } from 'react-bootstrap';

const TaskItem = ({ task, onDelete }) => {
    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.status}</td>
            <td>
                <Button variant="info" href={`/tasks/${task.id}`}>Edit</Button>{' '}
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </td>
        </tr>
    );
};

export default TaskItem;
