# 🇮🇳 BharatGram (भारतग्राम)
### India's Modern Visual Social Network & Creator Commerce Platform

**BharatGram** is a full-stack, production-ready MVP for an Indian-focused social media photo- and video-sharing web application (an Instagram clone tailored for the 1.4-billion-strong Indian market). Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**, BharatGram brings high performance, dark/light mode elegance, authentic Indian cultural nuances, and built-in monetization architecture (Razorpay checkout in ₹, UPI support, Hyperlocal Post Boosts to Indian pincodes, and Verified KYC Badges).

---

## 🌟 Key Features

### 1. Indian-First Aesthetics & Navigation
- **Desktop Navigation:** Sleek left-hand sidebar containing: Brand Logo with Indian motif ("भ"), Home, Search, Explore, Reels, Messages, Notifications, Create, Storefront (₹ Shop), Profile, and More settings.
- **Mobile Navigation:** Fixed bottom tab bar (Home, Explore, Create (+), Reels, Profile) + top header with DM & Notification badges.
- **Dark & Light Mode:** Seamless toggle with persistent theme preference.

### 2. Stories & Main Feed
- **Stories Bar:** Horizontal scrolling bar with circular gradient avatars (unviewed gradient rings vs viewed neutral rings).
- **Fullscreen Story Viewer:** 5-second progress bars, tap navigation (left for prev, right for next), click-and-hold to pause, inline replies, and like reactions.
- **Post Card Component:**
  - Double-tap to heart animation with Framer Motion heart burst.
  - Multi-image / carousel support with dot indicator and smooth navigation.
  - Indian location tags (e.g. *Bandra Bandstand, Mumbai*, *Johari Bazaar, Jaipur*, *Chandni Chowk, Delhi*).
  - Like counter, formatted captions with hashtags (`#VocalForLocal`, `#IncredibleIndia`).
  - Inline comment posting + expandable comment drawer.
  - **Monetization Tag Pill:** Displays product title and ₹ price directly on the post.
  - **"Buy Now" / "Book Service" Button:** Triggers the integrated Razorpay Indian checkout modal.
  - **"Boost Post" Button:** For creators to promote posts to specific cities and pincodes.

### 3. Fullscreen Reels & Short Video Feed (`/reels`)
- Dedicated vertical snap-scrolling viewport with autoplay and sound toggle.
- Rotating vinyl disc animation with musical marquee for Indian tracks (e.g. *Kesariya*, *Naatu Naatu*, *Diljit Dosanjh - Lover*).
- Creator metadata with "Follow" toggle and location.
- Side action buttons (Heart, Comment drawer, Share to WhatsApp, Save).

### 4. Interactive Post Creator Modal ("Create")
- **Step 1:** Media file picker / dropzone + curated presets + Aspect Ratio cropping (`1:1` Square, `4:5` Portrait, `16:9` Landscape) + Indian color grading filters (*Jaipur Sun*, *Bollywood Glow*, *Old Bombay*).
- **Step 2:** Caption writer with hashtag chips (`#VocalForLocal`, `#DesiVibes`) + Indian City & 6-digit Pincode selector + Advanced controls (hide likes, turn off comments).
- **Step 3:** Monetization toggle to attach a Product/Service with price in ₹, delivery options, and CTA label.

### 5. Built-in Monetization Architecture (Crucial)
1. **Creator Storefront & Razorpay Checkout Modal:**
   - Supports Indian payment methods: **UPI** (Google Pay, PhonePe, Paytm, BHIM), **Credit/Debit Cards** (RuPay, Visa, Mastercard), **NetBanking** (HDFC, SBI, ICICI, Axis), and **Cash on Delivery**.
   - Generates simulated Razorpay order ID and payment verification.
2. **Hyperlocal Post Boost (Ad Placement):**
   - Creators can target local Indian audiences by City (Mumbai, Delhi, Bengaluru, Jaipur, etc.) or PIN code.
   - Budget tiers: ₹199 (~5,000 reach), ₹499 (~14,000 reach), ₹999 (~30,000 reach).
3. **Verified Badge Request (Blue Tick):**
   - Verification application with Indian KYC documentation (Aadhaar Card, PAN Card, GSTIN Certificate, Passport).
   - Instantly renders the verified blue checkmark across user profiles and posts.

### 6. Indian Authentication & Onboarding
- **+91 Mobile Number OTP Flow:** Formats 10-digit mobile number, generates 6-digit verification code with prefilled test OTP (`123456`).
- **Email & Password Login:** Fast login and session handling.
- **Google OAuth Simulation:** One-tap sign in.
- **Profile Setup Wizard:** Choose username, full name, avatar, bio, and home city/pincode.

---

## 🏗️ Project Directory Structure

```
bharatgram/
├── .env.example                       # Environment variables template
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.js                 # Tailwind CSS configuration with Indian brand colors
├── postcss.config.js                  # PostCSS plugins
├── next.config.mjs                    # Next.js App Router configuration
├── public/                            # Static assets
└── src/
    ├── app/                           # Next.js 14 App Router
    │   ├── layout.tsx                 # Root layout with providers & global navigation
    │   ├── globals.css                # Global styles, scrollbar, animations
    │   ├── page.tsx                   # Main Feed & Stories page
    │   ├── reels/page.tsx             # Fullscreen Reels feed
    │   ├── explore/page.tsx           # Explore page with search & categories
    │   ├── profile/page.tsx           # Current User profile page
    │   ├── [username]/page.tsx        # Dynamic Creator profile page
    │   ├── monetization/page.tsx      # Creator Storefront & Earnings Hub
    │   ├── messages/page.tsx          # Direct Messages (DMs)
    │   ├── notifications/page.tsx     # Activity notifications
    │   └── api/                       # Backend API routes
    │       ├── auth/
    │       │   ├── otp/send/route.ts   # +91 SMS OTP generator
    │       │   └── otp/verify/route.ts # OTP verification & JWT issuer
    │       ├── posts/
    │       │   ├── route.ts           # Fetch & create feed posts
    │       │   └── [id]/boost/route.ts# Hyperlocal city/pincode boost
    │       └── payment/
    │           └── razorpay/
    │               ├── create-order/route.ts # Razorpay order creator
    │               └── verify/route.ts       # Razorpay signature verifier
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx            # Desktop left sidebar
    │   │   ├── MobileNavbar.tsx       # Mobile top bar & bottom tab bar
    │   │   └── RightSuggestions.tsx   # Desktop right sidebar with trending Indian creators
    │   ├── feed/
    │   │   ├── StoriesBar.tsx         # Stories horizontal scroll
    │   │   ├── StoryViewerModal.tsx   # Fullscreen story viewer modal
    │   │   └── PostCard.tsx           # Post card with double-tap like, carousel & buy CTA
    │   ├── reels/
    │   │   ├── ReelsFeed.tsx          # Snap-scroll reels container
    │   │   └── ReelItem.tsx           # Individual reel card with sound, marquee & actions
    │   ├── create/
    │   │   └── CreatePostModal.tsx    # 3-step creator modal with aspect ratio & pricing
    │   ├── profile/
    │   │   ├── ProfileHeader.tsx      # Profile stats, avatar, verified badge
    │   │   ├── ProfileTabs.tsx        # Posts, Reels, Saved, Storefront tabs
    │   │   └── StorefrontGrid.tsx     # Product cards with ₹ prices and Buy Now buttons
    │   ├── monetization/
    │   │   ├── RazorpayCheckoutModal.tsx # UPI/Card/NetBanking checkout simulation
    │   │   ├── BoostPostModal.tsx     # Hyperlocal city/pincode boost campaign modal
    │   │   └── VerificationRequestModal.tsx # Blue badge KYC request
    │   ├── auth/
    │   │   ├── AuthModal.tsx          # Indian Mobile OTP & Email login
    │   │   └── ProfileSetupWizard.tsx # Indian onboarding wizard
    │   └── ui/
    │       └── ThemeToggle.tsx        # Dark / Light mode switcher
    ├── context/
    │   ├── AuthContext.tsx            # Authentication state & OTP provider
    │   ├── FeedContext.tsx            # Posts, Reels, Stories, and Commerce state
    │   ├── ThemeContext.tsx           # Dark/Light theme provider
    │   └── ToastContext.tsx           # Toast alerts provider
    ├── data/
    │   ├── seedData.ts                # Authentic Indian creators, posts, reels & products
    │   └── indianCities.ts            # Indian cities, states & postal pincodes
    ├── lib/
    │   ├── utils.ts                   # INR currency formatter (formatINR) & helpers
    │   └── storageService.ts          # AWS S3 / Firebase Storage abstraction
    ├── models/                        # Database Schemas (MongoDB / Mongoose / Prisma)
    │   ├── User.ts                    # User model with Indian phone & verification
    │   ├── Post.ts                    # Post model with product details & boost
    │   └── index.ts                   # Comment, Like, Story, Transaction, BoostCampaign models
    └── types/
        └── index.ts                   # TypeScript interfaces & domain types
```

---

## 🗄️ Database Schemas (MongoDB & PostgreSQL Ready)

The application provides production schemas in `src/models/` for:
- **`User`**: Username, Full Name, Email, +91 Phone (`isPhoneVerified`), Avatar, Bio, City, PIN code, `isVerified` (Blue tick), UPI VPA for direct settlements.
- **`Post`**: Author reference, Media URLs (Images/Videos), Aspect ratio, Caption, Indian Location & Pincode, Tags, Likes/Comments counters, `isMonetized`, `product` subdocument (Title, Price in INR, CTA type), `boost` subdocument (Target city, Pincode, Reach).
- **`Comment`**: Post ID, Author ID, Text, Likes counter.
- **`Like`**: Target ID (Post/Reel/Comment), Target Type, User ID.
- **`Story`**: Author ID, Media URL, Caption, SeenBy array, 24-hour TTL expiry (`expiresAt`).
- **`Transaction`**: Razorpay Order ID, Payment ID, Buyer, Seller, Amount in INR (₹), Payment Method (UPI / Card / NetBanking / COD), Status (`SUCCESS` / `PENDING`).
- **`BoostCampaign`**: Post ID, Budget in INR, Target City, Target Pincode, Estimated & Delivered Impressions.
- **`VerificationRequest`**: User ID, Full Legal Name, Document Type (Aadhaar / PAN / GSTIN / Passport), Document ID, Status (`PENDING` / `APPROVED`).

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm** or **pnpm** or **yarn**

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Key variables:
- `JWT_SECRET`: Secret key for session tokens.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay test key ID.
- `RAZORPAY_KEY_SECRET`: Your Razorpay secret key.
- `AWS_S3_BUCKET` / `AWS_REGION`: AWS Mumbai (`ap-south-1`) bucket for media CDN.
- `SMS_GATEWAY_PROVIDER`: MSG91 / Gupshup / Twilio for +91 SMS OTP.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```
All static and dynamic routes are optimized and pre-rendered.

---

## 💳 Testing the Built-in Monetization & OTP Features
1. **Indian Mobile (+91) OTP Login:** Click on the profile/auth button, choose **Indian Mobile OTP**, enter any 10-digit number (e.g. `9876543210`), and enter the test OTP **`123456`**.
2. **Buy with Razorpay (₹):** Browse the home feed or profile storefront tab, click **"Buy Now ₹3,499"** on the Banarasi Silk Saree or any product, choose UPI (GPay/PhonePe), and click **"Pay ₹3,499 Securely"**.
3. **Boost Post to Indian Pincodes:** Click the **"Boost Post"** button on any post, pick an Indian city (e.g. Mumbai, Bengaluru, Delhi) or enter a 6-digit PIN, select a budget tier (₹199 / ₹499 / ₹999), and click launch boost.
4. **Get Blue Checkmark:** Open the sidebar "More" menu, select **"Apply for Blue Verified Badge"**, pick Aadhaar/PAN verification, and click submit to activate the verified checkmark.
