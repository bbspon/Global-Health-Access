// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-light text-muted py-4 mt-5 border-top">
//       <Container>
//         <Row>
//           <Col md={4}>
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li>
//                 <Link to="/about">About Us</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>
//               <li>
//                 <Link to="/faqs">FAQs</Link>
//               </li>
//               <li>
//                 <Link to="/terms">Terms of Use</Link>
//               </li>
//               <li>
//                 <Link to="/privacy">Privacy Policy</Link>
//               </li>
//             </ul>
//           </Col>

//           <Col md={4}>
//             <h5>Support</h5>
//             <p>Email: support@bbscart.com</p>
//             <p>WhatsApp: +91-98765-43210</p>
//           </Col>

//           <Col md={4}>
//             <h5>Disclaimer</h5>
//             <p className="small">
//               BBS Health Access is not a health insurance product. It is a
//               regulated health membership program.
//             </p>
//             {/* Optional: Social Icons */}
//           </Col>
//         </Row>
//         <div className="text-center small mt-3">
//           © {new Date().getFullYear()} BBSCART. All rights reserved.
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { BiSolidArrowToTop } from "react-icons/bi";
export default function BBSCARTFooter() {
  return (
    <footer
      className="text-white p-5 mt-5"
      style={{ backgroundColor: "#0a2540", textAlign: "left" }} // Hospital calm dark blue
    >
      <Container fluid>
        <Row className="gx-5 gy-4">
          {" "}
          {/* Adjust horizontal (gx) and vertical (gy) gaps */}
          {/* Left Column: Contact Info */}
          <Col md={3}>
            <h5 className="fw-bold mb-3">BBS Global Health Access</h5>
            <p className="mb-1">
              5, 2nd Cross,2nd Floor, Bharathy Street,
              <br /> Anna Nagar, Puducherry, 605005
            </p>
            <p className="mb-1 ">
              <MdPhone className="me-2" />
              <a href="#" className="text-white text-decoration-none">
                0413 291 5916
              </a>
            </p>
            <p className="mb-1">
              <MdOutlinePhoneAndroid className="me-2" />
              <a href="#" className="text-white text-decoration-none">
                +91 9600729596
              </a>
            </p>
            <p>
              <MdEmail className="me-2" />
              info@bbscart.com
            </p>
            <div className="d-flex gap-3 mt-2 fs-5">
              <a href="#" style={{ color: "#1DA1F2" }}>
                <FaTwitter />
              </a>
              <a href="#" style={{ color: "#C13584" }}>
                <FaInstagram />
              </a>
              <a href="#" style={{ color: "#0077B5" }}>
                <FaLinkedin />
              </a>
              <a href="#" style={{ color: "#FF0000" }}>
                <FaYoutube />
              </a>
              <a href="#" style={{ color: "#1877F2" }}>
                <FaFacebook />
              </a>
            </div>
          </Col>
          {/* Center Left: Links */}
          <Col md={3}>
            <h6 className="text-uppercase text-info mb-1">
              Education & Training
            </h6>
            <p className="mb-2">Fellowships, internships, wellness careers</p>

            <h6 className="text-uppercase text-info mt-2 mb-1">Careers</h6>
            <p className="mb-2">Explore BBSCART openings</p>

            <h6 className="text-uppercase text-info mt-2 mb-1">
              News & Events
            </h6>
            <p className="mb-2">Latest platform updates</p>

            <h6 className="text-uppercase text-info mt-2 mb-1">Ways to Give</h6>
            <p className="mb-0">Support health access for all</p>
          </Col>
          {/* Center Right: Departments */}
          <Col md={3}>
            <h6 className="text-uppercase text-info mb-2">Health Services</h6>
            <ul className="list-unstyled mb-0">
              <li>Primary Care</li>
              <li>Cardiology</li>
              <li>Diagnostics</li>
              <li>Oncology</li>
              <li>Pediatrics</li>
              <li>Neurology</li>
              <li>Mental Health</li>
            </ul>
          </Col>
          {/* Right: Legal & Partner Info */}
          <Col md={3}>
            <h6 className="text-uppercase text-info mb-2">Partner Network</h6>
            <p className="mb-2">Hospitals • Labs • Pharmacies • NGOs</p>

            <h6 className="text-uppercase text-info mt-2 mb-2">
              Compliance & Policy
            </h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Privacy & Security
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Data Rights & Access
                </a>
              </li>
            </ul>

            <div className="mt-3">
              <p className="small text-muted mb-0">
                © 2025 BBSCART Health Corporation
              </p>
              <p className="small text-muted mb-0">A Unified Access Network</p>
            </div>
          </Col>
        </Row>

        {/* Scroll to Top */}
        <div className="text-end mt-4">
          <a href="#top" className=" text-white text-decoration-none px-3">
            <BiSolidArrowToTop size={20} /> Top
          </a>
        </div>
      </Container>
    </footer>
  );
}
