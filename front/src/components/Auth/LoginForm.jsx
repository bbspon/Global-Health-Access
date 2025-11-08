// components/Auth/LoginForm.jsx
import { useState, useContext } from "react";
import { loginUser } from "../../services/authAPI";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error as user types
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await loginUser(form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://jclis.com/wp-content/uploads/2023/02/THE-HEALTH-INSURANCE-MARKETPLACE-EXPLAINED-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh", // ensures full height coverage
          width: "100%", // ensures full width>
        }}
      >
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10 col-md-8 col-lg-6 col-xl-4">
              <form
                onSubmit={handleSubmit}
                className="p-5 border rounded shadow"
                style={{
                  width: "580px",
                  maxWidth: "90%",
                  backgroundColor: "#bbc6d188",
                }}
              >
                <h3 className="mb-4 fw-bold fs-4 text-center">Login</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <label
                  htmlFor="email"
                  className="form-label text-start w-100 fs-6"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  className="form-control mb-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div className="mb-3 position-relative">
                  <label
                    htmlFor="password"
                    className="form-label text-start w-100 fs-6"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-control"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#555",
                    }}
                  >
                    {showPassword ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </span>
                </div>
                <button className="btn btn-primary w-100 mt-2">Login</button>

                <div className="text-center mt-4">
                  <span className="fs-6">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-decoration-none fw-bold">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default LoginForm;
