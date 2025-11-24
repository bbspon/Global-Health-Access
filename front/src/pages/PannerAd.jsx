import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Badge,
  Image,
  Carousel,
} from "react-bootstrap";
import thia from "../assets/thia.png";
import bbscart from "../assets/bbscart.png";
import { MdWifiCalling2 } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
function PannerAd() {
  return (
    <>
      <div className="py-1 my-3"
        style={{
          backgroundImage:
            "url('https://www.chiltern-healthcare.co.uk/wp-content/uploads/2024/06/The-Power-of-Compassion-Fostering-Deeper-Connections-in-Care.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="d-flex align-items-start flex-column justify-content-center mt-4"
          style={{
            padding: "60px 40px",
            color: "white",
            width: "100%",
            height: "600px",
          }}
        >
          {/* Text Section */}
          <div
            style={{
              width: "50%",
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "15px 25px",
              borderRadius: "10px",
            }}
          >
            <h1
              className="text-black "
              style={{ fontSize: "50px", fontWeight: "600", lineHeight: "1" }}
            >
              Healthcare for Good Today, Tomorrow, Always
            </h1>

            <p style={{ marginTop: "15px", fontSize: "18px", color: "black" }}>
              Find trusted doctors, hospitals & health services near you.
            </p>
          </div>

          {/* Search Input Under Text (LEFT ALIGNED) */}
          <div
            style={{
              width: "50%",
              height: "40px",
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              padding: "15px 25px",
            }}
          >
            <input
              type="text"
              placeholder="Search for Doctors, Specialities and Hospitals"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                textAlign: "left",
              }}
            />
            <BiSearchAlt2 size={28} color="#0D6EFD" />
          </div>
        </div>
        {/* 🔥 Header Section with Carousel Background */}
        <Row
          className=" "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.22)",
          }}
        >
          <Col className="d-flex justify-content-center gap-3  ">
            <Button variant="none" size="sm" style={{ color: "black" }}>
              <div className="d-flex gap-2 align-items-center">
                <MdWifiCalling2 size={18} />
                <span>Request a Callback</span>
              </div>
            </Button>
            <Button
              variant="outline-success"
              size="sm"
              style={{ color: "black" }}
              className="border-0 flex gap-2 rounded-3 bg-green my-1 "
              onClick={() =>
                (window.location.href = "https://thiaworld.bbscart.com/")
              }
            >
              <img
                src={thia}
                alt="Thiaworld"
                style={{ height: "30px", objectFit: "contain" }}
              />
              <span
                style={{ transition: "color 0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "initial")}
              >
                Thiaworld Jewellery
              </span>
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              style={{ color: "black" }}
              className="border-0 flex gap-2 rounded-3 bg-yellow my-1 "
              onClick={() => (window.location.href = "https://bbscart.com/")}
            >
              <img
                src={bbscart}
                alt="BBSCart"
                style={{ height: "25px", objectFit: "contain" }}
              />
              <span
                style={{ transition: "color 0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "green")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "initial")}
              >
                BBSCart Online Shopping
              </span>
            </Button>
            <Button variant="none" size="sm" style={{ color: "black" }}>
              <div className="d-flex gap-2 align-items-center">
                <BsCalendar2Date />
                <span>Book an Appointment</span>
              </div>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PannerAd;
