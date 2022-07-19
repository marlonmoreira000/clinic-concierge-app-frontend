import Hero from "../Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="w-full text-center bg-[#f0edeb]">
        <button className="bg-[#23375d] hover:bg-[#334b88] text-gray-100 font-bold py-3 px-6 rounded-md my-[6rem]">
          Make a Booking
        </button>
      </div>
    </>
  );
};

export default Home;
