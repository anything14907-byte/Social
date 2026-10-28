/**
 * BharatGram - Comment, Like, Story, Transaction, BoostCampaign & Verification Models
 */

export interface IComment {
  _id: string;
  postId: string;
  authorId: string;
  text: string;
  likesCount: number;
  createdAt: Date;
}

export interface ILike {
  _id: string;
  targetId: string; // postId or reelId or commentId
  targetType: 'POST' | 'REEL' | 'COMMENT';
  userId: string;
  createdAt: Date;
}

export interface IStory {
  _id: string;
  authorId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  seenBy: string[]; // userIds
  expiresAt: Date; // TTL 24 Hours
  createdAt: Date;
}

export interface ITransaction {
  _id: string;
  orderId: string; // Razorpay order id (order_xxx)
  paymentId: string; // Razorpay payment id (pay_xxx)
  signature?: string;
  buyerId: string;
  sellerId?: string;
  postId?: string;
  amount: number; // in INR
  currency: string; // 'INR'
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  type: 'PRODUCT_PURCHASE' | 'POST_BOOST' | 'VERIFICATION_BADGE';
  description: string;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET' | 'COD';
  customerPhone?: string;
  customerAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: Date;
}

export interface IBoostCampaign {
  _id: string;
  postId: string;
  creatorId: string;
  budgetInr: number;
  durationDays: number;
  targetCity?: string;
  targetPincode?: string;
  estimatedImpressions: number;
  impressionsDelivered: number;
  clicks: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  createdAt: Date;
}

export interface IVerificationRequest {
  _id: string;
  userId: string;
  fullName: string;
  documentType: 'AADHAAR' | 'PAN' | 'GSTIN' | 'PASSPORT';
  documentNumber: string;
  documentFrontUrl: string;
  category: 'CREATOR' | 'BUSINESS' | 'GOVERNMENT' | 'ENTERTAINMENT' | 'JOURNALIST';
  socialLinks: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  feePaidInr: number; // ₹499 verification fee (Meta verified model for India)
  createdAt: Date;
}

