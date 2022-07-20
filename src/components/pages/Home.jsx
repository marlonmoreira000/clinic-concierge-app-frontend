import Hero from "../Hero";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="w-full text-center bg-[#f0edeb]">
        <div><Toaster /></div>
        <button class="bg-[#23375d] hover:bg-[#334b88] text-gray-100 font-bold py-3 px-6 rounded-md my-[6rem]">
          Make a Booking
        </button>
      </div>
    </>
  );
};

export default Home;
