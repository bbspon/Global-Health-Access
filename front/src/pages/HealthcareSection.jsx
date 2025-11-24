import React from "react";
import { RiArrowRightUpFill } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaTablets } from "react-icons/fa";
const HealthcareSection = () => {
  return (
    <>
      <div className="container-fluid py-5">
        {/* ---- Top Section ---- */}
        <div className="row align-items-center px-5 mb-5">
          {/* Left Blue Block (Overlay boxes) */}
          <div className="col-md-6 d-flex justify-content-center">
            <div
              className="blue-box-outer"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/187044567/photo/children-dressed-in-medical-professional-uniform-at-hospital-clinic-hz.jpg?s=612x612&w=0&k=20&c=SD6g18BL2FwmPQ_iqUHsgLD93lvVITfgsHSKfm-PfOg=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                className="blue-box-inner"
                width="460px"
                height="320px"
                src="https://media.istockphoto.com/id/187044567/photo/children-dressed-in-medical-professional-uniform-at-hospital-clinic-hz.jpg?s=612x612&w=0&k=20&c=SD6g18BL2FwmPQ_iqUHsgLD93lvVITfgsHSKfm-PfOg="
                alt=""
              />
            </div>
          </div>

          {/* Right Text Section */}
          <div className="col-md-6">
            <h2 className="fw-bold">
              Designed for India, UAE <br /> and beyond
            </h2>
            <p className="mt-3 fs-5">
              Our model is built to scale. <br />
              With offline + online integration <br />
              and non-insurance legal compliance, <br />
              we're ready to expand across emerging markets.
            </p>
          </div>
        </div>

        {/* ---- Bottom Feature Cards ---- */}
        <div className="row g-4 px-5 mb-5">
          {/* Card 1 */}
          <div className="col-md-3">
            <div
              className="feature-card card-blue text-white p-4 rounded-4 h-100"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/premium-vector/abstract-soft-blue-background-with-dynamic-waves-shape_1023432-535.jpg?w=2000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h4 className="fw-bold">
                24/7 <br /> Medicine
              </h4>
              <img
                src="https://png.pngtree.com/png-clipart/20240701/original/pngtree-indian-doctor-woman-smiling-at-camera-png-image_15456626.png" // Replace with actual image
                alt="doctor"
                className="img-fluid mt-4"
              />
                <div className="pt-3 text-start  ">
              <RiArrowRightUpFill className="d-flex justify-content-center align-items-start bg-white rounded-circle p-2 " size={45} color="black" /> </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-3">
            <div
              className="feature-card card-green text-white p-4 rounded-4 h-100"
              style={{
                backgroundImage:
                  "url('https://wallpapercave.com/wp/FOyu6CV.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h4 className="fw-bold">
                Find the <br /> Best Doctor
              </h4>
              <img
                src="https://pngimg.com/uploads/doctor/doctor_PNG16006.png"
                alt="doctor"
                className="img-fluid mt-4"
              />
           <div className="pt-3 text-start  ">
               <RiArrowRightUpFill className="d-flex justify-content-center align-items-start bg-white rounded-circle p-2 " size={45} color="black"/>
           </div>
            </div>
          </div>

          {/* Card 3 (Wide) */}
          <div className="col-md-6">
            <div className="d-flex flex-row align-items-center card-darkblue text-white p-5 rounded-4 h-100">
             <div className="text-center">
                 <h3 className="fw-bold">
                Connecting You to <br /> Better Health.
              </h3>
              <p className="mt-3">
                Immediate care for life’s unexpected moments, delivered with
                speed.
              </p>
             </div>

              <div className="d-flex gap-5 mt-4">
                <div>
                  <FaHandshakeSimple className=" bg-white rounded-circle p-2 " size={60} color="black"/>
                  <p className="mt-2 small">Advanced care, Trusted hands.</p>
                </div>

                <div>
          <FaTablets className=" bg-white rounded-circle p-2 " size={60} color="black"/>
                  <p className="mt-2 small">Gentle medicine, Strong results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .blue-box-outer {
  width: 100%;
  max-width: 480px;
  height: auto;
  aspect-ratio: 4 / 3; /* keeps shape responsive */
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.blue-box-inner {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 90%;
  height: 90%;
  border-radius: 12px;
  object-fit: cover;
}

.blue-box-inner img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-darkblue {
  background-color: #2957b7;
}
  /* Responsive text center on mobile */
@media (max-width: 768px) {
  .row.px-5 {
    padding: 0 !important;
  }

  .blue-box-outer {
    max-width: 100%;
  }

  .card-darkblue {
    text-align: center;
    flex-direction: column !important;
  }

  .card-darkblue .d-flex {
    justify-content: center;
  }
}
`}
      </style>
    </>
  );
};

export default HealthcareSection;
