import { useNavigate } from "react-router-dom";
import Hero from "../Hero";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const nav = useNavigate();
  const handleButtonClick = (e) => {
    nav("/bookings");
  };

  return (
    <>
      <Hero />
      <div className="w-full text-center bg-[#f0edeb]">
        <div>
          <Toaster />
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-[#23375d] hover:bg-[#334b88] text-gray-100 font-bold py-3 px-6 rounded-md my-[6rem]"
        >
          Make a Booking
        </button>
      </div>
    </>
  );
};

export default Home;
