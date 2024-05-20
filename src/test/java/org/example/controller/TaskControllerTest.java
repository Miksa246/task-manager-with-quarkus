package org.example.controller;

import org.example.entity.Task;
import org.example.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskControllerTest {

    private TaskRepository taskRepository;
    private TaskController taskController;

    @BeforeEach
    public void setUp() {
        taskRepository = mock(TaskRepository.class);
        taskController = new TaskController();
        taskController.taskRepository = taskRepository;
    }

    @Test
    public void testListAllTasks() {
        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task());
        when(taskRepository.listAllTasks()).thenReturn(mockTasks);

        Response response = taskController.listAll();
        List<Task> tasks = (List<Task>) response.getEntity();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals(1, tasks.size());
    }

    @Test
    public void testGetSingleTask() {
        Task mockTask = new Task();
        mockTask.setId(1);
        Long taskId = 1L;

        when(taskRepository.findById(taskId)).thenReturn(mockTask);

        Response response = taskController.getSingle(taskId);
        Task task = (Task) response.getEntity();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertNotNull(task);
        assertEquals(mockTask.getId(), task.getId());
    }

    @Test
    public void testCreateTask() {
        Task newTask = new Task();
        newTask.setTitle("New Task");

        doNothing().when(taskRepository).persist(newTask);

        Response response = taskController.create(newTask);

        assertEquals(Response.Status.CREATED.getStatusCode(), response.getStatus());
        verify(taskRepository, times(1)).persist(newTask);
    }

    @Test
    public void testDeleteTask() {
        Task mockTask = new Task();
        mockTask.setId(1);
        Long taskId = 1L;

        when(taskRepository.findById(taskId)).thenReturn(mockTask);
        doNothing().when(taskRepository).delete(mockTask);

        Response response = taskController.deleteTask(taskId);

        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());
        verify(taskRepository, times(1)).delete(mockTask);
    }
}
