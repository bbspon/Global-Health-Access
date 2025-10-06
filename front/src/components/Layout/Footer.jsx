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

export default function BBSCARTFooter() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container fluid="md">
        <Row>
          {/* Left Column: Contact Info */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">BBSCART Health Access</h5>
            <p>
              55 Life Wellness Avenue
              <br />
              Bangalore, India 560001
            </p>
            <p>
              <a href="#" className="text-info text-decoration-none">
                Find a Location
              </a>
            </p>
            <p>
              <a href="#" className="text-info text-decoration-none">
                Contact Us
              </a>
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3 fs-5">
              <a href="#" style={{ color: "#1DA1F2" }}>
                {" "}
                {/* Twitter Blue */}
                <FaTwitter />
              </a>
              <a href="#" style={{ color: "#C13584" }}>
                {" "}
                {/* Instagram Gradient simplified to main pink */}
                <FaInstagram />
              </a>
              <a href="#" style={{ color: "#0077B5" }}>
                {" "}
                {/* LinkedIn Blue */}
                <FaLinkedin />
              </a>
              <a href="#" style={{ color: "#FF0000" }}>
                {" "}
                {/* YouTube Red */}
                <FaYoutube />
              </a>
              <a href="#" style={{ color: "#1877F2" }}>
                {" "}
                {/* Facebook Blue */}
                <FaFacebook />
              </a>
            </div>
          </Col>

          {/* Center Left: Links */}
          <Col md={3} className="mb-4">
            <h6 className="text-uppercase text-info">Education & Training</h6>
            <p>Fellowships, internships, wellness careers</p>

            <h6 className="text-uppercase text-info mt-3">Careers</h6>
            <p>Explore BBSCART openings</p>

            <h6 className="text-uppercase text-info mt-3">News & Events</h6>
            <p>Latest platform updates</p>

            <h6 className="text-uppercase text-info mt-3">Ways to Give</h6>
            <p>Support health access for all</p>
          </Col>

          {/* Center Right: Departments */}
          <Col md={3} className="mb-4">
            <h6 className="text-uppercase text-info">Health Services</h6>
            <ul className="list-unstyled">
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
            <h6 className="text-uppercase text-info">Partner Network</h6>
            <p>Hospitals • Labs • Pharmacies • NGOs</p>

            <h6 className="text-uppercase text-info mt-3">
              Compliance & Policy
            </h6>
            <ul className="list-unstyled">
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

            <div className="mt-4">
              <p className="small text-muted">
                © 2025 BBSCART Health Corporation
              </p>
              <p className="small text-muted">A Unified Access Network</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll to Top */}
      <div className="text-center mt-4">
        <a
          href="#top"
          className="btn btn-outline-light btn-sm rounded-pill px-3"
        >
          ⬆ Top
        </a>
      </div>
    </footer>
  );
}
