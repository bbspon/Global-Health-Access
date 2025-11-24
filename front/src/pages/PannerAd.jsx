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
import HomeBanner from "../assets/HomeBanner.JPG"; // adjust path as needed

function PannerAd() {
  return (
    <>
      <div
        className="py-1 my-3"
        style={{
          backgroundImage: `url(${HomeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "450px",
          display: "flex",
          alignItems: "flex-end", // 👈 pushes items to bottom vertically
        }}
      >
        <div
          style={{
            padding: "40px",
            width: "50%",
            color: "white",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              height: "45px",
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "10px",
              padding: "0px 15px",
              width: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)", // 👈 Strong highlight shadow
              border: "2px solid #6193deff", // 👈 Blue highlight border
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
                fontSize: "16px",
              }}
            />
            <BiSearchAlt2 size={26} color="#0D6EFD" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PannerAd;
