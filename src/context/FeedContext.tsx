'use client';

import React, { createContext, useContext, useState } from 'react';
import { PostListing, ShowcaseVideo, OrderInquiry, Comment } from '@/types';
import { SEED_POSTS, SEED_SHOWCASE_VIDEOS, CURRENT_USER } from '@/data/seedData';
import { useToast } from './ToastContext';

interface FeedContextType {
  posts: PostListing[];
  showcases: ShowcaseVideo[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPincode: string;
  setSelectedPincode: (pincode: string) => void;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  selectedListingForInquiry: PostListing | null;
  openInquiryModal: (listing: PostListing) => void;
  closeInquiryModal: () => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createListing: (data: Partial<PostListing>) => void;
  submitOrderInquiry: (inquiryData: Partial<OrderInquiry>) => void;
  toggleLikeShowcase: (showcaseId: string) => void;
  toggleSaveShowcase: (showcaseId: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<PostListing[]>(SEED_POSTS);
  const [showcases, setShowcases] = useState<ShowcaseVideo[]>(SEED_SHOWCASE_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPincode, setSelectedPincode] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedListingForInquiry, setSelectedListingForInquiry] = useState<PostListing | null>(null);

  const { toast } = useToast();

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openInquiryModal = (listing: PostListing) => setSelectedListingForInquiry(listing);
  const closeInquiryModal = () => setSelectedListingForInquiry(null);

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          toast(isSaved ? 'Item saved to your craft collection' : 'Removed from collection', 'info');
          return { ...p, isSaved };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      postId,
      user: {
        id: CURRENT_USER.id,
        username: CURRENT_USER.username,
        fullName: CURRENT_USER.fullName,
        avatar: CURRENT_USER.avatar,
      },
      text: text.trim(),
      createdAt: 'Just now',
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...p.comments],
          };
        }
        return p;
      })
    );
    toast('Comment submitted directly to creator!', 'success');
  };

  const createListing = (data: Partial<PostListing>) => {
    const newPost: PostListing = {
      id: `post_vv_${Date.now()}`,
      author: {
        id: CURRENT_USER.id,
        username: CURRENT_USER.username,
        fullName: CURRENT_USER.fullName,
        businessName: CURRENT_USER.businessName,
        accountType: CURRENT_USER.accountType,
        avatar: CURRENT_USER.avatar,
        isVerifiedArtisan: CURRENT_USER.isVerifiedArtisan,
        location: `${data.location || CURRENT_USER.location}`,
        state: data.state || CURRENT_USER.state || 'Rajasthan',
        pincode: data.pincode || CURRENT_USER.pincode || '302001',
        rating: 5.0,
        reviewsCount: 1,
      },
      mediaUrls: data.mediaUrls && data.mediaUrls.length > 0
        ? data.mediaUrls
        : ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80'],
      mediaType: data.mediaType || 'image',
      caption: data.caption || '',
      category: data.category || 'Handloom & Textiles',
      location: data.location || CURRENT_USER.location || 'Jaipur',
      state: data.state || 'Rajasthan',
      pincode: data.pincode || '302001',
      isForSale: data.isForSale || false,
      product: data.product,
      likesCount: 0,
      commentsCount: 0,
      inquiriesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'Just now',
      comments: [],
    };

    setPosts([newPost, ...posts]);
    closeCreateModal();
    toast('New listing & craft showcase published across VyaparVibe!', 'success');
  };

  const submitOrderInquiry = (inquiryData: Partial<OrderInquiry>) => {
    // Increase inquiry count on listing
    if (inquiryData.listingId) {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === inquiryData.listingId) {
            return { ...p, inquiriesCount: (p.inquiriesCount || 0) + 1 };
          }
          return p;
        })
      );
    }
    closeInquiryModal();
    toast(`Inquiry sent to ${inquiryData.sellerName || 'creator'}! They will reach out via WhatsApp/Call.`, 'success');
  };

  const toggleLikeShowcase = (id: string) => {
    setShowcases((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likesCount: isLiked ? s.likesCount + 1 : s.likesCount - 1,
          };
        }
        return s;
      })
    );
  };

  const toggleSaveShowcase = (id: string) => {
    setShowcases((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const isSaved = !s.isSaved;
          toast(isSaved ? 'Video showcase saved' : 'Showcase removed', 'info');
          return { ...s, isSaved };
        }
        return s;
      })
    );
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        showcases,
        selectedCategory,
        setSelectedCategory,
        selectedPincode,
        setSelectedPincode,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        selectedListingForInquiry,
        openInquiryModal,
        closeInquiryModal,
        toggleLikePost,
        toggleSavePost,
        addComment,
        createListing,
        submitOrderInquiry,
        toggleLikeShowcase,
        toggleSaveShowcase,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeed must be used within FeedProvider');
  }
  return context;
}
