import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { title: "Luxe Launch Event", subtitle: "Premium products at special prices", bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center", cta: "Shop now" },
  { title: "Spring Tech Deals", subtitle: "New gadgets for smart homes", bg: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop&crop=center", cta: "Explore" },
  { title: "Wellness & Beauty", subtitle: "Self-care essentials with offer", bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center", cta: "Browse" },
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
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{ backgroundImage: `url(${SLIDES[index].bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center"
        initial="hidden"
        animate="visible"
        key={index}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-4"
          variants={textVariants}
        >
          {SLIDES[index].title}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-2xl mb-8"
          variants={textVariants}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {SLIDES[index].subtitle}
        </motion.p>
        <motion.button 
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3 rounded-xl font-semibold transition"
          variants={textVariants}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {SLIDES[index].cta}
        </motion.button>
      </motion.div>

      <motion.button 
        onClick={() => setIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 text-black p-2 rounded-full transition z-10"
        whileHover={{ scale: 1.1 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button 
        onClick={() => setIndex((p) => (p + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 text-black p-2 rounded-full transition z-10"
        whileHover={{ scale: 1.1 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <motion.button 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`h-2 w-8 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}