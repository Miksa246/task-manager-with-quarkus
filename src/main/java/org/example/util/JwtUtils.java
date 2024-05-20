package org.example.util;

import io.smallrye.jwt.build.Jwt;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class JwtUtils {

    public static String generateToken(String username, Set<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", roles);

        return Jwt.claims(claims)
                .issuer("my-issuer")
                .sign();
    }
}
