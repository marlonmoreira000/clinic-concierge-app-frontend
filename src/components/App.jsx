import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import Nav from "./Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Bookings from "./pages/Bookings";
import MakeBooking from "./pages/MakeBooking";
import MyAppointments from "./pages/MyAppointments";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientProfile from "./pages/PatientProfile";
import Appointment from "./pages/SetAppointment";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route path="/bookings/:id" element={<MakeBooking />} />
        <Route
          path="/my-appointments"
          element={
            <PrivateRoute>
              <MyAppointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
