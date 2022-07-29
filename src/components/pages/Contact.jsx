import Header from "../Header";
import img from "/src/assets/map.png";

const Contact = () => {
  return (
    <>
      <Header text="Contact." />
      <div>
        <div className="py-12 flex flex-col items-center">
          <div className="text-center p-8 max-w-[700px]">
            <h3 className="text-xl font-bold pb-4">Details</h3>
            <p>
              We're available for appointments and walk-ins seven days a week.
              With ample curbside parking, and nearby local transport options,
              we're easy to reach, and waiting to serve our community.
              Appointments are available online, or over the phone.
            </p>
          </div>
          <div className="p-8">
            <img className="w-[700px]" src={img} alt="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
