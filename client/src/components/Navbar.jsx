import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, MapPin, Moon, Sun } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useStore } from "../context/StoreContext";

export default function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setFilters, darkMode, toggleDarkMode } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, search: searchQuery.trim() }));
    }
  };

  return (
    <>
      {/* Top bar - Amazon style */}
      <div className="bg-gray-900 text-white text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Deliver to User - City 12345</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:underline">Hello, sign in</Link>
            <Link to="/dashboard" className="hover:underline">Account & Lists</Link>
            <Link to="/dashboard" className="hover:underline">Returns & Orders</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-amazon-orange shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-white">amazon</div>
              <span className="text-xs text-white ml-1">.com</span>
            </Link>

            {/* Delivery location */}
            <div className="hidden lg:flex items-center gap-1 text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
              <MapPin className="w-4 h-4" />
              <div className="text-xs">
                <div>Deliver to</div>
                <div className="font-bold">User</div>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="flex">
                <select className="bg-gray-200 border border-gray-300 rounded-l px-3 py-2 text-sm">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Books</option>
                  <option>Home</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Amazon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border-t border-b border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amazon-yellow hover:bg-yellow-500 px-4 rounded-r flex items-center"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
              </form>
            </div>

            {/* Language selector */}
            <div className="hidden md:flex items-center text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
              <span className="text-sm">EN</span>
            </div>

            {/* Account & Lists */}
            <div className="hidden md:flex items-center text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
              <div className="text-xs">
                <div>Hello, sign in</div>
                <div className="font-bold flex items-center gap-1">
                  Account & Lists <span className="text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Returns & Orders */}
            <div className="hidden md:flex items-center text-white hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
              <div className="text-xs">
                <div>Returns</div>
                <div className="font-bold">& Orders</div>
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 text-white hover:bg-white/10 px-2 py-1 rounded relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amazon-yellow text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:block font-bold">Cart</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 text-white hover:bg-white/10 px-2 py-1 rounded"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-gray-800 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 py-2 overflow-x-auto">
              <Link to="/shop" className="hover:underline whitespace-nowrap">All</Link>
              <Link to="/deals" className="hover:underline whitespace-nowrap">Today's Deals</Link>
              <Link to="/collections" className="hover:underline whitespace-nowrap">Collections</Link>
              <Link to="/new" className="hover:underline whitespace-nowrap">New</Link>
              <Link to="/sale" className="hover:underline whitespace-nowrap">Sale</Link>
              <Link to="/about" className="hover:underline whitespace-nowrap">About</Link>
              <Link to="/shop" className="hover:underline whitespace-nowrap">Customer Service</Link>
              <Link to="/shop" className="hover:underline whitespace-nowrap">Registry</Link>
              <Link to="/shop" className="hover:underline whitespace-nowrap">Gift Cards</Link>
              <Link to="/shop" className="hover:underline whitespace-nowrap">Sell</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link to="/shop" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link to="/deals" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Deals
            </Link>
            <Link to="/collections" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Collections
            </Link>
            <Link to="/new" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              New
            </Link>
            <Link to="/sale" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Sale
            </Link>
            <Link to="/about" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link to="/dashboard" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Account
            </Link>
            <Link to="/login" className="block py-2 text-gray-800 hover:bg-gray-100 rounded px-3" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <button onClick={() => { setCartOpen(true); setMobileOpen(false); }} className="block w-full text-left py-2 text-gray-800 hover:bg-gray-100 rounded px-3">
              Cart ({cartCount})
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}