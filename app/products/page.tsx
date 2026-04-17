'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

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

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sort) params.set('sort', sort);
    params.set('page', page.toString());
    params.set('limit', '12');

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [search, selectedCategory, sort, page]);

  // Update URL when filters change
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1'); // Reset to first page
    router.push(`/products?${params.toString()}`);
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: search || null });
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    updateFilters({ category: categorySlug || null });
  };

  const handleSortChange = (sortValue: string) => {
    setSort(sortValue);
    updateFilters({ sort: sortValue });
  };

  const parseImages = (imagesString: string): string[] => {
    try {
      return JSON.parse(imagesString);
    } catch {
      return ['/placeholder-product.png'];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 border py-2 px-4 outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 px-6"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border py-2 px-4 outline-none focus:border-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-gray-800 text-white px-4 py-2 rounded"
            >
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                    !selectedCategory ? 'bg-green-50 text-green-600 font-semibold' : ''
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                      selectedCategory === category.slug ? 'bg-green-50 text-green-600 font-semibold' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-500">({category._count.products})</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange('')}
                  className="w-full mt-4 text-sm text-green-600 hover:underline"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {products.length} of {pagination.total} products
              {selectedCategory && (
                <span className="ml-2">
                  in <span className="font-semibold">{categories.find(c => c.slug === selectedCategory)?.name}</span>
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="h-40 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('');
                    updateFilters({ search: null, category: null });
                  }}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {products.map((product) => {
                    const images = parseImages(product.images);
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3"
                      >
                        <div className="relative">
                          <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
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
                        <div className="text-xs text-gray-500 mt-1">{product.category.name}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Free Shipping
                          </span>
                          <button className="text-green-600 text-sm font-semibold hover:underline">
                            View Details
                          </button>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.pages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-2 border rounded ${
                              page === pageNum
                                ? 'bg-green-600 text-white'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === page - 2 ||
                        pageNum === page + 2
                      ) {
                        return <span key={pageNum}>...</span>;
                      }
                      return null;
                    })}

                    <button
                      onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                      disabled={page === pagination.pages}
                      className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
