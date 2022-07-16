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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              quisquam in consequatur provident voluptas perspiciatis nam
              ratione, ipsam, blanditiis asperiores unde. Laboriosam hic veniam
              laudantium consequuntur! Quia quasi id error, corrupti ipsam amet
              molestias natus illum impedit animi aperiam tempora minus ea cum
              a. Dignissimos aspernatur eveniet nulla et eius.
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
