import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Nav";
import Home from "./pages/Home"
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
