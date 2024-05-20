package org.example.controller;

import org.example.util.JwtUtils;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.HashSet;
import java.util.Set;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthController {

    @POST
    @Path("/login")
    public Response login(UserCredentials credentials) {
        // Validate user credentials (this is just a simple example)
        if ("user".equals(credentials.getUsername()) && "password".equals(credentials.getPassword())) {
            Set<String> roles = new HashSet<>();
            roles.add("user");

            String token = JwtUtils.generateToken(credentials.getUsername(), roles);
            return Response.ok(token).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
        }
    }

    public static class UserCredentials {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
