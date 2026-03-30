import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Fashion Enthusiast",
    image: "/images/collage-1.jpg",
    rating: 5,
    comment: "AL FIRDOUS LUXE exceeded all my expectations. The quality is exceptional and the customer service is outstanding!",
  },
  {
    id: 2,
    name: "Jessica R.",
    role: "Style Blogger",
    image: "/images/collage-2.jpg",
    rating: 5,
    comment: "Finally, a luxury brand that understands modern elegance. Every piece I've ordered has been absolutely stunning.",
  },
  {
    id: 3,
    name: "Amanda K.",
    role: "Verified Buyer",
    image: "/images/collage-3.jpg",
    rating: 5,
    comment: "The attention to detail is incredible. From packaging to product quality, everything screams luxury.",
  },
  {
    id: 4,
    name: "Michelle T.",
    role: "Loyal Customer",
    image: "/images/collage-4.jpg",
    rating: 5,
    comment: "I've been shopping here for months and have never been disappointed. Fast shipping and beautiful products!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-red-600 text-xs uppercase tracking-[0.5em] mb-3 block">Testimonials</span>
          <h2 className="text-3xl sm:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-950 p-8 sm:p-12 rounded-lg border border-white/10 relative"
          >
            <Quote className="absolute top-6 left-6 w-12 h-12 text-red-600/20" />
            
            <div className="flex justify-center mb-6">
              {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 text-center leading-relaxed mb-8 italic">
              "{TESTIMONIALS[currentIndex].comment}"
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <img
                src={TESTIMONIALS[currentIndex].image}
                alt={TESTIMONIALS[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-red-600/40"
              />
              <div className="text-left">
                <h4 className="text-white font-medium">{TESTIMONIALS[currentIndex].name}</h4>
                <p className="text-gray-500 text-sm">{TESTIMONIALS[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-500 ${
                idx === currentIndex ? "w-8 h-2 bg-red-600" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-zinc-950 p-6 rounded-lg border ${
                idx === currentIndex ? "border-red-600/40" : "border-white/10"
              } hover:border-red-600/60 transition-colors cursor-pointer`}
              onClick={() => setCurrentIndex(idx)}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white text-sm font-medium">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
