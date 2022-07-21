import { useUser } from "./useUser";
import { Navigate } from "react-router-dom";

// Check for logged in user for protected routes
export const PrivateRoute = ({children}) => {
  // Confirm logged in user with 'useUser' function
  const user = useUser();

  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};