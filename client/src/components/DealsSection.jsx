import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function DealsSection() {
  const { addToCart } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // Reset to 24 hours
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      price: 79.99,
      oldPrice: 129.99,
      discount: 38,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      price: 149.99,
      oldPrice: 249.99,
      discount: 40,
      category: "Wearables"
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      img: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      price: 89.99,
      oldPrice: 159.99,
      discount: 44,
      category: "Gaming"
    },
    {
      id: 4,
      name: "4K Action Camera",
      img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      price: 199.99,
      oldPrice: 299.99,
      discount: 33,
      category: "Cameras"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold dark:text-white">Flash Deals</h2>
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Limited time offers - Don't miss out!</p>

          {/* Countdown Timer */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg"
          >
            <Clock className="w-5 h-5 text-red-500" />
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">HOURS</div>
              </div>
              <div className="text-red-400">:</div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">MIN</div>
              </div>
              <div className="text-red-400">:</div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">SEC</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative">
                <motion.img
                  src={deal.img}
                  alt={deal.name}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold"
                >
                  -{deal.discount}%
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold"
                >
                  HOT
                </motion.div>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{deal.category}</p>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white">{deal.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-red-600 dark:text-red-400">${deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">${deal.oldPrice}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(deal)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                >
                  Grab Deal
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
          >
            View All Deals →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}