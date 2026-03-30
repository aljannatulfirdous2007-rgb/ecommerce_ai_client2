import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const buttonVariants = {
  hover: { scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(201,168,76,0.4)" },
  tap: { scale: 0.98 }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    const saved = localStorage.getItem("signupData");
    if (saved) {
      const { email } = JSON.parse(saved);
      setForm((f) => ({ ...f, email }));
      setPrefilled(true);
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 1) e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    localStorage.setItem("isLoggedIn", "true");
    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <div className={`login-root ${mounted ? "mounted" : ""}`}>
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-grid" />
      </div>

      <div className="login-container">
        {/* Left panel */}
        <div className="login-visual">
          <div className="visual-content">
            <div className="logo-mark">LM</div>
            <h1>Welcome<br /><span>Back.</span></h1>
            <p>Your curated collection awaits. Log in and continue your luxury journey.</p>
            <div className="feature-list">
              {[
                { icon: "◈", text: "Exclusive member deals" },
                { icon: "◉", text: "Real-time order tracking" },
                { icon: "✦", text: "Personalized recommendations" },
              ].map(({ icon, text }) => (
                <div className="feature-item" key={text}>
                  <span className="feat-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="visual-deco">
              <div className="deco-ring deco-ring-1" />
              <div className="deco-ring deco-ring-2" />
              <div className="deco-ring deco-ring-3" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="login-form-side">
          <div className={`login-card ${isSubmitting ? "submitting" : ""}`}>
            {isSubmitting ? (
              <div className="login-success">
                <div className="loader-ring">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="26" />
                    <circle className="spin-arc" cx="30" cy="30" r="26" />
                  </svg>
                </div>
                <h3>Signing you in…</h3>
                <p>Preparing your dashboard</p>
              </div>
            ) : (
              <>
                <div className="login-header">
                  <h2>Sign In</h2>
                  {prefilled && (
                    <div className="welcome-badge">
                      ✦ Welcome back! Email prefilled from signup
                    </div>
                  )}
                  <p>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="login-fields">
                    {/* Email */}
                    <div className={`lf-group ${errors.email ? "has-error" : ""} ${form.email ? "has-value" : ""}`}>
                      <label htmlFor="email">
                        <span>◈</span> Email Address
                      </label>
                      <div className="lf-input-wrap">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                        {form.email && <span className="check-mark">✓</span>}
                        <div className="lf-line" />
                      </div>
                      {errors.email && <span className="lf-error">{errors.email}</span>}
                    </div>

                    {/* Password */}
                    <div className={`lf-group ${errors.password ? "has-error" : ""}`}>
                      <label htmlFor="password">
                        <span>⬡</span> Password
                      </label>
                      <div className="lf-input-wrap">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="lf-eye"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "◯" : "●"}
                        </button>
                        <div className="lf-line" />
                      </div>
                      {errors.password && <span className="lf-error">{errors.password}</span>}
                    </div>
                  </div>

                  <div className="login-meta">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span className="checkmark" />
                      Remember me
                    </label>
                    <button type="button" className="forgot-link">Forgot password?</button>
                  </div>

                  <button type="submit" className="login-btn">
                    <span>Continue to Shop</span>
                    <span className="login-arrow">→</span>
                  </button>

                  <div className="login-divider"><span>or</span></div>

                  <div className="social-btns">
                    {["G  Google", "◈  Apple"].map((s) => (
                      <button type="button" className="social-btn" key={s}>{s}</button>
                    ))}
                  </div>

                  <p className="signup-prompt">
                    New to LUXE MARKET?{" "}
                    <button type="button" onClick={() => navigate("/signup")}>Create account</button>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}