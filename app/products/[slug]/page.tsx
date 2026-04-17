'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  images: string;
  isActive: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string;
}

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [slug]);

  const parseImages = (imagesString: string): string[] => {
    try {
      return JSON.parse(imagesString);
    } catch {
      return ['/placeholder-product.png'];
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const images = parseImages(product.images);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0] || '/placeholder-product.png',
      quantity: quantity,
      slug: product.slug,
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const images = parseImages(product.images);
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock < 10;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-green-600">Products</Link>
          <ChevronRight size={14} />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-green-600">
            {product.category.name}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={images[selectedImage] || '/placeholder-product.png'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {lowStock && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Only {product.stock} left!
                </div>
              )}
              {!inStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-sm text-green-600 hover:underline mb-2 block"
                >
                  {product.category.name}
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} className="text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500">(124 reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded hover:bg-gray-50">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-50">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-green-600">
                  {product.price.toLocaleString()} FCFA
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {inStock ? (
                  <span className="text-green-600 font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">About this item:</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 border rounded hover:bg-gray-50"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
                {product.stock > 0 && (
                  <span className="text-sm text-gray-500">({product.stock} available)</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingCart size={20} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex flex-col items-center text-center text-sm">
                <Truck size={24} className="text-green-600 mb-2" />
                <span className="text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center text-sm">
                <Shield size={24} className="text-green-600 mb-2" />
                <span className="text-gray-600">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center text-sm">
                <RotateCcw size={24} className="text-green-600 mb-2" />
                <span className="text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => {
                const relatedImages = parseImages(relatedProduct.images);
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="border rounded-lg hover:shadow-md transition p-3"
                  >
                    <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
                      <img
                        src={relatedImages[0] || '/placeholder-product.png'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">{relatedProduct.name}</h3>
                    <div className="text-lg font-bold text-green-600">
                      {relatedProduct.price.toLocaleString()} FCFA
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
