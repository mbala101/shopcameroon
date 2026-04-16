# 🇨🇲 ShopCameroon - Ecommerce Platform for Cameroon

A production-ready, mobile-first ecommerce platform built with Next.js, optimized for the Cameroon market with Mobile Money payments (MTN MoMo, Orange Money), admin order management, and delivery agency integration.

## 🚀 Features

### Customer Features
- **Browse Products**: Category-based product browsing with search and filters
- **Guest Checkout**: No account required to place orders
- **Mobile Money Payments**: MTN MoMo and Orange Money integration via Flutterwave
- **Cash on Delivery**: Pay when you receive your order
- **WhatsApp Integration**: Order confirmations via WhatsApp
- **Mobile-First Design**: Optimized for mobile users

### Admin Dashboard
- **Order Management**: View, filter, and update order statuses
- **Product Management**: Full CRUD operations for products
- **Category Management**: Organize products by categories
- **Delivery Agency Assignment**: Assign orders to delivery agencies
- **Payment Tracking**: Monitor all payment transactions
- **Analytics Dashboard**: Sales overview and statistics

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Flutterwave (MTN MoMo, Orange Money)
- **State Management**: Zustand

## 📋 Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+ database
- Flutterwave account (for payment processing)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/shopcameroon"

# JWT Secret (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# App
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="+237600000000"

# Flutterwave Payment Gateway (get from https://dashboard.flutterwave.com)
FLUTTERWAVE_SECRET_KEY="FLWSECK_TEST-xxxxxxxxxxxxxxxxxxxxx-x"
FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-x"
FLUTTERWAVE_ENCRYPTION_KEY="FLWSECK_TEST-xxxxxxxxxxxxxxxxxxxxx-x"
```

### 3. Setup Database

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE shopcameroon;
exit;

# Push schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed database with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Access

After seeding the database, use these credentials to access the admin dashboard:

- **URL**: http://localhost:3000/admin/login
- **Email**: admin@shopcameroon.com
- **Password**: Admin@123

**⚠️ Important**: Change the admin password immediately after first login in production!

## 📁 Project Structure

```
amazon/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── products/          # Product CRUD
│   │   ├── categories/        # Category CRUD
│   │   ├── orders/            # Order management
│   │   ├── payments/          # Payment processing
│   │   └── delivery-agencies/ # Delivery agency management
│   ├── (shop)/                # Customer-facing pages
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # Product listing & details
│   │   ├── cart/              # Shopping cart
│   │   └── checkout/          # Checkout flow
│   └── admin/                 # Admin dashboard
│       ├── login/             # Admin login
│       ├── page.tsx           # Dashboard overview
│       ├── orders/            # Order management
│       ├── products/          # Product management
│       ├── categories/        # Category management
│       └── delivery-agencies/ # Delivery agencies
├── components/                # React components
│   ├── ui/                   # Reusable UI components
│   ├── shop/                 # Shop-specific components
│   └── admin/                # Admin components
├── lib/                      # Utilities
│   ├── db.ts                # Prisma client
│   ├── auth.ts              # JWT authentication
│   ├── payment.ts           # Flutterwave integration
│   └── whatsapp.ts          # WhatsApp integration
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
└── store/
    └── cartStore.ts         # Cart state management
```

## 🗄️ Database Schema

### Core Tables
- **Users**: Customer and admin accounts
- **Products**: Product catalog with pricing and inventory
- **Categories**: Product categorization
- **Orders**: Customer orders with delivery info
- **Order_Items**: Individual items in each order
- **Payments**: Payment transaction records
- **Delivery_Agencies**: Delivery service providers

## 💳 Payment Integration

### Mobile Money (MTN MoMo & Orange Money)
1. Customer selects Mobile Money at checkout
2. System initiates payment via Flutterwave API
3. Customer receives USSD prompt on their phone
4. Customer enters PIN to authorize payment
5. Flutterwave sends webhook confirmation
6. Order status updates to "Paid"

### Cash on Delivery
1. Customer selects COD at checkout
2. Order created with "Awaiting Payment" status
3. Delivery agency collects payment on delivery
4. Admin confirms payment and updates status

## 🚚 Delivery System

The platform supports multiple delivery agencies with different coverage areas:

- **Douala Express Delivery**: Covers Douala metropolitan area
- **Yaoundé Fast Delivery**: Covers Yaoundé and surrounding areas
- **Bamenda Delivery Services**: Covers Bamenda region
- **Bafoussam Quick Delivery**: Covers Bafoussam and nearby cities

Admins can assign delivery agencies to orders manually through the dashboard.

## 📱 WhatsApp Integration

After placing an order:
1. System generates order summary
2. Creates WhatsApp message with order details
3. Provides link to send confirmation via WhatsApp
4. Customers can contact support directly

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Token-based auth with expiration
- **httpOnly Cookies**: Admin sessions stored securely
- **Input Validation**: Zod schema validation on all API routes
- **SQL Injection Protection**: Prisma parameterized queries

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Database Hosting Options
- **Railway**: https://railway.app (Easy MySQL hosting)
- **PlanetScale**: https://planetscale.com (Serverless MySQL)
- **AWS RDS**: Enterprise-grade MySQL

### Environment Variables for Production
Set all environment variables in your hosting platform's dashboard.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/[slug]` - Get product by slug
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]/status` - Update order status (admin)
- `PUT /api/orders/[id]/assign-delivery` - Assign delivery agency (admin)

### Payments
- `POST /api/payments/initiate` - Initiate Mobile Money payment
- `POST /api/payments/verify` - Verify payment status
- `POST /api/payments/webhook` - Payment webhook handler

### Delivery Agencies
- `GET /api/delivery-agencies` - List active agencies
- `POST /api/delivery-agencies` - Create agency (admin)
- `PUT /api/delivery-agencies/[id]` - Update agency (admin)

## 🎨 Customization

### Colors and Theme
Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  --accent: #your-color;
}
```

### Adding New Categories
Use the admin dashboard or add to `prisma/seed.ts` and run `npm run db:seed`.

## 🧪 Testing

```bash
# Run Prisma Studio to view/edit database
npm run db:studio

# Open http://localhost:5555
```

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend:

1. Add more payment gateways
2. Implement user accounts with order history
3. Add product reviews and ratings
4. Create vendor dashboards for multi-vendor support
5. Add SMS notifications

## 📝 License

MIT License - Feel free to use this for your projects!

## 🆘 Support

For issues and questions:
- Check the documentation
- Review Prisma schema for database structure
- Check API routes for endpoint logic

## 🚀 Future Enhancements

- [ ] User accounts with order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-vendor marketplace
- [ ] SMS notifications (Africa's Talking)
- [ ] Inventory management with low stock alerts
- [ ] Analytics and reporting dashboard
- [ ] Multi-language support (French/English)
- [ ] Mobile app (React Native)

---

Built with ❤️ for the Cameroon ecommerce market
