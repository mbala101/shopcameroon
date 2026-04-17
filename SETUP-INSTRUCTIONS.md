# 🚀 Quick Setup Instructions

## 1️⃣ Seed the Database with Products

After the deployment is complete, visit this URL to load 20 sample products:

```
https://YOUR-DOMAIN.vercel.app/api/seed?secret=shopcameroon2024
```

**IMPORTANT:** Replace `YOUR-DOMAIN` with your actual Vercel domain!

This will create:
- ✅ 1 Admin user
- ✅ 5 Categories (Electronics, Fashion, Phones & Tablets, Home & Kitchen, Groceries)
- ✅ 20 Sample Products with real images
- ✅ 4 Delivery Agencies

**Admin Credentials:**
- Email: `admin@shopcameroon.com`
- Password: `Admin@123`

## 2️⃣ Test the Site

After seeding:
1. Go to homepage: `https://YOUR-DOMAIN.vercel.app`
2. Click "Start Shopping" or go to `/products`
3. Click any product to see details
4. Click "Add to Cart" button
5. Cart should now work properly!

## 3️⃣ What Was Fixed

✅ Add to Cart buttons now have `type="button"` to prevent page redirects
✅ Product pages properly wrapped in Suspense boundaries
✅ 20 real sample products ready to load
✅ Database seed API route for easy setup

## 4️⃣ Security Note

After seeding the database, you should:
1. Delete or disable the `/api/seed` route in production
2. Or change the secret in the code to something only you know

The current secret is: `shopcameroon2024`

---

**Need help?** Check your Vercel deployment logs if anything fails.
