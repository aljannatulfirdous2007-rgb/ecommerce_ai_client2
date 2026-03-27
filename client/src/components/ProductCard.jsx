import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setProductModal } = useStore();
  const [hovered, setHovered] = useState(false);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <motion.article
      layout
      whileHover={{ 
        scale: 1.05, 
        y: -12,
        boxShadow: "0 35px 60px -20px rgba(79, 70, 229, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/90 hover:border-gray-600/70 overflow-hidden transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative mb-6 overflow-hidden rounded-xl h-56 bg-gray-700/50 group-hover:bg-gray-800/70 transition-all">
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <motion.div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-4 right-4 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            -{discount}%
          </motion.div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setProductModal(product);
            }}
            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-3 rounded-xl border border-white/30 text-white transition-all ${
              wishlist.includes(product.id) 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/25' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
          {product.category}
        </p>
        
        <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-all">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-indigo-500/40 transition-all border-2 border-transparent hover:border-indigo-500/50"
        >
          <ShoppingCart className="w-5 h-5 inline ml-2" />
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  );
}

