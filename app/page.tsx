'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronRight, Star, Truck, Shield, RotateCcw, MapPin, User, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string;
  stock: number;
  category: {
    name: string;
    slug: string;
  };
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=10')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  const parseImages = (imagesString: string): string[] => {
    try {
      return JSON.parse(imagesString);
    } catch {
      return ['/placeholder-product.png'];
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold">🇨🇲 ShopCameroon</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Seller Center</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Customer Service</Link>
            <Link href="#" className="hover:underline">Track Order</Link>
            <Link href="#" className="hover:underline">Download App</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top Row */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-green-600 shrink-0">
              ShopCameroon<span className="text-sm align-top">🇨🇲</span>
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center text-sm text-gray-600 shrink-0">
              <MapPin size={16} className="mr-1" />
              <span>Deliver to <span className="font-bold">Douala</span></span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex relative">
                <select className="hidden sm:block bg-gray-100 border border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-600">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more..." 
                  className="flex-1 border py-2 px-4 outline-none focus:border-green-500"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 px-6 rounded-r-md">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:block text-center">
                <div className="text-xs text-gray-500">Hello, Sign in</div>
                <div className="text-sm font-bold flex items-center gap-1">
                  Account <ChevronRight size={14} />
                </div>
              </div>
              <div className="hidden md:block text-center">
                <div className="text-xs text-gray-500">Returns</div>
                <div className="text-sm font-bold">& Orders</div>
              </div>
              <div className="relative">
                <ShoppingCart size={24} className="text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </div>
              <button className="md:hidden">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Nav */}
      <nav className="bg-gray-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2">
            <div className="flex items-center gap-1 font-semibold">
              <Menu size={16} /> All
            </div>
            <Link href="/products" className="hover:text-yellow-400 whitespace-nowrap">Today's Deals</Link>
            <Link href="/products" className="hover:text-yellow-400 whitespace-nowrap">Customer Service</Link>
            <Link href="/products?category=electronics" className="hover:text-yellow-400 whitespace-nowrap">Electronics</Link>
            <Link href="/products?category=fashion" className="hover:text-yellow-400 whitespace-nowrap">Fashion</Link>
            <Link href="/products?category=home-kitchen" className="hover:text-yellow-400 whitespace-nowrap">Home & Kitchen</Link>
            <Link href="/products?category=phones-tablets" className="hover:text-yellow-400 whitespace-nowrap">Phones</Link>
            <Link href="/products?category=electronics" className="hover:text-yellow-400 whitespace-nowrap">Computers</Link>
            <Link href="/products?category=groceries" className="hover:text-yellow-400 whitespace-nowrap">Grocery</Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner Carousel (Simplified) */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Big Savings on Electronics</h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">Up to 40% off on top brands + Free Delivery</p>
            <Link href="/products" className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition">
              Shop Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
        {/* Decorative Badge */}
        <div className="absolute bottom-4 right-4 bg-black/30 rounded-lg p-2 text-sm">
          Limited Time Offer
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Truck size={20} className="text-green-600" /> Free Delivery on orders over 50k
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield size={20} className="text-green-600" /> Safe & Secure Payment
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <RotateCcw size={20} className="text-green-600" /> 7 Days Return Policy
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Star size={20} className="text-green-600" /> 24/7 Customer Support
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Categories Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Shop by Category</h2>
            <Link href="/products" className="text-sm text-green-600 hover:underline flex items-center">See all <ChevronRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            <Link href="/products?category=electronics" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">📱</div>
              <span className="text-xs md:text-sm">Electronics</span>
            </Link>
            <Link href="/products?category=fashion" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">👕</div>
              <span className="text-xs md:text-sm">Fashion</span>
            </Link>
            <Link href="/products?category=home-kitchen" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">🏠</div>
              <span className="text-xs md:text-sm">Home</span>
            </Link>
            <Link href="/products?category=phones-tablets" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">📞</div>
              <span className="text-xs md:text-sm">Phones</span>
            </Link>
            <Link href="/products?category=electronics" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">💻</div>
              <span className="text-xs md:text-sm">Computers</span>
            </Link>
            <Link href="/products?category=groceries" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">🥬</div>
              <span className="text-xs md:text-sm">Grocery</span>
            </Link>
            <Link href="/products" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">🧸</div>
              <span className="text-xs md:text-sm">Toys</span>
            </Link>
            <Link href="/products" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">⚽</div>
              <span className="text-xs md:text-sm">Sports</span>
            </Link>
          </div>
        </section>

        {/* Product Grid - Featured Products */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-sm text-green-600 hover:underline flex items-center">View all <ChevronRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">No products available</h3>
              <p className="text-gray-600 mb-4">Please seed the database first</p>
              <a 
                href="/api/seed?secret=shopcameroon2024"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 inline-block"
              >
                Load Sample Products
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.map((product) => {
                const images = parseImages(product.images);
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 block"
                  >
                    <div className="relative">
                      <div className="h-40 bg-gray-100 rounded-md mb-3 overflow-hidden">
                        <img
                          src={images[0] || '/placeholder-product.png'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Heart size={16} className="text-gray-400" />
                      </button>
                      {product.stock < 5 && product.stock > 0 && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Only {product.stock} left
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm mb-1">
                      <div className="flex text-yellow-400">★★★★☆</div>
                      <span className="text-gray-500 text-xs">(24)</span>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
                    <div className="text-lg font-bold text-green-600">
                      {product.price.toLocaleString()} FCFA
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Free Shipping
                      </span>
                      <span className="text-green-600 text-sm font-semibold hover:underline">
                        View Details
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Deal of the Day */}
        <section className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3">
            <h2 className="text-xl font-bold">🔥 Deal of the Day - 62% OFF</h2>
          </div>
          <Link href="/products/jbl-bluetooth-speaker" className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition">
            <div className="md:w-1/3 flex justify-center">
              <div className="h-48 w-48 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
                  alt="JBL Bluetooth Speaker"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">JBL Bluetooth Speaker - Portable</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-sm text-gray-500">(2,345 reviews)</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">35,000 FCFA</div>
              <div className="text-gray-400 line-through mb-3">92,000 FCFA</div>
              <div className="flex gap-3 mb-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Limited Stock</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Free Shipping</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-semibold">Add to Cart</button>
                <span className="border border-gray-300 hover:border-gray-400 px-6 py-2 rounded-md font-semibold inline-block">View Details</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Recommended For You */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <Link href="/products" className="text-sm text-green-600 hover:underline">More recommendations</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredProducts.slice(0, 6).map((product) => {
              const images = parseImages(product.images);
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-2 text-center block"
                >
                  <div className="h-24 bg-gray-100 rounded-md mb-2 overflow-hidden">
                    <img
                      src={images[0] || '/placeholder-product.png'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xs font-medium line-clamp-2 mb-1">{product.name}</h3>
                  <div className="text-sm font-bold text-green-600">
                    {product.price.toLocaleString()} FCFA
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Payment Methods Banner */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Easy Payments with Mobile Money</h3>
          <p className="mb-4">Pay securely with MTN MoMo, Orange Money, or Cash on Delivery</p>
          <div className="flex justify-center gap-8 text-3xl">
            <span>📱 MTN MoMo</span>
            <span>🟠 Orange Money</span>
            <span>💰 Cash on Delivery</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:underline">About ShopCameroon</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Press Releases</Link></li>
                <li><Link href="#" className="hover:underline">Amazon Science</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:underline">Sell on ShopCameroon</Link></li>
                <li><Link href="#" className="hover:underline">Become an Affiliate</Link></li>
                <li><Link href="#" className="hover:underline">Advertise Your Products</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:underline">MTN Mobile Money</Link></li>
                <li><Link href="#" className="hover:underline">Orange Money</Link></li>
                <li><Link href="#" className="hover:underline">Cash on Delivery</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:underline">Your Account</Link></li>
                <li><Link href="#" className="hover:underline">Shipping Rates & Policies</Link></li>
                <li><Link href="#" className="hover:underline">Returns & Replacements</Link></li>
                <li><Link href="#" className="hover:underline">Customer Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 ShopCameroon.com, Inc. or its affiliates. All rights reserved.</p>
            <p className="mt-2">🇨🇲 Cameroon's Trusted Online Marketplace</p>
          </div>
        </div>
      </footer>
    </div>
  );
}