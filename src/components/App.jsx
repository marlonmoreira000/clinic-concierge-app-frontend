import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Bookings from "./pages/Bookings";
import MakeBooking from "./pages/MakeBooking";
import MyAppointments from "./pages/MyAppointments";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:id" element={<MakeBooking />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
