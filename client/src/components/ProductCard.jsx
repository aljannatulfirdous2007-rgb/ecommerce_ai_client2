import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setProductModal } = useStore();
  const [hovered, setHovered] = useState(false);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group relative rounded-lg bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-700">
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {discount > 0 && (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold"
          >
            -{discount}%
          </motion.div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setProductModal(product);
            }}
            className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`transition p-3 rounded-full ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white">{product.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-lg dark:text-white">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  );
}