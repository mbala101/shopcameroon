# 🚀 Quick Start Guide - ShopCameroon

Follow these steps to get your ecommerce platform running in under 10 minutes!

## Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] MySQL installed and running
- [ ] Code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies (if not already done)

```bash
npm install
```

### 2. Setup MySQL Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
# Enter your MySQL password
CREATE DATABASE shopcameroon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

**Option B: Using MySQL Workbench or phpMyAdmin**
- Open your MySQL GUI tool
- Create new database: `shopcameroon`
- Set collation to: `utf8mb4_unicode_ci`

### 3. Configure Environment Variables

Open `.env.local` and update the database URL:

```env
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/shopcameroon"
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

### 4. Initialize Database

Run these commands in order:

```bash
# Push schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed database with sample data
npm run db:seed
```

You should see output like:
```
✅ Admin user created
✅ Categories created
✅ 20 products created
✅ Delivery agencies created
🎉 Database seeding completed successfully!
```

### 5. Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.5s
- Local:   http://localhost:3000
```

### 6. Access the Application

**Customer Frontend:**
- Open: http://localhost:3000
- Browse products, add to cart, test checkout

**Admin Dashboard:**
- Open: http://localhost:3000/admin/login
- Email: `admin@shopcameroon.com`
- Password: `Admin@123`

### 7. Verify Everything Works

- [ ] Homepage loads with products
- [ ] Can view product details
- [ ] Can add items to cart
- [ ] Admin login works
- [ ] Can see orders in admin dashboard

## Common Issues & Solutions

### Issue: "Database connection error"
**Solution:** 
- Verify MySQL is running
- Check DATABASE_URL in `.env.local`
- Test connection: `mysql -u root -p`

### Issue: "Prisma client not generated"
**Solution:**
```bash
npm run db:generate
```

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

## What's Included After Setup

### Database Records Created:
- ✅ 1 Admin user
- ✅ 5 Product categories
- ✅ 20 Sample products (realistic Cameroon prices in XAF)
- ✅ 4 Delivery agencies (Douala, Yaoundé, Bamenda, Bafoussam)

### Features Ready to Test:
- ✅ Product browsing
- ✅ Search and filtering
- ✅ Shopping cart (with Zustand persistence)
- ✅ Guest checkout flow
- ✅ Admin authentication
- ✅ Order management dashboard

### Next Steps for Production:

1. **Setup Payment Gateway**
   - Create Flutterwave account: https://flutterwave.com
   - Get API keys from dashboard
   - Update `.env.local` with real keys

2. **Configure WhatsApp**
   - Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
   - Consider WhatsApp Business API for automation

3. **Deploy to Production**
   - Frontend: Vercel (https://vercel.com)
   - Database: Railway or PlanetScale
   - Set environment variables in hosting platform

4. **Security Hardening**
   - Change admin password immediately
   - Update JWT_SECRET to a strong random string
   - Enable HTTPS
   - Setup proper CORS

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:generate      # Generate Prisma client
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio (DB GUI)

# Prisma Studio
# Opens at http://localhost:5555
# Great for viewing/editing database visually
```

## Testing the Platform

### As a Customer:
1. Visit http://localhost:3000
2. Browse products by category
3. Click on a product to see details
4. Add items to cart
5. Proceed to checkout
6. Fill in delivery information
7. Select payment method (COD for testing)
8. Place order

### As an Admin:
1. Login at http://localhost:3000/admin/login
2. View dashboard statistics
3. Check orders list
4. Click on an order to see details
5. Update order status
6. Assign delivery agency
7. Manage products and categories

## Sample Test Data

### Admin Credentials:
- Email: admin@shopcameroon.com
- Password: Admin@123

### Sample Products (All prices in XAF):
- HP Laptop 15 - 285,000 XAF
- iPhone 14 - 485,000 XAF
- Samsung Galaxy A54 - 195,000 XAF
- Nike Sneakers - 32,000 XAF
- Premium Rice 5kg - 4,500 XAF

### Delivery Agencies:
- Douala Express Delivery - 2,000 XAF
- Yaoundé Fast Delivery - 2,000 XAF
- Bamenda Delivery Services - 2,500 XAF
- Bafoussam Quick Delivery - 2,500 XAF

## Getting Help

If you encounter issues:

1. Check the console for error messages
2. Review `IMPLEMENTATION_GUIDE.md` for detailed code
3. Check Prisma schema in `prisma/schema.prisma`
4. Verify all environment variables are set correctly

## 🎉 You're Ready!

Your ShopCameroon ecommerce platform is now running. Start customizing it for your needs!

### Recommended Next Steps:
- [ ] Add your own products via admin dashboard
- [ ] Customize colors in `app/globals.css`
- [ ] Setup Flutterwave payment gateway
- [ ] Deploy to production
- [ ] Add your domain and SSL certificate

Happy selling! 🇨🇲
