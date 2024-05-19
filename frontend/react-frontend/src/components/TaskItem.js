// src/components/TaskItem.js
import React from 'react';
import { Button } from 'react-bootstrap';

const TaskItem = ({ task }) => (
  <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.dueDate}</td>
    <td>{task.status}</td>
    <td>
      <Button variant="info" href={`/tasks/${task.id}`}>Edit</Button>{' '}
      <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
    </td>
  </tr>
);

const handleDelete = (id) => {
  // Call backend to delete task
  fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        window.location.reload(); // Refresh the page
      }
    });
};

export default TaskItem;
