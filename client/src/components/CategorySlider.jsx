import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Heart, Home, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 1, name: 'Fashion', icon: ShoppingBag },
  { id: 2, name: 'Electronics', icon: Zap },
  { id: 3, name: 'Beauty', icon: Sparkles },
  { id: 4, name: 'Home', icon: Home },
  { id: 5, name: 'Wellness', icon: Heart },
];

export default function CategorySlider() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Shop by Category</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-32 h-40 bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center gap-3 snap-center transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <Icon className="w-8 h-8 text-blue-600" />
              <span className="font-semibold text-sm text-center dark:text-white">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}