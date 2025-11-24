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
import { BiSearchAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [query, setQuery] = useState("");
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

  const [selectedState, setSelectedState] = useState("");

  const statesList = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Maharashtra",
    "Delhi",
    "Punjab",
    "Gujarat",
  ];

  // Function to apply selected location
  const applyLocation = (state) => {
    setSelectedState(state);
    setOpenLocation(false);

    // 🔥 call your filter api or product filter logic here
    console.log("Location applied:", state);
  };

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
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center ">
            <div
              className="d-flex align-items-center mt-2 "
              style={{
                height: "60px", // keeps navbar height stable
                overflow: "hidden", // hides overflow of tall logos
              }}
            >
              {/* Logo Text */}
              <img
                src="/health.png"
                alt="Logo Text"
                style={{
                  height: "90px",
                  width: "120px",
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
                <NavDropdown.Item as={Link} to="/settlement-simulation">
                  Settlement Simultion
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
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center justify-content-end d-flex gap-2">
              <div>
                {/* SEARCH ICON */}
                <div
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <BiSearchAlt size={18} />
                </div>

                {/* SEARCH OVERLAY */}
                {open && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,0.6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 9999,
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        maxWidth: "650px",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "20px",
                      }}
                    >
                      {/* HEADER */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h3>Search Healthcare Products</h3>
                        <IoClose
                          size={24}
                          onClick={() => setOpen(false)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>

                      {/* SEARCH INPUT */}
                      <input
                        type="text"
                        placeholder="Search medicines, equipment, supplements..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px",
                          marginTop: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          fontSize: "14px",
                        }}
                      />

                      {/* ADVANCED FILTERS */}
                      <div style={{ marginTop: "20px" }}>
                        <label>Category</label>
                        <select className="form-control my-2">
                          <option>All</option>
                          <option>Medicines</option>
                          <option>Medical Equipment</option>
                          <option>Surgery & Tools</option>
                          <option>Supplements</option>
                          <option>Diagnostics</option>
                        </select>

                        <label>Brand</label>
                        <select className="form-control my-2">
                          <option>Any</option>
                          <option>Apollo</option>
                          <option>1mg</option>
                          <option>Dr Reddy’s</option>
                          <option>Pharmeasy</option>
                        </select>

                        <label>Price Range</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input
                            type="number"
                            className="form-control my-2"
                            placeholder="Min ₹"
                          />
                          <input
                            type="number"
                            className="form-control my-2"
                            placeholder="Max ₹"
                          />
                        </div>

                        <label>Availability</label>
                        <select className="form-control my-2">
                          <option>All</option>
                          <option>In Stock</option>
                          <option>Out of Stock</option>
                        </select>
                      </div>

                      {/* BUTTONS */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "10px",
                        }}
                      >
                        <button
                          className="btn btn-secondary"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={() => console.log("Searching for:", query)}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="none"
                size="sm"
                className="position-relative"
                ref={notifTarget}
                onClick={() => setShowNotif(!showNotif)}
              >
                <Bell size={15} />
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
                variant="none"
                size="sm"
                className="position-relative"
                as={Link}
                to="/cart"
              >
                <Cart size={15} />
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
                variant="none"
                onClick={toggleLanguage}
                title="Switch Language"
              >
                <Globe size={15} /> {language}
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
                        variant="none"
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
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* 🔍 LOCATION ICON + SELECTED STATE LABEL */}
                <div
                  onClick={() => setOpenLocation(!openLocation)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "1px 1px",
                    borderRadius: "10px",
                    background: "#f8f8f8",
                  }}
                >
                  <BiCurrentLocation size={22} />
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedState || "Select Location"}
                  </span>
                </div>

                {/* 📌 DROPDOWN BOX */}
                {openLocation && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: 0,
                      background: "#ffffff",
                      padding: "12px 14px",
                      width: "260px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      borderRadius: "14px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      zIndex: 1000,
                      border: "1px solid #f2f2f2",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {/* ✔ DYNAMIC HEADER */}
                    <h5
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "0 0 12px 0",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #f0f0f0",
                        color: "#222",
                      }}
                    >
                      {selectedState
                        ? `Selected: ${selectedState}`
                        : "Select Your State"}
                    </h5>

                    {/* 🌍 STATE LIST */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {statesList.map((state, index) => (
                        <li
                          key={index}
                          onClick={() => applyLocation(state)}
                          style={{
                            padding: "10px 8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#333",
                            borderRadius: "8px",
                            transition: "0.25s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#f4f4f4")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          {state}
                        </li>
                      ))}
                    </ul>
                  </div>
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
