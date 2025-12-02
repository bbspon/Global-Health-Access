import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCalendarDay } from "react-icons/bs";
import { GiStethoscope } from "react-icons/gi";
import { MdMonitorHeart } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f8ffff" }}>
      <section className="container mt-4">
        <div className="row align-items-center py-5">
          {/* LEFT SIDE (TEXT WITH BG) */}
          <div
            className="col-md-6 p-5"
            style={{
              background: "linear-gradient(to right, #ccf4ff, #e9faff)",
              borderRadius: "15px",
              textAlign: "left",
            }}
          >
            <h2 className="fw-bold">Designed for India, UAE and beyond</h2>

            <p className="mt-3" style={{ fontSize: "16px" }}>
              Doctor advancements in modern healthcare have transformed
              diagnosis, treatment, and patient care. With new technologies such
              as AI-driven diagnostics, robotic surgery, and telemedicine,
              doctors can detect illnesses earlier and treat patients with
              greater precision. Minimally invasive procedures and innovations
              like 3D-printed implants and stem-cell therapies reduce recovery
              time and improve outcomes. Doctors also play a crucial role in
              public health through vaccination programs, disease prevention,
              and emergency response during pandemics. Continuous medical
              education and global knowledge-sharing help them stay updated with
              emerging therapies and research. These advancements collectively
              create a smarter, more efficient, and patient-centric healthcare
              system.
            </p>
          </div>

          {/* RIGHT SIDE (IMAGE WITHOUT BG) */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://cdn.cpdonline.co.uk/wp-content/uploads/2022/09/13092522/Becoming-a-hospital-doctor.jpg"
              alt="Doctor"
              className="img-fluid"
              style={{ maxHeight: "400px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </section>

      {/* ============= TESTIMONIALS SECTION ============= */}
      <div className="container my-5 text-center">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span className="badge bg-dark text-light">EXPERIENCES</span>

          <div
            className="p-3 mt-3"
            style={{
              background: "#fff",
              borderRadius: "10px",
              width: "70%",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p className="mb-1" style={{ fontSize: "14px" }}>
              "I felt listened to and well cared for during my appointment.
              Outstanding service!"
            </p>

            <div className="badge bg-success mt-2">
              Sentiment: Very Positive
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {/* ============= BOOKING OPTIONS SECTION ============= */}
        <div className="container my-5 d-flex flex-column gap-4">
          <div className="row ">
            <div className="col-md-6">
              <div
                className="p-4 text-start shadow-sm gap-2 d-flex justify-content-between align-items-center"
                style={{
                  background: "#f9fffb",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/book-appointment")}
              >
                <div>
                  <h5 className="fw-bold">Book an Appointment</h5>
                  <p className="mb-1">With country’s leading experts</p>
                </div>

                <div>
                  <BsCalendarDay size={35} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="p-4 text-start shadow-sm d-flex justify-content-between align-items-center"
                style={{
                  background: "#eaffff",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <h5 className="fw-bold">Hospitals</h5>
                  <p className="mb-1">Health needs under one roof</p>
                </div>{" "}
                <div>
                  <GiStethoscope size={45} color="darkblue" />
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6">
              <div
                className="p-4 text-start shadow-sm d-flex justify-content-between align-items-center"
                style={{
                  background: "#f7efff",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <h5 className="fw-bold">Specialities</h5>
                  <p className="mb-1">Our expertise in healthcare</p>
                </div>
                <div>
                  <MdMonitorHeart size={35} style={{ color: "red" }} />
                </div>{" "}
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="p-4 text-start shadow-sm d-flex justify-content-between align-items-center "
                style={{
                  background: "#ffecec",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <h5 className="fw-bold">Doctors</h5>
                  <p className="mb-1">Top experts for your health</p>
                </div>
                <div>
                  <FaUserDoctor
                    size={35}
                    style={{ color: "rgb(255, 126, 0)" }}
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        {/* ============= SERVICES GRID SECTION ============= */}
        <section className="container my-5 mx-3">
          <h3 className="mb-4 fw-bold text-left">We can help you book</h3>

          <div className="row g-4">
            <div className="col-md-7">
              <div
                className="p-5 text-center shadow-sm"
                style={{
                  borderRadius: "15px",
                  background: "#ffffff",
                  minHeight: "180px",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "40px" }}>🩺</div>
                <h5 className="mt-3 fw-bold">Health Checkups</h5>
              </div>
            </div>

            <div className="col-md-5">
              <div
                className="p-5 text-center shadow-sm"
                style={{
                  borderRadius: "15px",
                  background: "#ffffff",
                  minHeight: "180px",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "40px" }}>📄</div>
                <h5 className="mt-3 fw-bold">Tests & Services</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesGrid;
