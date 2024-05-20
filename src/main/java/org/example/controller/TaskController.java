package org.example.controller;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.entity.Task;
import org.example.repository.TaskRepository;
import java.util.List;
import java.util.logging.Logger;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskController {
    private static final Logger LOGGER = Logger.getLogger(TaskController.class.getName());

    @Inject
    TaskRepository taskRepository;

    @GET
    @RolesAllowed("user")
    public Response listAll() {
        LOGGER.info("Received request to list all tasks");
        List<Task> tasks = taskRepository.listAllTasks();
        return Response.ok(tasks).build();
    }

    @GET
    @Path("{id}")
    @RolesAllowed("user")
    public Response getSingle(@PathParam("id") Long id) {
        LOGGER.info(String.format("Received request to get task with ID: %d", id));
        Task task = taskRepository.findById(id);
        if (task != null) {
            LOGGER.info(String.format("Task found: %s", task));
            return Response.ok(task).build();
        } else {
            LOGGER.warning(String.format("Task with ID %d not found", id));
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Transactional
    @RolesAllowed("user")
    public Response create(Task task) {
        LOGGER.info(String.format("Received POST request with Task: %s", task));
        try {
            taskRepository.persist(task);
            LOGGER.info("Task successfully created");
            return Response.status(Response.Status.CREATED).entity(task).build();
        } catch (Exception e) {
            LOGGER.severe("Error creating task: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PUT
    @Path("{id}")
    @Transactional
    @RolesAllowed("user")
    public Response update(@PathParam("id") Long id, Task updateTask) {
        Task task = taskRepository.findById(id);
        if (task != null) {
            task.setTitle(updateTask.getTitle());
            task.setDescription(updateTask.getDescription());
            task.setDueDate(updateTask.getDueDate());
            task.setStatus(updateTask.getStatus());
            taskRepository.getEntityManager().merge(task); // Use merge instead of persist
            return Response.ok(task).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    @Transactional
    @RolesAllowed("user")
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = taskRepository.deleteById(id);
        if (deleted) {
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
