/**
 * VyaparVibe - User Model
 * Production MongoDB / Mongoose Schema for Indian Social Commerce & Artisans
 */

export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  businessName?: string;
  accountType: 'CREATIVE_CREATOR' | 'LOCAL_SELLER_ARTISAN';
  email: string;
  passwordHash?: string;
  phone: string; // +91 Indian phone number
  isPhoneVerified: boolean;
  avatar: string;
  bio: string;
  city: string;
  state: string;
  pincode: string; // 6-digit Indian PIN code
  isVerifiedArtisan: boolean; // VyaparVibe Blue/Green Craft Badge
  gstin?: string; // Optional Indian GST identification
  upiId?: string; // Direct creator UPI VPA for buyer payments
  rating: number; // e.g. 4.9 out of 5
  reviewsCount: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  salesCount: number;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}
