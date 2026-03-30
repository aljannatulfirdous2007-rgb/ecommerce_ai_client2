import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, setProductModal } = useStore();
  const [hovered, setHovered] = useState(false);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <motion.article
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl bg-black overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />

        {discount > 0 && (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            -{discount}%
          </motion.div>
        )}

        {/* Quick Actions Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3"
        >
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setProductModal(product);
            }}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-xl"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-xl ${
              wishlist.includes(product.id) 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-black hover:bg-red-600 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Add to Cart - Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full py-3 bg-red-600 hover:bg-white text-white hover:text-black font-medium text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
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
          <span className="text-lg font-bold text-white">${product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">${product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}