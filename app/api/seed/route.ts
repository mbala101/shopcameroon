import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// This route seeds the database with sample data
// Visit: /api/seed?secret=your-secret-key
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Simple protection - change this to your own secret
    if (secret !== process.env.SEED_SECRET || !process.env.SEED_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide ?secret=your-secret-key' },
        { status: 401 }
      );
    }

    console.log('🌱 Starting database seeding...');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@shopcameroon.com' },
      update: {},
      create: {
        email: 'admin@shopcameroon.com',
        phone: '+237600000000',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created');

    // Create Categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: {
          name: 'Electronics',
          slug: 'electronics',
          description: 'Latest electronic gadgets and devices',
          image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'fashion' },
        update: {},
        create: {
          name: 'Fashion',
          slug: 'fashion',
          description: 'Trendy clothing and accessories',
          image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'phones-tablets' },
        update: {},
        create: {
          name: 'Phones & Tablets',
          slug: 'phones-tablets',
          description: 'Smartphones, tablets, and accessories',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'home-kitchen' },
        update: {},
        create: {
          name: 'Home & Kitchen',
          slug: 'home-kitchen',
          description: 'Everything for your home and kitchen',
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'groceries' },
        update: {},
        create: {
          name: 'Groceries',
          slug: 'groceries',
          description: 'Fresh groceries and household items',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
        },
      }),
    ]);
    console.log('✅ Categories created');

    // Create Products
    const products = [
      // Electronics
      {
        name: 'HP Laptop 15 - Intel Core i5, 8GB RAM, 256GB SSD',
        slug: 'hp-laptop-15-intel-core-i5',
        description: 'Powerful laptop perfect for work and entertainment. Features Intel Core i5 processor, 8GB RAM, and fast 256GB SSD storage.',
        price: 285000,
        stock: 15,
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        ]),
      },
      {
        name: 'Samsung 32" Smart TV - Full HD',
        slug: 'samsung-32-smart-tv',
        description: 'Enjoy your favorite shows and movies in Full HD. Smart TV with built-in WiFi and streaming apps.',
        price: 125000,
        stock: 20,
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
        ]),
      },
      {
        name: 'JBL Bluetooth Speaker - Portable',
        slug: 'jbl-bluetooth-speaker',
        description: 'High-quality portable Bluetooth speaker with 12-hour battery life and waterproof design.',
        price: 35000,
        stock: 50,
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        ]),
      },
      {
        name: 'Logitech Wireless Mouse & Keyboard Combo',
        slug: 'logitech-wireless-combo',
        description: 'Ergonomic wireless mouse and keyboard combo for comfortable computing.',
        price: 18000,
        stock: 40,
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        ]),
      },
      // Fashion
      {
        name: "Men's Casual Shirt - Cotton",
        slug: 'mens-casual-shirt-cotton',
        description: 'Comfortable cotton shirt perfect for casual and semi-formal occasions. Available in multiple colors.',
        price: 8500,
        stock: 100,
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        ]),
      },
      {
        name: "Women's Dress - Elegant Evening Wear",
        slug: 'womens-elegant-dress',
        description: 'Beautiful evening dress for special occasions. High-quality fabric with elegant design.',
        price: 15000,
        stock: 60,
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        ]),
      },
      {
        name: 'Nike Sneakers - Running Shoes',
        slug: 'nike-sneakers-running',
        description: 'Comfortable running shoes with excellent cushioning and support.',
        price: 32000,
        stock: 45,
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        ]),
      },
      {
        name: 'Leather Wallet - Premium Quality',
        slug: 'leather-wallet-premium',
        description: 'Genuine leather wallet with multiple card slots and RFID protection.',
        price: 12000,
        stock: 80,
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        ]),
      },
      // Phones & Tablets
      {
        name: 'iPhone 14 - 128GB',
        slug: 'iphone-14-128gb',
        description: 'Latest iPhone with advanced camera system, A15 Bionic chip, and all-day battery life.',
        price: 485000,
        stock: 10,
        categoryId: categories[2].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500',
        ]),
      },
      {
        name: 'Samsung Galaxy A54 - 128GB',
        slug: 'samsung-galaxy-a54',
        description: 'Mid-range smartphone with excellent camera and long battery life.',
        price: 195000,
        stock: 25,
        categoryId: categories[2].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        ]),
      },
      {
        name: 'Tecno Spark 10 Pro - 128GB',
        slug: 'tecno-spark-10-pro',
        description: 'Affordable smartphone with great features. Perfect for everyday use.',
        price: 75000,
        stock: 40,
        categoryId: categories[2].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        ]),
      },
      {
        name: 'iPad 10th Generation - 64GB',
        slug: 'ipad-10th-generation',
        description: 'Versatile tablet for work, creativity, and entertainment.',
        price: 265000,
        stock: 15,
        categoryId: categories[2].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        ]),
      },
      // Home & Kitchen
      {
        name: 'Blender - 1.5L Heavy Duty',
        slug: 'blender-heavy-duty',
        description: 'Powerful blender for smoothies, soups, and more. 1.5L capacity.',
        price: 22000,
        stock: 35,
        categoryId: categories[3].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500',
        ]),
      },
      {
        name: 'Microwave Oven - 20L',
        slug: 'microwave-oven-20l',
        description: 'Compact microwave oven perfect for small kitchens. 20L capacity.',
        price: 55000,
        stock: 20,
        categoryId: categories[3].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
        ]),
      },
      {
        name: 'Cooking Pot Set - Stainless Steel (5 pieces)',
        slug: 'cooking-pot-set',
        description: 'High-quality stainless steel cooking pots. Set of 5 different sizes.',
        price: 28000,
        stock: 30,
        categoryId: categories[3].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1584990347449-a09e5e8dfa5?w=500',
        ]),
      },
      {
        name: 'Electric Kettle - 1.7L',
        slug: 'electric-kettle-1-7l',
        description: 'Fast-boiling electric kettle with auto shut-off. 1.7L capacity.',
        price: 15000,
        stock: 45,
        categoryId: categories[3].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544233726-9f1c24e916a9?w=500',
        ]),
      },
      // Groceries
      {
        name: 'Premium Rice - 5kg Bag',
        slug: 'premium-rice-5kg',
        description: 'High-quality long-grain rice. Perfect for daily meals.',
        price: 4500,
        stock: 200,
        categoryId: categories[4].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
        ]),
      },
      {
        name: 'Cooking Oil - 5L',
        slug: 'cooking-oil-5l',
        description: 'Pure vegetable cooking oil. Healthy and versatile.',
        price: 6500,
        stock: 150,
        categoryId: categories[4].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500',
        ]),
      },
      {
        name: 'Milk Powder - 2.5kg',
        slug: 'milk-powder-2-5kg',
        description: 'Full cream milk powder. Rich in nutrients.',
        price: 8500,
        stock: 100,
        categoryId: categories[4].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
        ]),
      },
      {
        name: 'Mixed Spices Set - 10 pieces',
        slug: 'mixed-spices-set',
        description: 'Collection of essential cooking spices. Perfect for Cameroonian cuisine.',
        price: 5500,
        stock: 120,
        categoryId: categories[4].id,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
        ]),
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }
    console.log(`✅ ${products.length} products created`);

    // Create Delivery Agencies
    const agencies = await Promise.all([
      prisma.deliveryAgency.upsert({
        where: { id: 'agency-douala' },
        update: {},
        create: {
          id: 'agency-douala',
          name: 'Douala Express Delivery',
          phone: '+237670000001',
          coverageArea: JSON.stringify(['Douala', 'Bonaberi', 'Deido', 'Akwa', 'Bonanjo']),
          deliveryFee: 2000,
          isActive: true,
          rating: 4.5,
        },
      }),
      prisma.deliveryAgency.upsert({
        where: { id: 'agency-yaounde' },
        update: {},
        create: {
          id: 'agency-yaounde',
          name: 'Yaoundé Fast Delivery',
          phone: '+237670000002',
          coverageArea: JSON.stringify(['Yaoundé', 'Bastos', 'Mfoundi', 'Etoudi', 'Emana']),
          deliveryFee: 2000,
          isActive: true,
          rating: 4.3,
        },
      }),
      prisma.deliveryAgency.upsert({
        where: { id: 'agency-bamenda' },
        update: {},
        create: {
          id: 'agency-bamenda',
          name: 'Bamenda Delivery Services',
          phone: '+237670000003',
          coverageArea: JSON.stringify(['Bamenda', 'Up Town', 'Down Town', 'Nkwen']),
          deliveryFee: 2500,
          isActive: true,
          rating: 4.2,
        },
      }),
      prisma.deliveryAgency.upsert({
        where: { id: 'agency-bafoussam' },
        update: {},
        create: {
          id: 'agency-bafoussam',
          name: 'Bafoussam Quick Delivery',
          phone: '+237670000004',
          coverageArea: JSON.stringify(['Bafoussam', 'Dschang', 'Mbouda']),
          deliveryFee: 2500,
          isActive: true,
          rating: 4.0,
        },
      }),
    ]);
    console.log('✅ Delivery agencies created');

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        admin: { email: admin.email, password: 'Admin@123' },
        categories: categories.length,
        products: products.length,
        agencies: agencies.length,
      },
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
