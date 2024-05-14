package org.example.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.example.entity.Task;
import org.jboss.logging.Logger;

import java.util.List;

@ApplicationScoped
public class TaskRepository implements PanacheRepository<Task> {
    private static final Logger LOGGER = Logger.getLogger(TaskRepository.class.getName());

    public List<Task> listAllTasks() {
        LOGGER.debug("Fetching all tasks from database");
        List<Task> tasks = listAll();
        LOGGER.debug("Tasks fetched: " + tasks.size());
        return tasks;
    }
}