import { useState } from "react";
import { signupUser } from "../../services/authAPI";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    createdFrom: "healthcare",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Validation logic for each field
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value.trim()) message = "Full name is required.";
        else if (value.trim().length < 3)
          message = "Name must be at least 3 characters.";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) message = "Email address is required.";
        else if (!emailRegex.test(value))
          message = "Enter a valid email address.";
        break;

      case "password":
        const passRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!value.trim()) message = "Password is required.";
        else if (!passRegex.test(value))
          message =
            "Password must be 8+ chars with uppercase, lowercase, number & special character";
        break;

      case "phone":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) message = "Phone number is required.";
        else if (!phoneRegex.test(value))
          message = "Enter a valid 10-digit phone number.";
        break;

      case "role":
        if (!value.trim()) message = "Please select a user role.";
        break;

      default:
        break;
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // validate as user types
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    try {
      await signupUser(form);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Signup failed" });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center rounded-5"
      style={{
        backgroundImage:
          "url('https://jclis.com/wp-content/uploads/2023/02/THE-HEALTH-INSURANCE-MARKETPLACE-EXPLAINED-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh", // ensures full height coverage
        width: "100%", // ensures full width
      }}
    >
      <div
        className="p-5 border rounded shadow"
        style={{
          width: "550px",
          maxWidth: "90%",
          height: "750px",
          backgroundColor: "#bbc6d188",
        }}
      >
        <h3
          style={{
            fontStyle: "italic",
            fontSize: "22px",
            borderBottom: "1px solid #ccc",
            padding: "5px ",
            borderRadius: "8px",
            backgroundColor: "#94c2ecd0",
          }}
        >
          Create Your Account
        </h3>
        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="row">
            {/* Name */}
            <div className="col-md-6  mb-3">
              <label className="form-label text-start d-block text-start">
                Full Name
              </label>
              <input
                className="form-control my-2 "
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger d-block ">{errors.name}</small>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label d-block text-start text-nowrap ">
                Email Address
              </label>
              <input
                className="form-control my-2"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />{" "}
              {errors.email && (
                <small className="text-danger d-block ">{errors.email}</small>
              )}
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="form-label mt-2 d-block text-start">
              Password
            </label>
            <div className="position-relative">
              <input
                className="form-control my-2"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOffSharp className="text-danger" />
                ) : (
                  <IoEyeOutline />
                )}
              </span>
            </div>
            {errors.password && (
              <small className="text-danger text-wrap ">
                {errors.password}
              </small>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="form-label mt-2 d-block text-start">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                className="form-control my-2"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <IoEyeOffSharp className="text-danger" />
                ) : (
                  <IoEyeOutline />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger text-center">
                {errors.confirmPassword}
              </small>
            )}
          </div>

          {/* Phone */}
          <label className="form-label mt-2 d-block text-start">
            Phone Number
          </label>
          <input
            className="form-control my-2"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}

          {/* Role */}
          <label className="form-label mt-2 d-block text-start">
            Select Role
          </label>
          <select
            className="form-control my-2"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">-- Choose Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="ngo">NGO</option>
            <option value="corporate">Corporate</option>
          </select>
          {errors.role && <small className="text-danger">{errors.role}</small>}

          <button className="btn btn-success w-100 mt-4">Signup</button>

          <div className="text-center mt-4">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="fw-bold text-decoration-none">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
