import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { ShoppingCart, Heart, Package, User, LogOut, DollarSign, TrendingUp, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { cart, wishlist, user, logout } = useStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 24,
    totalSpent: 2849.99,
    pendingOrders: 3,
    recentActivity: 12
  });

  useEffect(() => {
    // Simulate fetching user stats
    const timer = setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalOrders: Math.floor(Math.random() * 50) + 20,
        totalSpent: (Math.random() * 5000 + 1000).toFixed(2)
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const recentOrders = [
    { id: "#12345", item: "Obsidian Watch", date: "2 days ago", status: "Delivered", amount: "$249.99" },
    { id: "#12346", item: "Leather Tote", date: "5 days ago", status: "Shipped", amount: "$89.00" },
    { id: "#12347", item: "Gold Serum", date: "1 week ago", status: "Delivered", amount: "$32.00" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-900/20 to-purple-900/20">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-rose-900/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-xl text-slate-400">Manage your account, track orders & save more 💖</p>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-3 ml-auto md:ml-0"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 hover:border-rose-500/70 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Cart Items</p>
                <p className="text-3xl font-black bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">{cart.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 hover:border-rose-500/70 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Wishlist</p>
                <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{wishlist.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 hover:border-rose-500/70 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Orders</p>
                <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{stats.totalOrders}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 hover:border-rose-500/70 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Spent</p>
                <p className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">${stats.totalSpent}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Orders */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <Package className="w-8 h-8 text-rose-400" />
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">Recent Orders</h2>
                <p className="text-slate-500">{stats.pendingOrders} pending • {stats.recentActivity} recent activities</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 hover:border-rose-500/50 hover:shadow-rose-500/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-mono text-sm text-slate-500">#{order.id}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200">{order.item}</h3>
                      <p className="text-sm text-slate-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-rose-400">{order.amount}</span>
                    <Link to="/orders" className="text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors">View Details →</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-8 space-y-6"
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-6 text-center">
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-4 rounded-2xl font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <TrendingUp className="w-5 h-5" />
                Track Orders
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-2xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-4 rounded-2xl font-semibold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <DollarSign className="w-5 h-5" />
                Payment Methods
              </motion.button>
            </div>

            {/* User Info */}
            <div className="pt-6 border-t border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200">{user?.email}</p>
                  <p className="text-sm text-slate-500">Premium Member</p>
                </div>
              </div>
              <Link to="/profile" className="w-full block text-center text-rose-400 hover:text-rose-300 font-medium transition-colors py-2 bg-rose-500/10 rounded-xl border border-rose-500/30 hover:bg-rose-500/20">
                Edit Profile →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

