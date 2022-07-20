import Header from "../Header";
import img from "/src/assets/about-us.jpg";

const Doctors = () => {
  return (
    <>
      <Header text="Doctors." />
      <div>
        <div className="p-12 flex flex-wrap justify-center">
          <div className="p-4 w-[350px]">
            <img className="w-[300px] shadow-lg rounded-md" src={img} alt="" />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Clooney</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam, odio ut! Obcaecati maiores ipsa eligendi alias magnam
                amet dicta quibusdam officia illo dolore quaerat laborum, labore
                at, repellendus voluptas! Adipisci, aliquam repellendus minus
                doloremque voluptate iusto, repudiandae ex officiis tenetur
                asperiores quibusdam tempora ratione dolorum et fugiat,
                molestiae non at?
              </p>
            </div>
          </div>

          <div className="p-4 w-[350px]">
            <img className="w-[300px] shadow-lg rounded-md" src={img} alt="" />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Clooney</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam, odio ut! Obcaecati maiores ipsa eligendi alias magnam
                amet dicta quibusdam officia illo dolore quaerat laborum, labore
                at, repellendus voluptas! Adipisci, aliquam repellendus minus
                doloremque voluptate iusto, repudiandae ex officiis tenetur
                asperiores quibusdam tempora ratione dolorum et fugiat,
                molestiae non at?
              </p>
            </div>
          </div>

          <div className="p-4 w-[350px]">
            <img className="w-[300px] shadow-lg rounded-md" src={img} alt="" />
            <div className="p-4">
              <h3 className="text-lg font-bold">Dr. Clooney</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam, odio ut! Obcaecati maiores ipsa eligendi alias magnam
                amet dicta quibusdam officia illo dolore quaerat laborum, labore
                at, repellendus voluptas! Adipisci, aliquam repellendus minus
                doloremque voluptate iusto, repudiandae ex officiis tenetur
                asperiores quibusdam tempora ratione dolorum et fugiat,
                molestiae non at?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
