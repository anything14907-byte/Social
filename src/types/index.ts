export type AccountType = 'CREATIVE_CREATOR' | 'LOCAL_SELLER_ARTISAN';
export type MediaType = 'image' | 'video' | 'carousel';
export type CtaType = 'inquire_buy' | 'book_service' | 'whatsapp';

export interface Author {
  id: string;
  username: string;
  fullName: string;
  businessName?: string;
  accountType: AccountType;
  avatar: string;
  isVerifiedArtisan?: boolean;
  location?: string;
  state?: string;
  pincode?: string;
  bio?: string;
  rating?: number;
  reviewsCount?: number;
  upiId?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  slug: string;
  description: string;
}

export interface ProductDetails {
  title: string;
  price: number;
  pricingUnit?: string; // e.g. "per piece", "per meter", "per hour"
  currency: string; // 'INR'
  inStock: boolean;
  stockQuantity?: number;
  ctaType: CtaType;
  category: string;
  materialsUsed?: string;
  leadTimeDays?: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  text: string;
  createdAt: string;
  likesCount?: number;
}

export interface PostListing {
  id: string;
  author: Author;
  mediaUrls: string[];
  mediaType: MediaType;
  caption: string;
  category: string;
  location: string;
  state: string;
  pincode: string;
  isForSale: boolean;
  product?: ProductDetails;
  likesCount: number;
  commentsCount: number;
  inquiriesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  comments: Comment[];
}

export interface ShowcaseVideo {
  id: string;
  author: Author;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  category: string;
  productListingId?: string;
  productPrice?: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  location: string;
}

export interface OrderInquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  sellerId: string;
  sellerName: string;
  sellerPhone?: string;
  buyerName: string;
  buyerPhone: string;
  buyerCity: string;
  buyerPincode: string;
  buyerAddress?: string;
  inquiryType: 'PURCHASE' | 'CUSTOM_ORDER' | 'SERVICE_BOOKING';
  amount: number;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'FULFILLED';
  createdAt: string;
}

export interface UserProfile extends Author {
  email: string;
  phone: string;
  isPhoneVerified: boolean;
  postsCount: number;
  listingsCount: number;
  salesCount: number;
  gstin?: string;
  joinedDate: string;
  website?: string;
}
