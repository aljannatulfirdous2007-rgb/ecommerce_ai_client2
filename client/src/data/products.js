// AL FIRDOUS LUXE - Pinterest Coded Aesthetic
// Color Palette: Black, White, Red (Versace x Jennifer's Body x Mean Girls x VS)

export const PRODUCTS = [
  // AL FIRDOUS LUXE - Beauty & Fashion Only
  
  // FASHION - Jennifer's Body/Mean Girls Aesthetic
  { 
    id: 1, 
    name: "Crimson Velvet Gown", 
    price: 2890, 
    oldPrice: 3500, 
    category: "Fashion", 
    rating: 5.0, 
    reviews: 89, 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-2fc7956399a8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop"
    ], 
    inventory: 15, 
    description: "A dangerously seductive velvet dress that commands attention. The deep neckline and body-hugging silhouette make you the center of every room. For the girl who knows she's the main character.", 
    sizes: ["XS", "S", "M", "L", "XL"], 
    ingredients: "Premium Velvet Blend",
    faqs: [
      { q: "How do I care for this dress?", a: "Dry clean only to maintain the luxurious velvet texture." },
      { q: "Is it true to size?", a: "Yes, but size up if you prefer a more relaxed fit." }
    ]
  },
  {
    id: 2, 
    name: "Noir Silk Slip Dress", 
    price: 1685, 
    oldPrice: 2250, 
    category: "Fashion", 
    rating: 5.0, 
    reviews: 89, 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-2fc7956399a8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop"
    ], 
    inventory: 15, 
    description: "A dangerously seductive silk slip that drapes like liquid shadow. The minimalist silhouette speaks volumes - for the woman who doesn't need to try hard to command every room she enters.", 
    sizes: ["XS", "S", "M", "L", "XL"], 
    ingredients: "100% Italian Silk",
    faqs: [
      { q: "How do I care for silk?", a: "Dry clean only to maintain the lustrous finish." },
      { q: "Is it see-through?", a: "The black silk has a beautiful opacity while maintaining that signature silk sheen." }
    ]
  },
  { 
    id: 3, 
    name: "Obsidian Silk Robe", 
    price: 895, 
    oldPrice: 1150, 
    category: "Fashion", 
    rating: 4.8, 
    reviews: 189, 
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop", 
    inventory: 32, 
    description: "Pure silk robe that drapes like liquid gold. Perfect for your morning routine or those lazy Sundays when you're feeling yourself.", 
    sizes: ["XS/S", "M/L", "XL/XXL"], 
    ingredients: "100% Mulberry Silk",
    faqs: [
      { q: "What length is the robe?", a: "Mid-thigh length, approximately 35 inches." },
      { q: "Does it have pockets?", a: "Yes, two hidden side pockets." }
    ]
  },
  { 
    id: 4, 
    name: "Diamond Cat Choker", 
    price: 3285, 
    oldPrice: 4250, 
    category: "Fashion", 
    rating: 5.0, 
    reviews: 89, 
    img: "/images/diamond-cat.jpg", 
    inventory: 15, 
    description: "For the girl who prowls through life with undeniable presence. This statement piece captures the essence of feline power and luxury. Not for the faint of heart.", 
    sizes: ["One Size"], 
    ingredients: "Swarovski Crystals, Platinum Plating",
    faqs: [
      { q: "Is it adjustable?", a: "Yes, adjustable chain from 12-16 inches." },
      { q: "Will it irritate sensitive skin?", a: "Hypoallergenic and nickel-free." }
    ]
  },
  { 
    id: 5, 
    name: "Crimson Satin Corset", 
    price: 685, 
    oldPrice: 895, 
    category: "Fashion", 
    rating: 4.8, 
    reviews: 298, 
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop", 
    inventory: 25, 
    description: "Structured satin corset that cinches your waist and lifts everything in the right places. Pair it with jeans for a casual slay or a skirt for maximum impact.", 
    sizes: ["XS", "S", "M", "L", "XL"], 
    ingredients: "Silk Satin, Boning",
    faqs: [
      { q: "Is it comfortable to sit in?", a: "Yes! The boning is flexible enough for all-day wear." },
      { q: "Does it have a zipper?", a: "Side zipper closure for easy on and off." }
    ]
  },

  // BEAUTY - Glossy VS Style
  { 
    id: 6, 
    name: "Blood Red Elixir", 
    price: 485, 
    oldPrice: 650, 
    category: "Beauty", 
    rating: 5.0, 
    reviews: 234, 
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop", 
    inventory: 45, 
    description: "An intoxicating perfume that lingers in the best way. Notes of dark rose, vanilla, and musk create a scent that's unforgettable - just like you.", 
    sizes: ["30ml", "50ml", "100ml"], 
    ingredients: "Dark Rose Absolute, Madagascar Vanilla, White Musk, Amber, Sandalwood, Bergamot",
    faqs: [
      { q: "How long does it last?", a: "8-12 hours on skin, all day on clothes." },
      { q: "Is it overpowering?", a: "It's bold but not overwhelming - perfect for making an entrance." }
    ]
  },
  { 
    id: 7, 
    name: "Diamond Body Glow Oil", 
    price: 385, 
    oldPrice: 495, 
    category: "Beauty", 
    rating: 4.8, 
    reviews: 423, 
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=800&fit=crop", 
    inventory: 52, 
    description: "Shimmering body oil that gives you that Victoria's Secret runway glow. Infused with gold particles and the most divine rose scent.", 
    sizes: ["100ml", "250ml"], 
    ingredients: "Jojoba Oil, Rose Extract, 24K Gold Particles, Vitamin E, Jasmine Essential Oil",
    faqs: [
      { q: "Will it transfer to clothes?", a: "Let it absorb for 5 minutes and you're good to go!" },
      { q: "Is it greasy?", a: "Absorbs quickly leaving a silky, non-greasy finish." }
    ]
  },
  { 
    id: 8, 
    name: "Maneater Red Lipstick", 
    price: 485, 
    oldPrice: 650, 
    category: "Beauty", 
    rating: 5.0, 
    reviews: 1234, 
    img: "/images/maneater-lipstick.jpg", 
    inventory: 78, 
    description: "The perfect dark cherry lip stain that won't budge through coffee, kisses, or chaos. Matte finish that feels like nothing on your lips.", 
    sizes: ["One Size"], 
    ingredients: "Jojoba Oil, Vitamin E, Cherry Extract, Hyaluronic Acid, Pigment",
    faqs: [
      { q: "Is it drying?", a: "No! It's infused with hyaluronic acid for hydration." },
      { q: "How do I remove it?", a: "Use an oil-based makeup remover for easy removal." }
    ]
  },
  { 
    id: 9, 
    name: "Platinum Face Serum", 
    price: 685, 
    oldPrice: 895, 
    category: "Beauty", 
    rating: 4.8, 
    reviews: 334, 
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=800&fit=crop", 
    inventory: 41, 
    description: "Wake up to glass skin. This overnight serum works while you sleep to give you that effortless 'I woke up like this' glow.", 
    sizes: ["30ml", "50ml"], 
    ingredients: "Retinol, Hyaluronic Acid, Niacinamide, Vitamin C, Rosehip Oil",
    faqs: [
      { q: "Can I use it every night?", a: "Start with 2-3 times a week, then build up to nightly." },
      { q: "Is it safe for sensitive skin?", a: "Yes, but patch test first if you're sensitive to retinol." }
    ]
  },
  { 
    id: 10, 
    name: "Raven Lash Mascara", 
    price: 285, 
    oldPrice: 375, 
    category: "Beauty", 
    rating: 4.7, 
    reviews: 678, 
    img: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=600&h=800&fit=crop", 
    inventory: 65, 
    description: "False lash effect in a tube. This mascara gives you dramatic volume and length without the clumps. Waterproof and smudge-proof for all your dramatic moments.", 
    sizes: ["One Size"], 
    ingredients: "Carnauba Wax, Vitamin E, Collagen, Pigment",
    faqs: [
      { q: "Is it hard to remove?", a: "Use a gentle oil-based remover and it slides right off." },
      { q: "Does it flake?", a: "No flaking or smudging - stays perfect all day." }
    ]
  },
  { 
    id: 11, 
    name: "Midnight Smoke Palette", 
    price: 385, 
    oldPrice: 495, 
    category: "Beauty", 
    rating: 4.9, 
    reviews: 445, 
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop", 
    inventory: 38, 
    description: "12 sultry shades from midnight black to champagne shimmer. Create everything from subtle daytime looks to dramatic smoky eyes.", 
    sizes: ["One Size"], 
    ingredients: "Talc-Free Formula, Mica, Jojoba Oil, Vitamin E",
    faqs: [
      { q: "Is it pigmented?", a: "Extremely! A little goes a long way." },
      { q: "Does it have fallout?", a: "Minimal fallout - use an eyeshadow primer for best results." }
    ]
  },
  { 
    id: 12, 
    name: "Noir Silk Pillowcase", 
    price: 425, 
    oldPrice: 550, 
    category: "Fashion", 
    rating: 4.8, 
    reviews: 223, 
    img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=800&fit=crop", 
    inventory: 30, 
    description: "Beauty sleep is real. These silk pillowcases prevent hair breakage and keep your skin crease-free. Wake up looking like you actually got 8 hours.", 
    sizes: ["Standard", "King"], 
    ingredients: "100% 22 Momme Mulberry Silk",
    faqs: [
      { q: "How do I wash them?", a: "Machine wash delicate in cold water, hang dry." },
      { q: "Do they come in a set?", a: "Yes, set of 2 pillowcases in a gift box." }
    ]
  },
  { 
    id: 13, 
    name: "Cherry Red Vinyl Pants", 
    price: 1285, 
    oldPrice: 1650, 
    category: "Fashion", 
    rating: 4.9, 
    reviews: 456, 
    img: "/images/red-vinyl-pants.jpg", 
    inventory: 25, 
    description: "High-waisted cherry red vinyl pants that hug every curve. For the girl who owns the room the moment she walks in. Dangerously glossy, impossibly chic.", 
    sizes: ["XS", "S", "M", "L", "XL"], 
    ingredients: "Premium Vinyl, Cotton Lining",
    faqs: [
      { q: "Are they comfortable?", a: "Surprisingly yes! The cotton lining makes them wearable all night." },
      { q: "How do I clean vinyl?", a: "Wipe clean with damp cloth. Do not machine wash." }
    ]
  },
  { id: 10, name: "Designer Sunglasses", price: 1299, oldPrice: 1699, category: "Fashion", rating: 4.9, reviews: 234, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center", inventory: 15, description: "Premium polarized sunglasses with UV protection and lightweight titanium frames." },
  { id: 11, name: "Vitamin C Cream", price: 280, oldPrice: 380, category: "Beauty", rating: 4.6, reviews: 678, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&crop=center", inventory: 62, description: "Brightening vitamin C cream that evens skin tone and boosts collagen production." },
];

export const CATEGORIES = ["All", "Fashion", "Beauty"];