import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Clock, Percent, ShoppingCart, Heart, Star, Zap } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Sale() {
  const { PRODUCTS, addToCart, wishlist, toggleWishlist, darkMode } = useStore();
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 42 });
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  // Create sale products with discounts
  const saleProducts = PRODUCTS.map(product => ({
    ...product,
    originalPrice: product.price,
    discount: Math.floor(Math.random() * 50) + 10, // 10-60% discount
    price: Math.round(product.price * (1 - (Math.floor(Math.random() * 50) + 10) / 100) * 100) / 100,
    saleType: ['flash', 'clearance', 'seasonal'][Math.floor(Math.random() * 3)]
  })).sort((a, b) => b.discount - a.discount);

  // Filter products based on active tab
  const filteredProducts = saleProducts.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'flash') return product.saleType === 'flash';
    if (activeTab === 'clearance') return product.saleType === 'clearance';
    if (activeTab === 'seasonal') return product.saleType === 'seasonal';
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Sales', count: saleProducts.length },
    { id: 'flash', label: 'Flash Sale', count: saleProducts.filter(p => p.saleType === 'flash').length },
    { id: 'clearance', label: 'Clearance', count: saleProducts.filter(p => p.saleType === 'clearance').length },
    { id: 'seasonal', label: 'Seasonal', count: saleProducts.filter(p => p.saleType === 'seasonal').length }
  ];

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
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Tag className="w-8 h-8 text-red-500" />
            </motion.div>
            <h1 className="text-4xl font-bold dark:text-white">Mega Sale</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't miss out on our biggest sale of the year! Limited time offers with massive discounts
            on thousands of products.
          </p>
        </motion.div>

        {/* Flash Sale Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-6 h-6" />
              <h2 className="text-2xl font-bold">FLASH SALE ENDS IN</h2>
              <Zap className="w-6 h-6" />
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 mb-6">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-xs uppercase tracking-wide">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">Up to 60% OFF on selected items!</p>
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Shop Flash Sale
              </button>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Percent className="w-12 h-12 opacity-20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Sorting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-amazon-orange text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${activeTab}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group"
              >
                {/* Sale Badge */}
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`px-2 py-1 rounded text-xs font-bold text-white ${
                      product.saleType === 'flash' ? 'bg-red-500' :
                      product.saleType === 'clearance' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {product.discount}% OFF
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain bg-zinc-900"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amazon-orange transition">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-amazon-orange">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  {/* Sale Type Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      product.saleType === 'flash' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      product.saleType === 'clearance' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {product.saleType === 'flash' ? '⚡ Flash Sale' :
                       product.saleType === 'clearance' ? '🗂️ Clearance' : '🌸 Seasonal'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-amazon-orange text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-lg border transition ${
                        wishlist.includes(product.id)
                          ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900'
                          : 'border-gray-300 dark:border-gray-600 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amazon-orange to-orange-600 rounded-lg p-8 text-center text-white mt-12"
        >
          <Tag className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Don't Miss Future Sales</h3>
          <p className="mb-6 opacity-90">
            Be the first to know about upcoming sales, exclusive deals, and special promotions.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded text-gray-900"
            />
            <button className="bg-amazon-yellow text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}