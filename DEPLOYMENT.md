# 🚀 Deployment Guide - ShopCameroon

Complete guide to deploying your ecommerce platform to production.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Admin password changed from default
- [ ] JWT_SECRET updated to strong random string
- [ ] Sample data removed or replaced with real products
- [ ] Payment gateway tested with real credentials
- [ ] WhatsApp number configured
- [ ] Database optimized and indexed
- [ ] Environment variables documented

## 🌐 Deployment Options

### Option 1: Vercel + Railway (Recommended)

**Pros**: Easy setup, automatic deployments, free tier available
**Cons**: Serverless limitations, cold starts

#### Step 1: Deploy Database to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision MySQL"
4. Wait for database to be provisioned
5. Click on database → "Variables" tab
6. Copy the `DATABASE_URL`

#### Step 2: Prepare Repository

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/shopcameroon.git
git push -u origin main
```

#### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   ```
   DATABASE_URL=mysql://...
   JWT_SECRET=your-super-secret-key
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=+2376XXXXXXXX
   FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-...
   FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-...
   FLUTTERWAVE_ENCRYPTION_KEY=...
   ```
6. Click "Deploy"
7. Wait for build to complete
8. Your site is live!

#### Step 4: Setup Custom Domain (Optional)

1. In Vercel dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., shopcameroon.com)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Option 2: DigitalOcean VPS

**Pros**: Full control, predictable pricing, no serverless limitations
**Cons**: Requires server management, manual deployments

#### Step 1: Create Droplet

1. Go to https://digitalocean.com
2. Create Ubuntu 22.04 LTS droplet
3. Choose plan (minimum: 2GB RAM, 1 CPU)
4. Add SSH key for authentication
5. Create droplet

#### Step 2: Connect to Server

```bash
ssh root@your-server-ip
```

#### Step 3: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install MySQL
apt install -y mysql-server

# Install PM2 for process management
npm install -g pm2

# Install Nginx
apt install -y nginx
```

#### Step 4: Setup MySQL

```bash
# Secure MySQL installation
mysql_secure_installation

# Create database
mysql -u root -p
CREATE DATABASE shopcameroon;
CREATE USER 'shopuser'@'localhost' IDENTIFIED BY 'strong-password';
GRANT ALL PRIVILEGES ON shopcameroon.* TO 'shopuser'@'localhost';
FLUSH PRIVILEGES;
exit;
```

#### Step 5: Deploy Application

```bash
# Clone repository
cd /var/www
git clone https://github.com/yourusername/shopcameroon.git
cd shopcameroon

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Build application
npm run build

# Initialize database
npm run db:push
npm run db:generate
npm run db:seed
```

#### Step 6: Setup PM2

```bash
# Start application
pm2 start npm --name "shopcameroon" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
```

#### Step 7: Configure Nginx

```bash
nano /etc/nginx/sites-available/shopcameroon
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/shopcameroon /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### Step 8: Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
```

## 🔧 Environment Variables for Production

Create these in your hosting platform:

```env
# Database (from your hosting provider)
DATABASE_URL="mysql://user:password@host:3306/shopcameroon"

# Security (generate strong random strings)
JWT_SECRET="generate-a-strong-random-string-here"

# Application
NEXT_PUBLIC_API_URL="https://your-domain.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="+2376XXXXXXXX"

# Flutterwave (get from production dashboard)
FLUTTERWAVE_SECRET_KEY="FLWSECK_PROD-..."
FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
FLUTTERWAVE_ENCRYPTION_KEY="..."
```

### Generate Strong JWT Secret

```bash
# Linux/Mac
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 💳 Payment Gateway Setup

### Flutterwave Production

1. Login to https://dashboard.flutterwave.com
2. Switch to "Live" mode
3. Go to Settings → API Keys
4. Copy production keys
5. Update environment variables
6. Setup webhook URL:
   - URL: `https://your-domain.com/api/payments/webhook`
   - Events: Payment completed, Payment failed

### Testing Production Payments

1. Use test cards first
2. Verify webhook is receiving events
3. Test with small real transaction
4. Monitor logs for errors

## 📊 Post-Deployment Tasks

### 1. Verify Everything Works

```bash
# Check application logs
# Vercel: Dashboard → Logs
# VPS: pm2 logs shopcameroon

# Test endpoints
curl https://your-domain.com/api/products
curl https://your-domain.com/api/categories
```

### 2. Monitor Performance

- **Vercel**: Built-in analytics
- **VPS**: Install monitoring tools
  ```bash
  # Install htop
  apt install -y htop
  
  # Monitor in real-time
  htop
  ```

### 3. Setup Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user analytics

### 4. Backup Database

**Manual backup:**
```bash
mysqldump -u user -p shopcameroon > backup.sql
```

**Automated backup (VPS):**
```bash
# Create backup script
nano /usr/local/bin/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p'password' shopcameroon > /backups/shopcameroon_$DATE.sql
find /backups -name "*.sql" -mtime +7 -delete
```

```bash
# Make executable
chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /usr/local/bin/backup-db.sh
```

### 5. Update Admin Password

Login to admin dashboard and change password immediately!

### 6. Configure Email Notifications

Consider adding email service for:
- Order confirmations
- Payment receipts
- Admin notifications

Options:
- SendGrid
- Mailgun
- AWS SES

## 🔒 Security Hardening

### VPS Security

```bash
# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Disable root SSH login
nano /etc/ssh/sshd_config
# Change: PermitRootLogin no

# Restart SSH
systemctl restart sshd

# Setup automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

### Application Security

- ✅ HTTPS enabled
- ✅ HTTP-only cookies for admin
- ✅ Input validation on all endpoints
- ✅ Rate limiting (consider adding)
- ✅ CORS configuration
- ✅ Environment variables secured

## 📈 Performance Optimization

### Database Optimization

```sql
-- Add indexes for frequent queries
ALTER TABLE Product ADD INDEX idx_active_slug (isActive, slug);
ALTER TABLE Order ADD INDEX idx_status_date (orderStatus, createdAt);
```

### Next.js Optimization

Already configured:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Server-side rendering
- ✅ Static generation where possible

### CDN (Optional)

Vercel includes CDN automatically.
For VPS, consider Cloudflare.

## 🔄 Deployment Workflow

### Continuous Deployment (Vercel)

Every push to `main` branch automatically deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically builds and deploys
```

### Manual Deployment (VPS)

```bash
# On server
cd /var/www/shopcameroon
git pull
npm install
npm run build
pm2 restart shopcameroon
```

## 🐛 Troubleshooting

### Issue: Application won't start

```bash
# Check logs
pm2 logs shopcameroon

# Check environment variables
pm2 env shopcameroon

# Restart
pm2 restart shopcameroon
```

### Issue: Database connection error

- Verify DATABASE_URL is correct
- Check database is running
- Verify firewall allows database port
- Test connection manually

### Issue: Payments not working

- Check Flutterwave keys are production keys
- Verify webhook URL is accessible
- Check webhook endpoint logs
- Test with Flutterwave dashboard

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **DigitalOcean Docs**: https://www.digitalocean.com/docs
- **Flutterwave Docs**: https://developer.flutterwave.com

## ✅ Deployment Checklist

- [ ] Database deployed and accessible
- [ ] All environment variables set
- [ ] Application builds successfully
- [ ] Homepage loads
- [ ] Admin login works
- [ ] Products display correctly
- [ ] Checkout flow works
- [ ] Payment gateway configured
- [ ] Webhook URL setup
- [ ] HTTPS enabled
- [ ] Custom domain configured
- [ ] Database backups configured
- [ ] Monitoring setup
- [ ] Admin password changed
- [ ] Error tracking configured

---

**Congratulations! Your ShopCameroon platform is now live!** 🎉🇨🇲
