/**
 * VyaparVibe - Comment, OrderInquiry & Category Database Schemas
 */

export interface IComment {
  _id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: Date;
}

export interface IOrderInquiry {
  _id: string;
  listingId: string;
  sellerId: string;
  buyerName: string;
  buyerPhone: string; // +91 Indian phone
  buyerCity: string;
  buyerPincode: string;
  buyerAddress?: string;
  inquiryType: 'PURCHASE' | 'CUSTOM_ORDER' | 'SERVICE_BOOKING';
  amount: number; // in INR (₹)
  message?: string;
  paymentMethod: 'UPI' | 'RAZORPAY' | 'COD' | 'WHATSAPP_DIRECT';
  paymentStatus: 'PENDING' | 'PAID' | 'COD_CONFIRMED';
  status: 'NEW' | 'CONTACTED' | 'DISPATCHED' | 'FULFILLED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  featuredArtisansCount: number;
}
