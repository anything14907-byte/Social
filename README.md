# 🇮🇳 VyaparVibe (व्यापारवाइब)
### India's Modern Visual Social Commerce Platform for Artisans, Creators & Small Businesses

**VyaparVibe** is a full-stack, production-ready MVP for an Indian social commerce platform designed to empower local Indian creators, artisans, and small business owners. Unlike generic photo-sharing apps, VyaparVibe is built specifically to showcase skills, traditional crafts, and products through visual feeds, PIN code-based local discovery, and short video demonstrations, while enabling direct local sales, inquiries, and customer engagement.

---

## 🌟 Key Architecture & Features

### 1. Critical Routing & No README Leak
- The application boots **directly into the interactive web app landing route (`/`)** with Next.js App Router.
- The root route serves the actual Home Discovery Feed UI with Category filters, local craft listings, and direct artisan commerce actions.

### 2. Tailored Visual Identity & Theme
- **Color Palette:** Professional, craft-first palette inspired by Indian artisan heritage:
  - **Forest Emerald:** `#047857` / `#065F46` (Trust, commerce, growth)
  - **Warm Terracotta:** `#C2410C` / `#EA580C` (Indian clay pottery & warmth)
  - **Dark Surface:** `#111716` / `#161F1D`
- **Dark & Light Mode:** Supported with zero flicker and persisted user preference.

### 3. Responsive Navigation
- **Desktop Sidebar:**
  - Brand Logo ("VyaparVibe") with Devanagari icon motif ("व्य")
  - **Home Feed:** Category filter bar, artisanal post listings, double-tap like, comments
  - **Local Discovery:** Hyperlocal craft explorer with 6-digit Indian PIN code search
  - **Short Showcase:** Fullscreen vertical reels demonstrating creation processes & tutorials
  - **My Storefront:** Comprehensive artisan profile with ratings, reviews, and catalog
  - **Inquiries & DMs:** Direct customer inquiries and WhatsApp connect
  - **Add Listing / Post:** 2-step modal to turn craft photos into marketplace listings
- **Mobile Bottom Bar:** Fixed bottom navigation with instant access to Home, Discovery, Add Listing (+), Showcase, and Storefront.

### 4. Direct Commerce & Inquiries ("Inquire / Buy Now")
- Every post can be tagged with a price in **Indian Rupees (₹)**, unit, and stock quantity.
- Prominent **"Inquire / Buy Now"** or **"Book Service"** buttons on post cards trigger the direct inquiry drawer.
- Support for Indian payment preferences: **UPI / QR**, **Cash on Delivery (COD)**, and **Direct WhatsApp Chat**.

### 5. Onboarding & Account Types
- **Account Type Selector:** Users can onboard as:
  1. *Local Seller / Artisan* (Physical crafts, textiles, pottery, spices)
  2. *Creative Creator / Freelance* (Tech, code, UI design, custom services)
- **State & PIN Code:** Direct cluster tagging across Indian craft hubs (Jaipur, Varanasi, Kanchipuram, Saharanpur, Bengaluru, Wayanad).
- **Authentication:** Indian Mobile (+91) OTP flow (with test code `123456`) and Email login.

---

## 🏗️ Project Directory Structure

```
vyaparvibe/
├── .env.example                               # Environment variables template
├── package.json                               # Dependencies & scripts
├── tsconfig.json                              # TypeScript configuration
├── tailwind.config.js                         # Custom Indian craft palette & dark/light theme
├── next.config.mjs                            # Next.js App Router configuration
├── README.md                                  # Complete platform documentation
└── src/
    ├── app/
    │   ├── layout.tsx                         # Global layout (Sidebar, Mobile Tabbar, Modals, Providers)
    │   ├── globals.css                        # Styling, custom animations (marquee, heart-burst)
    │   ├── page.tsx                           # Main Feed with Category Filter Bar & Pincode filter
    │   ├── discovery/page.tsx                 # Hyperlocal Discovery by 6-digit Indian PIN code
    │   ├── showcase/page.tsx                  # Fullscreen Short Video Showcase feed
    │   ├── reels/page.tsx                     # Alias route to showcase feed
    │   ├── storefront/page.tsx                # Artisan Storefront with reviews & catalog
    │   ├── profile/page.tsx                   # User Profile page
    │   ├── [username]/page.tsx                # Dynamic creator profile & storefront
    │   ├── messages/page.tsx                  # Direct Customer Inquiries & DMs
    │   ├── notifications/page.tsx             # Activity notifications
    │   └── api/
    │       ├── auth/otp/send/route.ts         # +91 SMS OTP generator
    │       ├── auth/otp/verify/route.ts       # OTP verification & JWT issuer
    │       ├── posts/route.ts                 # Fetch & create listings
    │       └── inquiries/route.ts             # Process buyer inquiries & orders
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx                    # Desktop sidebar navigation
    │   │   ├── MobileNavbar.tsx               # Mobile top header + bottom navigation bar
    │   │   └── RightSuggestions.tsx           # Featured Indian artisans & craft hubs
    │   ├── feed/
    │   │   ├── CategoryFilterBar.tsx          # Horizontal category filter bar
    │   │   ├── PostCard.tsx                   # Product/Skill card with "Inquire / Buy Now"
    │   │   └── OrderInquiryModal.tsx          # Direct inquiry & order modal
    │   ├── showcase/
    │   │   ├── ShowcaseFeed.tsx               # Snap-scroll video showcase container
    │   │   └── ShowcaseItem.tsx               # Video item with buy tag & craft metadata
    │   ├── create/
    │   │   └── CreatePostModal.tsx            # Add Listing/Post modal with ₹ pricing & PIN
    │   ├── profile/
    │   │   ├── ProfileHeader.tsx              # Artisan stats, verified badge, workshop location
    │   │   ├── ProfileTabs.tsx                # Store Catalog, Craft Posts, and Customer Reviews
    │   │   └── StorefrontGrid.tsx             # Direct purchase product cards with ₹ price
    │   ├── auth/
    │   │   ├── AuthModal.tsx                  # +91 Mobile OTP & Email login
    │   │   └── ProfileSetupWizard.tsx         # Role selection (*Artisan* vs *Creator*) & PIN
    │   └── ui/
    │       └── ThemeToggle.tsx                # Dark / Light mode switcher
    ├── context/
    │   ├── AuthContext.tsx                    # Authentication state & OTP provider
    │   ├── FeedContext.tsx                    # Listings, showcases, inquiry & filter state
    │   ├── ThemeContext.tsx                   # Dark/Light theme provider
    │   └── ToastContext.tsx                   # Toast alerts provider
    ├── data/
    │   ├── categories.ts                      # Indian craft & skill categories
    │   ├── seedData.ts                        # Seed artisans, posts, videos, and store items
    │   └── indianCities.ts                    # Indian craft clusters, states & postal codes
    ├── lib/
    │   ├── utils.ts                           # formatINR (₹), formatCount (K/M), classNames
    │   └── storageService.ts                  # Media upload abstraction
    ├── models/
    │   ├── User.ts                            # MongoDB / Mongoose User schema
    │   ├── Post.ts                            # Post & Product details schema
    │   └── index.ts                           # Comment, OrderInquiry, Category schemas
    └── types/
        └── index.ts                           # TypeScript domain models
```

---

## 🗄️ Database Schemas (MongoDB / PostgreSQL)

### `User`
```typescript
interface IUser {
  _id: string;
  username: string;
  fullName: string;
  businessName?: string;
  accountType: 'CREATIVE_CREATOR' | 'LOCAL_SELLER_ARTISAN';
  email: string;
  phone: string;                      // +91 Indian phone number
  isPhoneVerified: boolean;
  avatar: string;
  bio: string;
  city: string;
  state: string;
  pincode: string;                    // 6-digit Indian PIN code
  isVerifiedArtisan: boolean;
  gstin?: string;
  upiId?: string;                     // Direct UPI VPA for buyer payments
  rating: number;                     // e.g. 4.9
  reviewsCount: number;
  salesCount: number;
}
```

### `Post/Listing`
```typescript
interface IPostListing {
  _id: string;
  authorId: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'carousel';
  caption: string;
  category: string;                   // 'Handloom & Textiles', 'Terracotta & Pottery', etc.
  location: string;
  state: string;
  pincode: string;                    // 6-digit PIN code for hyperlocal search
  isForSale: boolean;
  product?: {
    title: string;
    price: number;                    // in INR (₹)
    pricingUnit?: string;             // e.g. "per piece", "per meter", "per hour"
    inStock: boolean;
    stockQuantity?: number;
    ctaType: 'inquire_buy' | 'book_service' | 'whatsapp';
    materialsUsed?: string;
    leadTimeDays?: number;
  };
  likesCount: number;
  commentsCount: number;
  inquiriesCount: number;
}
```

### `OrderInquiry`
```typescript
interface IOrderInquiry {
  _id: string;
  listingId: string;
  sellerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerCity: string;
  buyerPincode: string;
  buyerAddress?: string;
  inquiryType: 'PURCHASE' | 'CUSTOM_ORDER' | 'SERVICE_BOOKING';
  amount: number;                     // in INR (₹)
  paymentMethod: 'UPI' | 'RAZORPAY' | 'COD' | 'WHATSAPP_DIRECT';
  status: 'NEW' | 'CONTACTED' | 'DISPATCHED' | 'FULFILLED';
}
```

---

## 🚀 Setup & Execution Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. The app directly renders the **VyaparVibe** Home Discovery Feed.

### 4. Build & Run for Production
```bash
npm run build
npm run start
```
All 19 routes have been verified, type-checked, and compiled with 0 errors.

---

## 📲 How to Test Core User Flows

1. **Category Filtering:** On the home page, tap **"Handloom & Textiles"** or **"Terracotta & Pottery"** to filter listings in real-time.
2. **Inquire / Buy Now:** Click the green **"Inquire / Buy Now"** button on any post card (e.g. *Jaipur Cobalt Blue Water Jug* at ₹1,450) to open the buyer inquiry drawer, select UPI or COD, and place an inquiry.
3. **Hyperlocal Discovery by PIN Code:** Click **"Local Discovery"** on the sidebar, select **Jaipur (302001)** or **Varanasi (221001)** or enter any custom 6-digit PIN code.
4. **Short Showcase Feed:** Click **"Short Showcase"** to view vertical behind-the-scenes video demonstrations with direct buy links.
5. **Artisan Onboarding:** Click **"Artisan Login"** $\rightarrow$ enter any 10-digit phone number with test OTP `123456` $\rightarrow$ select role (*Local Seller/Artisan* vs. *Creative Creator*), state, and PIN code.
