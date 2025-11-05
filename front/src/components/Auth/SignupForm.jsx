import { useState } from "react";
import { signupUser } from "../../services/authAPI";
import { useNavigate, Link } from "react-router-dom";

const SignupForm = () => {
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
            "Password must be 8+ chars with uppercase, lowercase, number & special character.";
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
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="p-5 border rounded shadow"
        style={{ width: "500px", margin: "auto" }}
      >
        <h3
          className="mb-4"
          style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "30px" }}
        >
          Create Your Account
        </h3>

        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Name */}
        <label className="form-label">Full Name</label>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}

        {/* Email */}
        <label className="form-label mt-2">Email Address</label>
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        {/* Password */}
        <label className="form-label mt-2">Password</label>
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}

        {/* Phone */}
        <label className="form-label mt-2">Phone Number</label>
        <input
          className="form-control my-2"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <small className="text-danger">{errors.phone}</small>}

        {/* Role */}
        <label className="form-label mt-2">Select Role</label>
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
  );
};

export default SignupForm;
