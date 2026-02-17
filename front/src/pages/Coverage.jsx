import React from "react";
import earth from "../assets/earth.png";
import { useNavigate, Link } from "react-router-dom";

import { serviceTopics } from "../data/serviceTopics.jsx";

import { BsArrowRightShort } from "react-icons/bs";

const Coverage = () => {
  const navigate = useNavigate();
;

  const services = serviceTopics.map((item) => ({
    ...item,
    path: `/services/${item.slug}`,
  }));

  // 🔥 Handle Click Navigation
  const handleServiceClick = (path, title) => {
    console.log("Selected Service:", title);
    navigate(path);
  };

  return (
    <>
      {/* Top Section */}
      <div
        className="p-2"
        style={{
          background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)",
          border: "1px solid #B2DFDB",
          borderRadius: "15px",
        }}
      >
        <div className="d-flex flex-row align-items-center justify-content-center">
          <img
            src={earth}
            alt="Earth illustration"
            style={{ width: "40px" }}
            className="earth-spin"
          />
          <h2 className="ms-3">Designed for India, UAE, and Beyond</h2>
        </div>

        <p className="text-skyblue text-center mt-2">
          Our model is built to scale. With offline + online integration and
          non-insurance legal compliance, we're ready to expand across emerging
          markets.
        </p>
      </div>

      <div
        className="my-5"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/indian-doctor-hospital-medic-specialist-health-30s-successful-man-generative-ai_789795-544.jpg')", // change to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          padding: "80px 20px",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "32px" }}>
          We care whenever you need it
        </h2>

        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          We are a 24x7 call center to help you with all your health needs
        </p>
        <Link to="/book-appointment">
          <button
            style={{
              backgroundColor: "#003366",
              color: "white",
              padding: "12px 30px",
              borderRadius: "50px",
              border: "none",
              marginTop: "20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Book an appointment
          </button>
        </Link>
      </div>
      {/* 🔥 Service Cards - Dynamic */}
      <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center">
        {services.map((s, i) => (
          <div
            key={i}
            className="service-card "
            style={{ background: s.bg }}
            onClick={() => handleServiceClick(s.path, s.title)}
          >
            {s.icon}
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
            <BsArrowRightShort size={30} />
          </div>
        ))}
      </div>
      {/* CSS */}
      <style>
        {`
.earth-spin {
  animation: spin 8s linear infinite;
}

.service-card {
  width: 210px;
  border: 1px solid #B2DFDB;
  border-radius: 12px;
  padding: 10px 20px;
  text-align: start;
  transition: 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(0,0,0,0.15);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`}
      </style>
    </>
  );
};

export default Coverage;
