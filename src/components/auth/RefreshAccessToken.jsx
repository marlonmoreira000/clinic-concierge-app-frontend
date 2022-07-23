import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";

const instance = axios.create({
  baseURL: "https://clinic-concierge.herokuapp.com/api/v1",
});

axios.interceptors.response.use(
  // Do nothing on successful response - accessToken isn't expired
  (response) => {
    return response;
  },
  async (error) => {
    const navigate = useNavigate();
    const [token, setToken] = useToken();
    const originalConfig = error.config;
    if (err.response) {
      // if error status indicates authorisation error (suggesting token expired) AND this is the first attempt to refresh accessToken
      if (error.response.status === 403 && !originalConfig._retry) {
        // Set 'retry' to true to prevent infinite loop
        originalConfig._retry = true;

        // Send request to refreshToken route in server
        await axios.post(
          "https://clinic-concierge.herokuapp.com/api/v1/refreshToken"
        );

        // If request successful, update token and return success message
        if (!response.data.error) {
          message.success(response.data.message);
          setToken(response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } else {
          // If unsuccessful, display error message and redirect to login
          message.error("Something went wrong, redirecting to login");
          navigate("/login");
        }
      }
    }
  }
);
