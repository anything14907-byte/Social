/**
 * VyaparVibe - Post / Listing Model
 * Production MongoDB / Mongoose Schema for Indian Artisanal Products & Skill Showcases
 */

export interface IProductDetails {
  title: string;
  price: number; // in INR (₹)
  pricingUnit?: string; // e.g. "per piece", "per meter", "per hour"
  currency: string; // 'INR'
  inStock: boolean;
  stockQuantity?: number;
  ctaType: 'inquire_buy' | 'book_service' | 'whatsapp';
  category: string;
  materialsUsed?: string;
  leadTimeDays?: number;
}

export interface IPostListing {
  _id: string;
  authorId: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'carousel';
  caption: string;
  category: string; // e.g. 'Handloom & Textiles', 'Terracotta & Pottery'
  location: string;
  state: string;
  pincode: string; // 6-digit PIN code for hyperlocal filtering
  isForSale: boolean;
  product?: IProductDetails;
  likesCount: number;
  commentsCount: number;
  inquiriesCount: number;
  createdAt: Date;
  updatedAt: Date;
}
