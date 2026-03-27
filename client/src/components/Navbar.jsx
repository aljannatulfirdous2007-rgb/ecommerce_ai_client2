import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, HelpCircle } from "lucide-react";
import { useStore } from "../context/StoreContext";
import CartDrawer from "./CartDrawer";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar({ cartCount = 0 }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Deals', path: '/deals' },
    { name: 'Collections', path: '/collections' },
    { name: 'New', path: '/new' },
    { name: 'Sale', path: '/sale' },
    { name: 'About', path: '/about' },
    ...(user ? [] : [{ name: 'FAQ', path: '/faq' }]),
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-rose-900/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text text-transparent group-hover:animate-pulse transition-all">
                LuxeShop
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 mx-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-lg font-medium text-slate-300 hover:text-rose-400 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text hover:text-rose-300 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-rose-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/dashboard"
                  className="relative text-lg font-medium text-slate-300 hover:text-rose-400 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text hover:text-rose-300 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-rose-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-3 rounded-2xl bg-slate-900/50 hover:bg-rose-500/20 backdrop-blur-sm border border-slate-800/50 hover:border-rose-500/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-rose-500/20 group"
              >
                <ShoppingCart className="w-6 h-6 text-slate-400 group-hover:text-rose-400 transition-all duration-300" />
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white text-xs rounded-2xl w-7 h-7 flex items-center justify-center font-bold shadow-lg animate-pulse"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {user ? (
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white backdrop-blur-sm border border-rose-500/50 shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                >
                  Login
                </motion.button>
              )}
              
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

