// components/Auth/LoginForm.jsx
import { useState, useContext } from "react";
import { loginUser, sendOtp, verifyOtp } from "../../services/authAPI";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState("password"); // "password" or "otp"

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error as user types
  };

  const validateForm = () => {
    if (loginMode === "password") {
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
    }

    // OTP mode: only phone required, validation done before send
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const res = await loginUser(form);

    // Save token separately
    localStorage.setItem("token", res.data.token);

    // Save user session
    login({
      user: res.data.user,
      token: res.data.token,
    });

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  }
};

const handleSendOtp = async (e) => {
  e.preventDefault();
  if (!phone) {
    setError("Please enter your phone number.");
    return;
  }

  try {
    await sendOtp({ phone });
    setOtpSent(true);
    setError("");
  } catch (err) {
    setError(err.response?.data?.message || "Could not send OTP.");
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if (!phone || !otpCode) {
    setError("Phone and OTP are required.");
    return;
  }

  try {
    const res = await verifyOtp({ phone, otp: otpCode });
    localStorage.setItem("token", res.data.token);
    login({ user: res.data.user, token: res.data.token });
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "OTP verification failed.");
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
                onSubmit={loginMode === "password" ? handleSubmit : otpSent ? handleVerifyOtp : handleSendOtp}
                className="p-5 border rounded shadow"
                style={{
                  width: "580px",
                  maxWidth: "90%",
                  backgroundColor: "#bbc6d188",
                }}
              >
                <h3 className="mb-4 fw-bold fs-4 text-center">Login</h3>

                {/* mode switch */}
                <div className="d-flex justify-content-center mb-3">
                  <button
                    type="button"
                    className={`btn btn-sm me-2 ${loginMode === "password" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => {
                      setLoginMode("password");
                      setOtpSent(false);
                      setError("");
                    }}
                  >
                    Email/Password
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${loginMode === "otp" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => {
                      setLoginMode("otp");
                      setError("");
                    }}
                  >
                    Phone OTP
                  </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {loginMode === "password" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="phone"
                      className="form-label text-start w-100 fs-6"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="form-control mb-3"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    {otpSent && (
                      <>
                        <label
                          htmlFor="otp"
                          className="form-label text-start w-100 fs-6"
                        >
                          OTP
                        </label>
                        <input
                          id="otp"
                          className="form-control mb-3"
                          name="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          required
                        />
                      </>
                    )}
                    <button className="btn btn-primary w-100 mt-2">
                      {otpSent ? "Verify OTP" : "Send OTP"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default LoginForm;
