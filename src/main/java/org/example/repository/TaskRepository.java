package org.example.repository;

import org.example.entity.Task;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public interface TaskRepository extends PanacheRepository<Task> {
    // Custom queries can be added here if necessary
}

