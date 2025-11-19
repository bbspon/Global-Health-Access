import React, { useState, useRef } from "react";
import {
  Navbar,
  Nav,
  Button,
  NavDropdown,
  Container,
  Badge,
  Overlay,
  Popover,
  ListGroup,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Cart, Globe } from "react-bootstrap-icons";
import { FaUserAlt } from "react-icons/fa";
import { IoLogoXing } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
const Header = () => {
  const location = useLocation();
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  const username = bbsUserData?.user.name;
  const [cartCount, setCartCount] = useState(2);
  const [notifications, setNotifications] = useState(3);
  const [language, setLanguage] = useState("EN");
  const [showNotif, setShowNotif] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const closeTimeout = useRef(null);
  const navigate = useNavigate();
  const notifTarget = useRef(null);
  const accountRef = useRef(null);
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setAccountOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay closing by 500ms
    closeTimeout.current = setTimeout(() => {
      setAccountOpen(false);
    }, 500);
  };
  const handleLogout = () => {
    localStorage.removeItem("bbsUser");
    navigate("/login");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "हि" : "EN"));
  };

  const notificationList = [
    { title: "Appointment confirmed", time: "2 mins ago" },
    { title: "Lab report uploaded", time: "1 hour ago" },
    { title: "Reminder: OPD at 5 PM", time: "Today" },
  ];

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <Navbar expand="lg" className="px-3">
        <Container fluid className="px-0">
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2"
          >
            <div
              className="d-flex align-items-center"
              style={{
                height: "65px", // keeps navbar height stable
                overflow: "hidden", // hides overflow of tall logos
              }}
            >
              {/* Logo Icon */}
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  height: "100px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />

              {/* Logo Text */}
              <img
                src="/logo-text.png"
                alt="Logo Text"
                style={{
                  height: "150px",
                  marginLeft: "2px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center gap-1">
              <Nav.Link as={Link} to="/" onClick={() => handleLinkClick("/")}>
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/plans"
                onClick={() => handleLinkClick("/plans")}
              >
                Plans
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => handleLinkClick("/about")}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/hospital"
                onClick={() => handleLinkClick("/hospital")}
              >
                Health Partners
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/plan-comparison"
                onClick={() => handleLinkClick("/plan-comparison")}
              >
                Compare Plans
              </Nav.Link>
              <NavDropdown title="More Services" id="services-nav">
                <NavDropdown.Item as={Link} to="/plans-landing">
                  Health Access Plan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Wellness-tracker">
                  Wellness Store
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/loyalty-reward">
                  Special Offers
                </NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/health-access/remedies">
                  Remedies
                </NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to="/virtual-health">
                  Virtual Health
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/book-appointment">
                  Book Appointment
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/uae-insurance-integration">
                  Insurance (UAE)
                </NavDropdown.Item>
              </NavDropdown>
              {/* 🔔 Notification Button with Popover */}
              <Button
                variant="outline-secondary"
                size="sm"
                className="position-relative"
                ref={notifTarget}
                onClick={() => setShowNotif(!showNotif)}
              >
                <Bell size={16} />
                {notifications > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-20 translate-middle"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Overlay
                target={notifTarget.current}
                show={showNotif}
                placement="bottom-end"
                rootClose
                onHide={() => setShowNotif(false)}
              >
                <Popover className="shadow-sm" style={{ minWidth: "250px" }}>
                  <Popover.Header as="h5">Notifications</Popover.Header>
                  <Popover.Body
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                  >
                    {notificationList.length === 0 ? (
                      <div className="text-muted text-center">
                        No new notifications
                      </div>
                    ) : (
                      <ListGroup variant="flush">
                        {notificationList.map((note, idx) => (
                          <ListGroup.Item key={idx}>
                            {note.title}
                            <br />
                            <small className="text-muted">{note.time}</small>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                    <div className="text-end mt-2">
                      <Button
                        size="sm"
                        variant="link"
                        onClick={() => {
                          setShowNotif(false);
                          navigate("/hospital/notifications ");
                        }}
                      >
                        See All →
                      </Button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay>
              <Button
                variant="outline-secondary"
                size="sm"
                className="position-relative"
                as={Link}
                to="/cart"
              >
                <Cart size={16} />
                {cartCount > 0 && (
                  <Badge
                    bg="primary"
                    pill
                    className="position-absolute top-0 start-20 translate-middle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline-dark"
                onClick={toggleLanguage}
                title="Switch Language"
              >
                <Globe size={16} /> {language}
              </Button>
              {/* Account / Login/Register */}
              <div className="position-relative" ref={accountRef}>
                {!token ? (
                  <>
                    <div
                      className="position-relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Button
                        size="sm"
                        variant="outline-dark"
                        className="me-3 d-flex align-items-center gap-1"
                      >
                        <FaUserAlt className="me-1" /> Account
                      </Button>

                      {accountOpen && (
                        <div
                          className="position-absolute bg-white text-black shadow rounded  d-flex flex-column "
                          style={{
                            top: "110%", // positions below the button
                            left: -5,
                            bottom: "-10",
                            width: "100%",
                            zIndex: 50,
                            border: "2px solid #ccc",
                          }}
                        >
                          <Link
                            to="/login"
                            className="d-flex align-items-center justify-content-start justify-center text-decoration-none
                             px-2 py-2 bg-orange-100 hover:bg-orange-500 gap-2 text-black rounded"
                          >
                            <IoLogoXing size={20} /> Login
                          </Link>
                          <Link
                            to="/signup"
                            className="d-flex align-items-center justify-content-start justify-center text-decoration-none
                             px-2 py-2 bg-orange-100 hover:bg-orange-500 gap-2 text-black rounded"
                          >
                            <GiArchiveRegister size={20} /> Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <NavDropdown
                    title={`Hi, ${username || "User"}`}
                    id="user-nav"
                  >
                    <NavDropdown.Item as={Link} to="/user">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/myplan">
                      My Plans
                    </NavDropdown.Item>

                    <NavDropdown.Item as={Link} to="/orders">
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
