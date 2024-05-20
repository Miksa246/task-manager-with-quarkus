package org.example.util;

import io.smallrye.jwt.build.Jwt;

import java.util.Set;

public class JwtUtils {

    public static String generateToken(String username, Set<String> roles) {
        return Jwt.issuer("http://localhost:8080")
                .upn(username)
                .groups(roles)
                .claim("sub", username)
                .expiresAt(System.currentTimeMillis() / 1000 + 3600)
                .sign();
    }
}
