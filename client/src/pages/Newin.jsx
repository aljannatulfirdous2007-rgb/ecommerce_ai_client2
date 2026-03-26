import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, Star, ShoppingCart, Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Newin() {
  const { PRODUCTS, addToCart, wishlist, toggleWishlist, darkMode } = useStore();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  // Get newest products (last 8 products)
  const newProducts = PRODUCTS.slice(-8).reverse();

  // Notification types
  const notificationTypes = [
    {
      id: 1,
      type: "new_arrival",
      title: "New Product Alert!",
      message: "Check out our latest collection",
      icon: "🆕",
      color: "bg-blue-500"
    },
    {
      id: 2,
      type: "flash_sale",
      title: "Flash Sale!",
      message: "Up to 50% off on selected items",
      icon: "⚡",
      color: "bg-red-500"
    },
    {
      id: 3,
      type: "limited_stock",
      title: "Limited Stock!",
      message: "Only a few items left",
      icon: "⏰",
      color: "bg-orange-500"
    },
    {
      id: 4,
      type: "customer_favorite",
      title: "Customer Favorite",
      message: "Loved by our customers",
      icon: "⭐",
      color: "bg-yellow-500"
    }
  ];

  // Simulate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 5 seconds
        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const randomProduct = newProducts[Math.floor(Math.random() * newProducts.length)];

        const notification = {
          id: Date.now(),
          ...randomType,
          product: randomProduct,
          timestamp: new Date()
        };

        setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep only 5 recent
        setCurrentNotification(notification);
        setShowNotification(true);

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    }, 8000); // Check every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-8 h-8 text-amazon-orange" />
            </motion.div>
            <h1 className="text-4xl font-bold dark:text-white">What's New</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest arrivals, exclusive deals, and trending products.
            Never miss out on what's hot and new in our collection.
          </p>
        </motion.div>

        {/* Notification Bell & Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">Live Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get real-time updates on new products and deals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {notifications.length} notifications today
              </span>
              <button
                onClick={() => setNotifications([])}
                className="text-sm text-amazon-orange hover:text-orange-600 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notification Popup */}
        <AnimatePresence>
          {showNotification && currentNotification && (
            <motion.div
              initial={{ opacity: 0, y: -100, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.3 }}
              className="fixed top-24 right-4 z-50 max-w-sm"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${currentNotification.color} flex items-center justify-center text-white text-lg`}>
                      {currentNotification.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {currentNotification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {currentNotification.message}
                      </p>
                      {currentNotification.product && (
                        <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex items-center gap-2">
                            <img
                              src={currentNotification.product.img}
                              alt={currentNotification.product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <div>
                              <p className="text-xs font-medium text-gray-900 dark:text-white">
                                {currentNotification.product.name}
                              </p>
                              <p className="text-xs text-amazon-orange font-bold">
                                ${currentNotification.product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={dismissNotification}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-amazon-orange text-white text-sm py-1 rounded hover:bg-orange-600 transition">
                      View Details
                    </button>
                    <button className="px-3 py-1 text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Notifications List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Notifications Feed */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Recent Notifications</h2>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll notify you when new products arrive or special deals are available.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${notification.color} flex items-center justify-center text-white text-sm`}>
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        {notification.product && (
                          <div className="mt-3 flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <img
                              src={notification.product.img}
                              alt={notification.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.product.name}
                              </p>
                              <p className="text-sm text-amazon-orange font-bold">
                                ${notification.product.price}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* New Products Showcase */}
          <div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Latest Arrivals</h2>
            <div className="space-y-4">
              {newProducts.slice(0, 6).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-amazon-orange">${product.price}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-1 rounded ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-1 text-gray-400 hover:text-amazon-orange"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amazon-orange to-orange-600 rounded-lg p-8 text-center text-white"
        >
          <Bell className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Never Miss New Arrivals</h3>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded text-gray-900"
            />
            <button className="bg-amazon-yellow text-black px-6 py-2 rounded font-medium hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}