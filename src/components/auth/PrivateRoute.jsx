import { Redirect, Route } from "react-router-dom";
import { useUser } from "./useUser";

// Check for logged in user for protected routes
export const PrivateRoute = (props) => {
  // Confirm logged in user with 'useUser' function
  const user = useUser();

  // If no user confirmed, redirect to login, preventing access to protected routes
  if (!user) return <Redirect to="/login" />;

  // Otherwise, once logged in user confirmed, proceed to protected route
  return <Route {...props} />;
};
