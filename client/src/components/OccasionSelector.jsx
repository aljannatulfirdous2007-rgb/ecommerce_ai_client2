import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles, Zap } from "lucide-react";

const OCCASIONS = [
  {
    id: "wedding",
    name: "Wedding",
    icon: Heart,
    description: "Elegant & sophisticated looks for special ceremonies",
    image: "/images/collage-2.jpg",
    categories: ["Fashion"],
    priceRange: "$500 - $3000",
    styles: ["Gowns", "Formal Dresses", "Luxury Accessories"]
  },
  {
    id: "party",
    name: "Party",
    icon: Sparkles,
    description: "Bold & glamorous outfits to turn heads",
    image: "/images/collage-1.jpg",
    categories: ["Fashion", "Beauty"],
    priceRange: "$300 - $1500",
    styles: ["Cocktail Dresses", "Statement Pieces", "Bold Makeup"]
  },
  {
    id: "casual",
    name: "Casual",
    icon: Zap,
    description: "Chic & comfortable everyday essentials",
    image: "/images/collage-3.jpg",
    categories: ["Fashion", "Beauty"],
    priceRange: "$200 - $800",
    styles: ["Casual Wear", "Daily Beauty", "Comfortable Chic"]
  }
];

export default function OccasionSelector({ onSelectionChange }) {
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const handleSelect = (occasion) => {
    setSelectedOccasion(occasion.id);
    if (onSelectionChange) {
      onSelectionChange(occasion);
    }
  };

  return (
    <section id="occasion-selector" className="py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-4 block">
            AI-Powered Recommendations
          </span>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Select Your Occasion
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our intelligent styling system curates perfect outfits based on your event. 
            Choose an occasion and let our algorithm match you with the ideal look.
          </p>
        </motion.div>

        {/* Occasion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {OCCASIONS.map((occasion, idx) => {
            const Icon = occasion.icon;
            const isSelected = selectedOccasion === occasion.id;

            return (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                onClick={() => handleSelect(occasion)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ${
                  isSelected ? "ring-2 ring-red-600 ring-offset-4 ring-offset-black" : ""
                }`}
              >
                {/* Image Background */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-contain bg-zinc-900"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3
                      className="text-2xl sm:text-3xl font-light text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {occasion.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {occasion.description}
                    </p>

                    {/* Styles Preview */}
                    <div className="pt-3 border-t border-white/20">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                        Recommended Styles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {occasion.styles.map((style, i) => (
                          <span
                            key={i}
                            className="text-xs text-white/90 bg-white/10 px-2 py-1 rounded"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="pt-2">
                      <p className="text-red-600 text-sm font-medium">
                        {occasion.priceRange}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/shop?occasion=${occasion.id}`}
                      className="mt-4 inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Looks
                    </Link>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Smart Recommendation Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-gray-400 text-xs uppercase tracking-widest">
              Powered by AI Style Matching Technology
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
