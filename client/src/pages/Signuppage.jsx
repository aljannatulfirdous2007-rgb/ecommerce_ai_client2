import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!form.phone.match(/^\+?[\d\s\-]{10,}/)) e.phone = "Enter a valid phone number";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    localStorage.setItem("signupData", JSON.stringify({ name: form.name, email: form.email }));
    setTimeout(() => navigate("/login"), 1800);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", icon: "✦", placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", icon: "◈", placeholder: "john@example.com" },
    { name: "password", label: "Password", type: showPassword ? "text" : "password", icon: "⬡", placeholder: "Min 8 characters", toggle: () => setShowPassword(!showPassword), isVisible: showPassword },
    { name: "confirmPassword", label: "Confirm Password", type: showConfirm ? "text" : "password", icon: "⬡", placeholder: "Repeat password", toggle: () => setShowConfirm(!showConfirm), isVisible: showConfirm },
    { name: "phone", label: "Phone Number", type: "tel", icon: "◉", placeholder: "+91 98765 43210" },
  ];

  return (
    <div className={`signup-root ${mounted ? "mounted" : ""}`}>
      <div className="signup-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="signup-split">
        <div className="signup-brand">
          <div className="brand-inner">
            <div className="brand-tag">NEW ARRIVALS 2025</div>
            <h1 className="brand-title">
              LUXE<br />
              <span>MARKET</span>
            </h1>
            <p className="brand-sub">
              Curated luxury. Delivered fast.<br />Join 2M+ shoppers worldwide.
            </p>
            <div className="brand-stats">
              {[["2M+", "Members"], ["150K+", "Products"], ["98%", "Satisfaction"]].map(([n, l]) => (
                <div className="stat" key={l}>
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
            <div className="brand-cards">
              {["FASHION", "TECH", "HOME", "BEAUTY"].map((c, i) => (
                <div className="brand-chip" key={c} style={{ animationDelay: `${i * 0.1 + 0.5}s` }}>{c}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="signup-form-wrap">
          <div className={`signup-card ${isSubmitting ? "submitting" : ""}`}>
            {isSubmitting ? (
              <div className="success-state">
                <div className="success-ring">
                  <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" /><polyline points="18,30 26,38 42,22" /></svg>
                </div>
                <h3>Account Created!</h3>
                <p>Redirecting to login…</p>
              </div>
            ) : (
              <>
                <div className="card-header">
                  <h2>Create Account</h2>
                  <p>Start your luxury shopping journey</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="fields-grid">
                    {fields.map((f, i) => (
                      <div
                        className={`field-group ${errors[f.name] ? "has-error" : ""} ${form[f.name] ? "has-value" : ""}`}
                        key={f.name}
                        style={{ animationDelay: `${i * 0.08 + 0.3}s` }}
                        onFocus={() => setStep(i)}
                      >
                        <label htmlFor={f.name}>
                          <span className="field-icon">{f.icon}</span>
                          {f.label}
                        </label>
                        <div className="input-wrap">
                          <input
                            id={f.name}
                            name={f.name}
                            type={f.type}
                            value={form[f.name]}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            autoComplete="off"
                          />
                          {f.toggle && (
                            <button type="button" className="eye-btn" onClick={f.toggle}>
                              {f.isVisible ? "◯" : "●"}
                            </button>
                          )}
                          <div className="input-line" />
                        </div>
                        {errors[f.name] && <span className="field-error">{errors[f.name]}</span>}
                      </div>
                    ))}
                  </div>

                  <div className="progress-dots">
                    {fields.map((_, i) => (
                      <span key={i} className={`dot ${i === step ? "active" : ""} ${form[fields[i].name] ? "filled" : ""}`} />
                    ))}
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Create My Account</span>
                    <span className="btn-arrow">→</span>
                  </button>

                  <p className="login-link">
                    Already have an account?{" "}
                    <button type="button" onClick={() => navigate("/login")}>Sign In</button>
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