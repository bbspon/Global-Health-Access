import React from 'react'
import doctor from '../assets/doctor.png'
import lock from '../assets/lock.png'
import custom from '../assets/customers.png'
import chat from '../assets/chat.png'

function VisionPoints() {
  return (
    <>
      <div className="container py-5">

        {/* Heading */}
        <h1 className="text-center fw-bold mb-4">
          Why You Should Trust Us? <br /> Get to Know About Us
        </h1>

        {/* Feature Cards */}
        <div className="d-flex flex-wrap justify-content-center gap-4 m-2">
          {[
            { img: doctor, title: "All Specialist" },
            { img: lock, title: "Private & Secure" },
            { img: custom, title: "Million Customers" },
            { img: chat, title: "Chatbot Support" }
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded p-4 text-center shadow-sm"
              style={{
                width: "300px",
                transition: "0.3s",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0px 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              <img src={item.img} width={60} alt="" className="mb-3" />
              <h4 className="fw-bold">{item.title}</h4>
              <p className="text-muted">
                You can reach out to 3500+ doctors from 80+ specialties, who are
                experienced in telemedicine.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-WIDTH SERVICES SECTION */}
      <div className="w-100 mt-5" style={{ padding: "0 30px" }}>
        <h3 className="fw-bold mb-3">Services Covered</h3>

        <div className="d-flex flex-wrap gap-3 w-100">
          <img
            style={{
              borderRadius: "12px",
              objectFit: "cover",
              width: "48%",
              height: "260px",
            }}
            src="https://static.vecteezy.com/system/resources/previews/026/839/429/non_2x/doctor-in-lab-coat-with-arms-crossed-on-hospital-interior-background-medical-concept-medical-information-search-concept-disease-treatment-concept-insurance-concept-photo.jpg"
            alt=""
          />

          <img
            style={{
              borderRadius: "12px",
              objectFit: "cover",
              width: "48%",
              height: "260px",
            }}
            src="https://static.vecteezy.com/system/resources/previews/023/740/386/large_2x/medicine-doctor-with-stethoscope-in-hand-on-hospital-background-medical-technology-healthcare-and-medical-concept-photo.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default VisionPoints
