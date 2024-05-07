package org.example.service;

import org.example.entity.Task;
import org.example.repository.TaskRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.inject.Inject;

@ApplicationScoped
public class TaskService {

    @Inject
    TaskRepository taskRepository;

    @Transactional
    public void createTask(Task task) {
        taskRepository.persist(task);
    }

    // Additional methods for update, delete, etc.
}
