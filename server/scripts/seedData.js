/**
 * Seed Script for Luxe Marketplace
 * Creates sample products and admin user
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { User, Product } = require('../models');
const { hashPassword } = require('../utils/passwordUtils');
const { connectDB } = require('../db/connectDB');

// Sample products data matching the frontend
const sampleProducts = [
  {
    name: "Obsidian Watch",
    description: "Premium smartwatch with obsidian finish, featuring heart rate monitoring, GPS tracking, and water resistance up to 50m.",
    price: 2499,
    oldPrice: 3200,
    category: "Tech",
    inventory: 16,
    images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.9,
    reviewCount: 312,
    isFeatured: true,
    isOnSale: true,
    tags: ["smartwatch", "tech", "premium"],
    sku: "TECH-001"
  },
  {
    name: "Leather Tote",
    description: "Handcrafted genuine leather tote bag with spacious compartments, perfect for work or travel.",
    price: 890,
    oldPrice: 1200,
    category: "Fashion",
    inventory: 24,
    images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.8,
    reviewCount: 218,
    isFeatured: true,
    isOnSale: true,
    tags: ["bag", "leather", "fashion"],
    sku: "FASH-001"
  },
  {
    name: "Gold Serum",
    description: "24k gold-infused anti-aging serum that reduces fine lines and improves skin elasticity.",
    price: 320,
    oldPrice: 450,
    category: "Beauty",
    inventory: 41,
    images: [{ url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.7,
    reviewCount: 540,
    isFeatured: true,
    isOnSale: true,
    tags: ["skincare", "serum", "beauty"],
    sku: "BEAU-001"
  },
  {
    name: "Silk Scarf",
    description: "100% pure silk scarf with elegant patterns, perfect for adding sophistication to any outfit.",
    price: 450,
    oldPrice: 600,
    category: "Fashion",
    inventory: 12,
    images: [{ url: "https://images.unsplash.com/photo-1601762603332-fd61e28b698a?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.9,
    reviewCount: 178,
    isFeatured: false,
    isOnSale: true,
    tags: ["scarf", "silk", "fashion"],
    sku: "FASH-002"
  },
  {
    name: "Air Pods Pro",
    description: "Wireless earbuds with active noise cancellation, spatial audio, and up to 30 hours of battery life.",
    price: 1299,
    oldPrice: 1599,
    category: "Tech",
    inventory: 34,
    images: [{ url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c9bf1f?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.8,
    reviewCount: 893,
    isFeatured: true,
    isOnSale: true,
    tags: ["earbuds", "audio", "tech"],
    sku: "TECH-002"
  },
  {
    name: "Marble Candle",
    description: "Hand-poured soy wax candle in a marble container, with notes of lavender and vanilla.",
    price: 180,
    oldPrice: 240,
    category: "Home",
    inventory: 45,
    images: [{ url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.6,
    reviewCount: 290,
    isFeatured: false,
    isOnSale: true,
    tags: ["candle", "home", "decor"],
    sku: "HOME-001"
  },
  {
    name: "Cashmere Coat",
    description: "Ultra-soft cashmere wool coat with premium tailoring and timeless design.",
    price: 1850,
    oldPrice: 2400,
    category: "Fashion",
    inventory: 19,
    images: [{ url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.9,
    reviewCount: 127,
    isFeatured: true,
    isOnSale: true,
    tags: ["coat", "cashmere", "fashion"],
    sku: "FASH-003"
  },
  {
    name: "Fragrance Set",
    description: "Luxury fragrance set with eau de parfum, body mist, and matching body lotion.",
    price: 560,
    oldPrice: 750,
    category: "Beauty",
    inventory: 50,
    images: [{ url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.7,
    reviewCount: 420,
    isFeatured: false,
    isOnSale: true,
    tags: ["fragrance", "perfume", "beauty"],
    sku: "BEAU-002"
  },
  {
    name: "Wireless Gaming Mouse",
    description: "RGB gaming mouse with 16,000 DPI sensor, programmable buttons, and ergonomic design.",
    price: 799,
    oldPrice: 999,
    category: "Tech",
    inventory: 28,
    images: [{ url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.8,
    reviewCount: 567,
    isFeatured: false,
    isOnSale: true,
    tags: ["mouse", "gaming", "tech"],
    sku: "TECH-003"
  },
  {
    name: "Designer Sunglasses",
    description: "Premium polarized sunglasses with UV protection and lightweight titanium frames.",
    price: 1299,
    oldPrice: 1699,
    category: "Fashion",
    inventory: 15,
    images: [{ url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.9,
    reviewCount: 234,
    isFeatured: true,
    isOnSale: true,
    tags: ["sunglasses", "accessories", "fashion"],
    sku: "FASH-004"
  },
  {
    name: "Vitamin C Cream",
    description: "Brightening vitamin C cream that evens skin tone and boosts collagen production.",
    price: 280,
    oldPrice: 380,
    category: "Beauty",
    inventory: 62,
    images: [{ url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.6,
    reviewCount: 678,
    isFeatured: false,
    isOnSale: true,
    tags: ["skincare", "vitamin-c", "beauty"],
    sku: "BEAU-003"
  },
  {
    name: "Ceramic Dinner Set",
    description: "16-piece ceramic dinnerware set with modern minimalist design and chip-resistant finish.",
    price: 450,
    oldPrice: 600,
    category: "Home",
    inventory: 22,
    images: [{ url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop&crop=center", isPrimary: true }],
    rating: 4.7,
    reviewCount: 189,
    isFeatured: false,
    isOnSale: true,
    tags: ["dinnerware", "ceramic", "home"],
    sku: "HOME-002"
  }
];

// Sample admin and test users
const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin@123",
    phone: "+1 (555) 123-4567",
    role: "admin",
    isVerified: true
  },
  {
    name: "Test User",
    email: "user@example.com",
    password: "User@123",
    phone: "+1 (555) 987-6543",
    role: "user",
    isVerified: true
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "John@123",
    phone: "+1 (555) 456-7890",
    role: "user",
    isVerified: true
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create sample users
    console.log('👤 Creating sample users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await hashPassword(userData.password);
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });
      createdUsers.push(user);
      console.log(`   ✅ ${user.role.toUpperCase()}: ${user.email} / ${userData.password}`);
    }
    console.log('');

    // Create sample products
    console.log('📦 Creating sample products...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`   ✅ ${createdProducts.length} products created\n`);

    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║              🎉 SEEDING COMPLETED! 🎉                  ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log('║                                                        ║');
    console.log('║  Sample Login Credentials:                             ║');
    console.log('║  ─────────────────────────                             ║');
    console.log('║  Admin:  admin@example.com / Admin@123                 ║');
    console.log('║  User:   user@example.com  / User@123                  ║');
    console.log('║  John:   john@example.com  / John@123                  ║');
    console.log('║                                                        ║');
    console.log('║  Products Created: 12                                  ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
