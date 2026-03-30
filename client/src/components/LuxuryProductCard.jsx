import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function LuxuryProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setProductModal } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <motion.article
      className="group relative bg-black rounded-2xl overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Quick Actions */}
        <motion.div 
          className="absolute top-4 right-4 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setProductModal(product);
            }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-red-600 hover:text-white transition-colors shadow-xl"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-xl ${
              wishlist.includes(product.id) 
                ? 'bg-red-600 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-black hover:bg-red-600 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Add to Cart Button - Appears on Hover */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-red-600 hover:bg-white text-white hover:text-black font-semibold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="block p-5 space-y-3">
        {/* Category */}
        <p className="text-xs text-red-600 uppercase tracking-wider">{product.category}</p>
        
        {/* Name */}
        <h3 className="font-medium text-white line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${i < Math.floor(product.rating) ? 'text-red-600' : 'text-gray-600'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">${product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
