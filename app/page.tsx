import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to ShopCameroon 🇨🇲
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your trusted online marketplace with Mobile Money payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Start Shopping
            </Link>
            <Link
              href="/admin/login"
              className="bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-900 transition shadow-lg"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="font-bold text-lg mb-2">Mobile Money</h3>
              <p className="text-gray-600">Pay with MTN MoMo or Orange Money</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">2-3 days delivery nationwide</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">Pay on Delivery</h3>
              <p className="text-gray-600">Cash on delivery available</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="font-bold text-lg mb-2">Verified Products</h3>
              <p className="text-gray-600">Quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Setup Database</h3>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                    npm run db:push && npm run db:seed
                  </code>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Browse Products</h3>
                  <p className="text-gray-600">Visit the products page to see sample items</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Access Admin Dashboard</h3>
                  <p className="text-gray-600">
                    Login with: admin@shopcameroon.com / Admin@123
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm">
                <strong>📖 Need help?</strong> Check <code className="bg-yellow-100 px-2 py-1 rounded">QUICKSTART.md</code> for detailed setup instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">ShopCameroon 🇨🇲</h3>
          <p className="mb-4 opacity-80">
            Built for the Cameroon market with ❤️
          </p>
          <div className="flex justify-center gap-6 text-sm opacity-60">
            <span>© 2024 ShopCameroon</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
