import { useState, useEffect } from "react";
import { signupUser } from "../../services/authAPI";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import { getNames } from "country-list";
import { Country, City } from "country-state-city";

const SignupForm = () => {
  const navigate = useNavigate();

  // Dropdown states
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [hospitalId, setHospitalId] = useState("");

  const [referralCode, setReferralCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    createdFrom: "healthcare",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // LOAD COUNTRY LIST
  useEffect(() => {
    const allCountries = getNames();
    setCountries(allCountries);
  }, []);

  // LOAD ALL HOSPITALS
  useEffect(() => {
    loadAllHospitals();
  }, []);

  const loadAllHospitals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/region/hospitals/all`
      );
      setAllHospitals(res.data?.hospitals || []);
    } catch (err) {
      console.log("Hospital load error:", err);
    }
  };

  // COUNTRY → LOAD CITIES
  useEffect(() => {
    if (!country) {
      setCities([]);
      setCity("");
      return;
    }

    const countryList = Country.getAllCountries();
    const selectedCountry = countryList.find(
      (c) => c.name.toLowerCase() === country.toLowerCase()
    );

    if (!selectedCountry) {
      setCities([]);
      return;
    }

    const allCities = City.getCitiesOfCountry(selectedCountry.isoCode);
    setCities(allCities.map((c) => c.name));
    setCity("");
  }, [country]);

  // CITY SELECTED → FILTER HOSPITALS
  useEffect(() => {
    if (!city) return;
    filterHospitals();
  }, [city]);

  const filterHospitals = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URI
        }/region/hospitals?country=${country}&city=${city}`
      );

      if (Array.isArray(res.data)) {
        setFilteredHospitals(res.data);
      } else {
        setFilteredHospitals(res.data.hospitals || []);
      }
    } catch (err) {
      console.log("Hospital filter error:", err);
    }
  };

  // VALIDATION
  const validateField = (name, value) => {
    let msg = "";

    switch (name) {
      case "name":
        if (!value.trim()) msg = "Full name is required";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          msg = "Enter valid email";
        break;

      case "password":
        if (value.length < 6) msg = "Password must be at least 6 characters";
        break;

      case "confirmPassword":
        if (value !== form.password) msg = "Passwords do not match";
        break;

      case "phone":
        if (!/^[0-9]{10}$/.test(value)) msg = "Enter valid 10-digit phone";
        break;
    }

    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateForm = () =>
    Object.keys(form).reduce((acc, key) => {
      const err = validateField(key, form[key]);
      if (err) acc[key] = err;
      return acc;
    }, {}) || {};

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...form,
      referralCode,
      country,
      city,
      hospitalId,
    };

    try {
      await signupUser(payload);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        backgroundImage:
          "url('https://jclis.com/wp-content/uploads/2023/02/THE-HEALTH-INSURANCE-MARKETPLACE-EXPLAINED-1.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="p-5 border rounded shadow"
        style={{ width: "550px", backgroundColor: "#bbc6d188" }}
      >
        <h3 className="mb-3 text-center">Create Your Account</h3>

        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* NAME + EMAIL */}
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Full Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            <div className="col-md-6 mb-2">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
          </div>
          {/* PASSWORD */}
          <div className="mb-2">
            <div
              className="position-relative"
              style={{ minHeight: "2.75rem" }} // Fix height to avoid icon shift
            >
              <input
                name="password"
                className="form-control password-input"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="new-password"
                style={{ paddingRight: "3rem" }}
              />
              <button
                type="button"
                className="password-toggle btn btn-link p-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "1.25rem",
                  userSelect: "none",
                  padding: 0,
                  zIndex: 2,
                }}
              >
                {showPassword ? <IoEyeOffSharp /> : <IoEyeOutline />}
              </button>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-2">
            <div
              className="position-relative"
              style={{ minHeight: "2.75rem" }} // Fix height here too
            >
              <input
                name="confirmPassword"
                className="form-control password-input"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                autoComplete="new-password"
                style={{ paddingRight: "3rem" }}
              />
              <button
                type="button"
                className="password-toggle btn btn-link p-0"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "1.25rem",
                  userSelect: "none",
                  padding: 0,
                  zIndex: 2,
                }}
              >
                {showConfirm ? <IoEyeOffSharp /> : <IoEyeOutline />}
              </button>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          {/* PHONE */}
          <label>Phone Number</label>
          <input
            name="phone"
            className="form-control mb-2"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
          />
          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}

          {/* COUNTRY */}
          <label>Select Country</label>
          <select
            className="form-control mb-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">-- Choose Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* CITY */}
          <label>Select City</label>
          <select
            className="form-control mb-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!country}
          >
            <option value="">-- Choose City --</option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>

          {/* HOSPITAL */}
          <label>Select Hospital</label>
          <select
            className="form-control mb-2"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            disabled={!city}
          >
            <option value="">-- Choose Hospital --</option>
            {filteredHospitals.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
          </select>

          {/* REFERRAL */}
          <label>Referral ID</label>
          <input
            type="text"
            className="form-control mb-3"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />

          <button className="btn btn-success w-100 mt-2">Signup</button>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="fw-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
