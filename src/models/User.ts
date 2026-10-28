/**
 * BharatGram - User Model
 * Production MongoDB / Mongoose Schema for Indian Social Network Users
 */

export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  passwordHash?: string;
  phone?: string; // +91 Indian phone number
  isPhoneVerified: boolean;
  avatar: string;
  bio: string;
  website?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isVerified: boolean; // BharatGram Blue Badge
  verificationCategory?: 'CREATOR' | 'BUSINESS' | 'GOVERNMENT' | 'PUBLIC_FIGURE';
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isCreator: boolean;
  businessGstNumber?: string;
  upiId?: string; // For creator direct payouts (e.g. creator@okhdfcbank)
  createdAt: Date;
  updatedAt: Date;
}

// In MongoDB with Mongoose:
/*
import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    passwordHash: { type: String, select: false },
    phone: { type: String, index: true, match: [/^\+91[6-9]\d{9}$/, 'Please enter a valid +91 Indian phone number'] },
    isPhoneVerified: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
    bio: { type: String, maxlength: 160, default: '' },
    website: { type: String, default: '' },
    city: { type: String, index: true },
    state: { type: String },
    pincode: { type: String, index: true, match: [/^[1-9][0-9]{5}$/, 'Invalid Indian 6-digit PIN code'] },
    isVerified: { type: Boolean, default: false },
    verificationCategory: { type: String, enum: ['CREATOR', 'BUSINESS', 'GOVERNMENT', 'PUBLIC_FIGURE'] },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    isCreator: { type: Boolean, default: false },
    businessGstNumber: { type: String },
    upiId: { type: String },
  },
  { timestamps: true }
);

UserSchema.index({ city: 1, pincode: 1 });
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
*/

