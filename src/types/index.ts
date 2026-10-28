export type MediaType = 'image' | 'video' | 'carousel';

export interface Author {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isVerified?: boolean;
  location?: string;
  bio?: string;
}

export interface ProductDetails {
  title: string;
  price: number;
  currency: string; // 'INR'
  checkoutUrl?: string;
  ctaType: 'buy_now' | 'book_service' | 'order_whatsapp';
  category?: string;
  inStock?: boolean;
}

export interface BoostDetails {
  isBoosted: boolean;
  campaignId?: string;
  targetCity?: string;
  targetPincode?: string;
  budget?: number;
  reachEstimate?: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: Author;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  author: Author;
  mediaUrls: string[];
  mediaType: MediaType;
  caption: string;
  location?: string;
  pincode?: string;
  aspectRatio?: '1:1' | '4:5' | '16:9' | '9:16';
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsDisabled?: boolean;
  hideLikes?: boolean;
  createdAt: string;
  comments: Comment[];
  isMonetized?: boolean;
  product?: ProductDetails;
  boost?: BoostDetails;
}

export interface Story {
  id: string;
  author: Author;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration?: number; // seconds
  caption?: string;
  createdAt: string;
  expiresAt: string;
  hasSeen?: boolean;
}

export interface Reel {
  id: string;
  author: Author;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  audioTrack: {
    title: string;
    artist: string;
    isOriginal?: boolean;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  location?: string;
  product?: ProductDetails;
  comments: Comment[];
}

export interface UserProfile extends Author {
  email: string;
  phone?: string;
  isPhoneVerified?: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  website?: string;
  pincode?: string;
  category?: string;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  type: 'PRODUCT_PURCHASE' | 'POST_BOOST' | 'VERIFICATION_BADGE';
  description: string;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET';
  createdAt: string;
}
