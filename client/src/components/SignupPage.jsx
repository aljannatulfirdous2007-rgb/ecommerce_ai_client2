import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, CheckCircle } from "lucide-react";

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

  const fields = [
    { name: "name", label: "Full Name", icon: User, placeholder: "John Doe" },
    { name: "email", label: "Email", icon: Mail, placeholder: "john@example.com" },
    { name: "password", label: "Password", icon: Lock, placeholder: "Min 8 chars", toggle: true },
    { name: "confirmPassword", label: "Confirm Password", icon: Lock, placeholder: "Repeat password", toggle: true },
    { name: "phone", label: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateField = (name) => {
    const value = form[name];
    if (name === "name" && !value.trim()) return "Name is required";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
    if (name === "password" && value.length < 8) return "Min 8 characters";
    if (name === "confirmPassword" && value !== form.password) return "Passwords don't match";
    if (name === "phone" && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) return "Invalid phone";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach(f => {
      const err = validateField(f.name);
      if (err) newErrors[f.name] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStep(0);
      return;
    }

    setIsSubmitting(true);
    // Simulate API
    await new Promise(r => setTimeout(r, 2000));
    localStorage.setItem("user", JSON.stringify(form));
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-dark-900 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl animate-[float_4s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 bg-grid-slate-800/20 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:50px_50px] opacity-50" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left: Brand */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center"
        >
          <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-gold-500/20 backdrop-blur-sm px-6 py-2 rounded-xl border border-gold-500/30 mb-8"
            >
              <span className="text-gold-400 font-semibold uppercase tracking-wider text-sm">2025 Luxury Collection</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent leading-tight mb-6"
            >
              Luxe <span className="block lg:inline text-gold-400">Marketplace</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-400 mb-12 leading-relaxed"
            >
              Join 2M+ discerning shoppers. Curated luxury, delivered flawlessly.
            </motion.p>

            <motion.div 
              className="grid grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { num: "2M+", label: "Members" },
                { num: "150K+", label: "Products" },
                { num: "98%", label: "Satisfaction" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.num}</div>
                  <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {["FASHION", "TECH", "HOME", "BEAUTY", "JEWELS"].map((cat, i) => (
                <motion.span
                  key={cat}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/70 hover:shadow-lg transition-all duration-300"
                >
                  {cat}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center"
        >
          <motion.div 
            className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-10 shadow-2xl"
            animate={isSubmitting ? { scale: [1, 1.02, 1] } : {}}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-20"
                >
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-4">
                    Welcome Aboard!
                  </h2>
                  <p className="text-slate-400 text-lg">Account created successfully. Redirecting to login...</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
                      Create Account
                    </h1>
                    <p className="text-slate-400 text-lg">Join luxury shopping in moments</p>
                  </div>

                  <div className="space-y-5">
                    {fields.map((field, idx) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`space-y-2 ${errors[field.name] ? 'shake' : ''}`}
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                          <field.icon className="w-4 h-4 text-indigo-400" />
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            name={field.name}
                            type={field.name.includes('password') ? (field.name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirm ? 'text' : 'password')) : field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className={`w-full px-5 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 text-lg focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-300 pr-12 peer ${
                              errors[field.name] 
                                ? 'border-red-500/70 ring-2 ring-red-500/30 shake' 
                                : form[field.name] 
                                  ? 'border-indigo-500/60 ring-1 ring-indigo-500/20' 
                                  : ''
                            }`}
                          />
                          {field.toggle && (
                            <button
                              type="button"
                              onClick={() => field.name === 'password' ? setShowPassword(v => !v) : setShowConfirm(v => !v)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        {errors[field.name] && (
                          <motion.p 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-red-400 text-sm flex items-center gap-1 pl-1"
                          >
                            <CheckCircle className="w-4 h-4" fill="currentColor" />
                            {errors[field.name]}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <input id="terms" type="checkbox" className="w-4 h-4 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500 bg-slate-800" />
                      <label htmlFor="terms" className="text-slate-400 select-none cursor-pointer">
                        Agree to Terms
                      </label>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white py-5 px-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-indigo-500/30 focus:ring-4 focus:ring-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Create Luxury Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-all duration-200 hover:underline"
                    >
                      Already have account? Sign In →
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
