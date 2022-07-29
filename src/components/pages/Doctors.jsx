import Header from "../Header";
import doctor1 from "/src/assets/doctor1.jpg";
import doctor2 from "/src/assets/doctor2.jpg";
import doctor3 from "/src/assets/doctor3.jpg";

const Doctors = () => {
  return (
    <>
      <Header text="Doctors." />
      <div>
        <div className="p-12 flex flex-wrap justify-center">
          <div className="p-4 w-[350px]">
            <img
              className="w-[300px] shadow-lg rounded-md"
              src={doctor1}
              alt=""
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Zimmak</h3>
              <p>
                Dr Zimmak has been serving the community as a doctor for over two decades. She is a founding clinician at our practice, with a particular focus on women's health issues.
              </p>
            </div>
          </div>

          <div className="p-4 w-[350px]">
            <img
              className="w-[300px] shadow-lg rounded-md"
              src={doctor2}
              alt=""
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Yousaf</h3>
              <p>
                Dr Yousaf brings 15 years of experience in General Practice to our clinic. He has a particular focus on supporting the health needs of young families.
              </p>
            </div>
          </div>

          <div className="p-4 w-[350px]">
            <img
              className="w-[300px] shadow-lg rounded-md"
              src={doctor3}
              alt=""
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Distel</h3>
              <p>
                Dr Distel has been practicing medicine for 5 years, with a focus on mens' sexual and mental health issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
