import { useState, useEffect } from "react";
import { useToken } from "./useToken";

// Sets the user based on token in client browser
export const useUser = () => {
  // First, find current token using useToken state
  const [token] = useToken();

  // Get the payload from token - convert token to usable JSON object
  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    // If no token exists, no user value should exist, as the token is the identifier for authenticated users
    if (!token) return null;

    // Otherwise return payload from token, identifying user
    return getPayloadFromToken(token);
  });

  // If token changes, update user: makes sure user + token are in-sync whenever either is accessed
  useEffect(() => {
    // Again, if no token exists, no user value should exist. This effectively "logs out" a user when their token is removed/expires
    if (!token) {
      setUser(null);
    }
    // Otherwise, update user value to reflect value of updated token
    else {
      setUser(getPayloadFromToken(token));
    }
    // Make sure this hook fires whenever the token changes
  }, [token]);

  return user
};
