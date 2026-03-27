import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { 
    title: "LUXURY REDEFINED", 
    subtitle: "Timeless elegance meets modern sophistication", 
    cta: "Discover Now",
    videoSrc: "https://player.vimeo.com/external/490603338.sd.mp4?s=3aac8fc6c3d26a4bb1c3f0a4c4d2d26b4380b2f6&profile_id=139&oauth2_token_id=57447761",
    posterSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
  },
  { 
    title: "EXCLUSIVE COLLECTION", 
    subtitle: "Curated for the elite discerning eye", 
    cta: "Shop Elite",
    videoSrc: "https://player.vimeo.com/external/489686106.sd.mp4?s=3b728db8d3d5c5d9b1a0c4a1e4d9d7f6d0f0a7d5&profile_id=139&oauth2_token_id=57447761",
    posterSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
  },
  { 
    title: "PURE LUXURY", 
    subtitle: "Indulge in opulence beyond imagination", 
    cta: "Enter World",
    videoSrc: "https://player.vimeo.com/external/487097956.sd.mp4?s=1d0b4c6d9e4a4b6f0e4f0a9e8d1d2c5f0d3d8f9c&profile_id=139&oauth2_token_id=57447761",
    posterSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop"
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
  };

  return (
    <div className="relative w-full h-screen md:h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.video
          key={`video-${index}`}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
          src={SLIDES[index].videoSrc}
          poster={SLIDES[index].posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/70" />

      {/* Text overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 md:px-12 text-center z-10"
        initial="hidden"
        animate="visible"
        key={`text-${index}`}
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 drop-shadow-2xl leading-tight tracking-tight"
          variants={textVariants}
        >
          {SLIDES[index].title}
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-4xl mb-12 opacity-90 drop-shadow-xl max-w-2xl mx-auto"
          variants={textVariants}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {SLIDES[index].subtitle}
        </motion.p>
        <motion.button 
          className="bg-white/20 backdrop-blur-xl hover:bg-white/30 text-white px-12 py-6 md:px-16 md:py-8 rounded-3xl font-bold text-xl md:text-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
          variants={textVariants}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {SLIDES[index].cta} →
        </motion.button>
      </motion.div>

      {/* Nav arrows */}
      <motion.button 
        onClick={() => setIndex((p) => Math.max(0, p - 1))}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-xl text-white p-4 md:p-5 rounded-full transition-all z-20 shadow-2xl hover:shadow-white/30"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </motion.button>
      
      <motion.button 
        onClick={() => setIndex((p) => (p + 1) % SLIDES.length)}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-xl text-white p-4 md:p-5 rounded-full transition-all z-20 shadow-2xl hover:shadow-white/30"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, i) => (
          <motion.button 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all backdrop-blur-sm shadow-lg ${i === index ? "bg-white scale-125 shadow-white/50" : "bg-white/50 hover:bg-white/70"}`}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 1.1 }}
          />
        ))}
      </div>
    </div>
  );
}
