/**
 * BharatGram - Post Model
 * Production MongoDB / Mongoose Schema for Indian Social Network Posts & Commerce
 */

export interface IProductDetails {
  title: string;
  price: number; // in INR (₹)
  currency: string; // 'INR'
  checkoutUrl?: string;
  ctaType: 'buy_now' | 'book_service' | 'order_whatsapp';
  category?: string;
  inStock: boolean;
}

export interface IBoostDetails {
  isBoosted: boolean;
  campaignId?: string;
  targetCity?: string;
  targetPincode?: string;
  budget?: number;
  reachEstimate?: number;
}

export interface IPost {
  _id: string;
  authorId: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'carousel';
  caption: string;
  location?: string;
  city?: string;
  pincode?: string;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  commentsDisabled: boolean;
  hideLikes: boolean;
  isMonetized: boolean;
  product?: IProductDetails;
  boost?: IBoostDetails;
  createdAt: Date;
  updatedAt: Date;
}

// In MongoDB with Mongoose:
/*
import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  checkoutUrl: { type: String },
  ctaType: { type: String, enum: ['buy_now', 'book_service', 'order_whatsapp'], default: 'buy_now' },
  category: { type: String },
  inStock: { type: Boolean, default: true },
});

const BoostSchema = new Schema({
  isBoosted: { type: Boolean, default: false },
  campaignId: { type: Schema.Types.ObjectId, ref: 'BoostCampaign' },
  targetCity: { type: String },
  targetPincode: { type: String },
  budget: { type: Number },
  reachEstimate: { type: Number },
});

const PostSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mediaUrls: [{ type: String, required: true }],
    mediaType: { type: String, enum: ['image', 'video', 'carousel'], default: 'image' },
    caption: { type: String, maxlength: 2200, default: '' },
    location: { type: String },
    city: { type: String, index: true },
    pincode: { type: String, index: true },
    aspectRatio: { type: String, enum: ['1:1', '4:5', '16:9', '9:16'], default: '1:1' },
    tags: [{ type: String, lowercase: true, index: true }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    commentsDisabled: { type: Boolean, default: false },
    hideLikes: { type: Boolean, default: false },
    isMonetized: { type: Boolean, default: false, index: true },
    product: { type: ProductSchema },
    boost: { type: BoostSchema },
  },
  { timestamps: true }
);

PostSchema.index({ createdAt: -1 });
PostSchema.index({ city: 1, createdAt: -1 });
export const PostModel = mongoose.models.Post || mongoose.model('Post', PostSchema);
*/

