import Header from "../Header";
import doctorimage0 from "/src/assets/doctorimage0.jpg";
import doctorimage1 from "/src/assets/doctorimage1.jpg";
import doctorimage2 from "/src/assets/doctorimage2.jpg";
import React, { useState, useEffect } from "react";

const getDoctorImage = (index) => {
  if (index === 0) {
    return doctorimage0;
  } else if (index === 1) {
    return doctorimage1;
  } else {
    return doctorimage2;
  }
}

const Doctors = () => {
  const [doctors, setDoctors] = useState(false);

  useEffect(() => {
    // get doctors info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/doctors/", {
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        console.log("data", data);
        console.log("doctors", doctors)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header text="Doctors." />
      <div>
        <div className="p-12 flex flex-wrap justify-center">
          {doctors ? doctors.map((doctor, index) => {
            return (
              <div key={index} className="p-4 w-[350px]">
                <img className="w-[300px] shadow-lg rounded-md" src={doctor ? getDoctorImage(index) : "...loading"} alt="" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{doctor ? "Dr." + (doctor.first_name + " " + doctor.last_name) : "...loading"}</h3>
                  <p>
                    <b>Gender: </b> {doctor ? doctor.gender : "...loading"}
                  </p>
                  <p>
                    <b>Experience: </b>{doctor ? doctor.experience + " years" : "...loading"}
                  </p>
                  <p>
                    <b>Speciality: </b>{doctor ? doctor.speciality : "...loading"}
                  </p>
                  <p>
                    <b>Bio: </b>{doctor ? doctor.bio : "...loading"}
                  </p>
                </div>
              </div>)
          }) : "..loading"}
        </div>
      </div>
    </>
  );
};

export default Doctors;
