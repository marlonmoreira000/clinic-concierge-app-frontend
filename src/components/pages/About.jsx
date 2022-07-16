import Header from "../Header";
import img from "/src/assets/about-us.jpg"

const About = () => {
  return (
    <>
      <Header text="About us." />
      <div>
        <div className="py-12 bg-[#f0edeb] flex flex-col justify-center items-center">
          <div className="p-6">
            <img
              className="w-[400px] md:w-[550px] shadow-lg rounded-md"
              src={img}
              alt="/"
            />
          </div>
          <div className="max-w-[600px] p-4">
            <p>
              Without exception, we’re here for you, and go out of our way to
              make sure your experience is welcoming, comfortable, and
              clinically excellent. Our practice is more than just bricks and
              mortar, it is the proliferation and expression of an idea: an idea
              built on the tenancy of strong family values and an unwavering
              commitment to you and your family’s well-being.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
