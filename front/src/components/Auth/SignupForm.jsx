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

  // ---------------------------
  // LOAD GLOBAL COUNTRY LIST
  // ---------------------------
  useEffect(() => {
    const allCountries = getNames();
    setCountries(allCountries);
  }, []);

  // ---------------------------
  // LOAD ALL HOSPITALS FROM BACKEND
  // ---------------------------
  useEffect(() => {
    loadAllHospitals();
  }, []);

  const loadAllHospitals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/region/hospitals/all`
      );

      const hospitals = res.data?.hospitals || [];
      setAllHospitals(hospitals);
    } catch (err) {
      console.log("Hospital load error:", err);
    }
  };

  // ---------------------------
  // WHEN COUNTRY SELECTED → LOAD DB CITIES
  // ---------------------------
useEffect(() => {
  if (!country) {
    setCities([]);
    setCity("");
    return;
  }

  // 1. Find country object using exact match
  const allCountries = Country.getAllCountries();
  const selectedCountryObj = allCountries.find(
    (item) => item.name.toLowerCase() === country.toLowerCase()
  );

  if (!selectedCountryObj) {
    console.log("No matching country found for:", country);
    setCities([]);
    return;
  }

  // 2. Load global cities for selected country
  const cityData = City.getCitiesOfCountry(selectedCountryObj.isoCode);

  // 3. Convert to list of names
  const cityNames = cityData.map((c) => c.name);

  setCities(cityNames);
  setCity("");
}, [country]);

  // ---------------------------
  // WHEN CITY SELECTED → FILTER HOSPITALS
  // ---------------------------
  useEffect(() => {
    if (!city || !country) return;
    fetchFilteredHospitals();
  }, [city]);

  const fetchFilteredHospitals = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URI
        }/region/hospitals?country=${country}&city=${city}`
      );

      const data = res.data;

      if (Array.isArray(data)) {
        setFilteredHospitals(data);
      } else {
        setFilteredHospitals(data.hospitals || []);
      }
    } catch (err) {
      console.log("Hospital filter error:", err);
    }
  };

  // ---------------------------
  // VALIDATION
  // ---------------------------
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value.trim()) message = "Full name is required";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Enter a valid email";
        break;

      case "password":
        if (value.length < 6)
          message = "Password must be at least 6 characters";
        break;

      case "confirmPassword":
        if (value !== form.password) message = "Passwords do not match";
        break;

      case "phone":
        if (!/^[0-9]{10}$/.test(value))
          message = "Enter a valid 10-digit phone number";
        break;

      default:
        break;
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------
  // SUBMIT
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const finalPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      referralCode,
      createdFrom: "healthcare",
      country,
      city,
      hospitalId,
    };

    try {
      await signupUser(finalPayload);

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Signup failed",
      });
    }
  };

  // ---------------------------
  // RENDER UI
  // ---------------------------
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
          <label>Password</label>
          <div className="position-relative mb-2">
            <input
              name="password"
              className="form-control"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <label>Confirm Password</label>
          <div className="position-relative mb-2">
            <input
              name="confirmPassword"
              className="form-control"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}

          {/* PHONE */}
          <label>Phone Number</label>
          <input
            name="phone"
            className="form-control mb-2"
            value={form.phone}
            onChange={handleChange}
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

          {/* REFERRAL CODE */}
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
