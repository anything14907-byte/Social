'use client';

import React, { createContext, useContext, useState } from 'react';
import { Post, Reel, Story, ProductDetails, Comment } from '@/types';
import { SEED_POSTS, SEED_REELS, SEED_STORIES, CURRENT_USER } from '@/data/seedData';
import { useToast } from './ToastContext';

interface FeedContextType {
  posts: Post[];
  stories: Story[];
  reels: Reel[];
  activeStoryIndex: number | null;
  openStoryViewer: (index: number) => void;
  closeStoryViewer: () => void;
  nextStory: () => void;
  prevStory: () => void;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  selectedProductForCheckout: { product: ProductDetails; postAuthor: string } | null;
  openCheckout: (product: ProductDetails, postAuthor: string) => void;
  closeCheckout: () => void;
  selectedPostForBoost: Post | null;
  openBoostModal: (post: Post) => void;
  closeBoostModal: () => void;
  isVerificationModalOpen: boolean;
  openVerificationModal: () => void;
  closeVerificationModal: () => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (postData: Partial<Post>) => void;
  applyBoostToPost: (postId: string, targetCity: string, pincode: string, budget: number) => void;
  toggleLikeReel: (reelId: string) => void;
  toggleSaveReel: (reelId: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [stories, setStories] = useState<Story[]>(SEED_STORIES);
  const [reels, setReels] = useState<Reel[]>(SEED_REELS);

  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState<{
    product: ProductDetails;
    postAuthor: string;
  } | null>(null);
  const [selectedPostForBoost, setSelectedPostForBoost] = useState<Post | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const { toast } = useToast();

  const openStoryViewer = (index: number) => {
    setActiveStoryIndex(index);
    // Mark story as seen
    setStories((prev) =>
      prev.map((s, i) => (i === index ? { ...s, hasSeen: true } : s))
    );
  };

  const closeStoryViewer = () => setActiveStoryIndex(null);

  const nextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      closeStoryViewer();
    }
  };

  const prevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openCheckout = (product: ProductDetails, postAuthor: string) => {
    setSelectedProductForCheckout({ product, postAuthor });
  };
  const closeCheckout = () => setSelectedProductForCheckout(null);

  const openBoostModal = (post: Post) => setSelectedPostForBoost(post);
  const closeBoostModal = () => setSelectedPostForBoost(null);

  const openVerificationModal = () => setIsVerificationModalOpen(true);
  const closeVerificationModal = () => setIsVerificationModalOpen(false);

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const count = isLiked ? p.likesCount + 1 : p.likesCount - 1;
          return { ...p, isLiked, likesCount: count };
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
          toast(isSaved ? 'Post saved to your collection' : 'Post removed from saved', 'info');
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
      likesCount: 0,
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
    toast('Comment posted!', 'success');
  };

  const createPost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        id: CURRENT_USER.id,
        username: CURRENT_USER.username,
        fullName: CURRENT_USER.fullName,
        avatar: CURRENT_USER.avatar,
        isVerified: CURRENT_USER.isVerified,
        location: postData.location || 'India',
      },
      mediaUrls: postData.mediaUrls && postData.mediaUrls.length > 0
        ? postData.mediaUrls
        : ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'],
      mediaType: postData.mediaType || 'image',
      aspectRatio: postData.aspectRatio || '1:1',
      caption: postData.caption || '',
      location: postData.location || 'Mumbai, Maharashtra',
      pincode: postData.pincode || '400001',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'Just now',
      comments: [],
      isMonetized: postData.isMonetized || false,
      product: postData.product,
    };

    setPosts([newPost, ...posts]);
    closeCreateModal();
    toast('Your post has been shared across BharatGram!', 'success');
  };

  const applyBoostToPost = (postId: string, targetCity: string, pincode: string, budget: number) => {
    const reachEstimate = Math.round(budget * 25);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            boost: {
              isBoosted: true,
              targetCity,
              targetPincode: pincode,
              budget,
              reachEstimate,
            },
          };
        }
        return p;
      })
    );
    closeBoostModal();
    toast(`Post boosted successfully! Targeted to ${targetCity} (Est. reach: ${reachEstimate.toLocaleString()} users)`, 'success');
  };

  const toggleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const isLiked = !r.isLiked;
          return {
            ...r,
            isLiked,
            likesCount: isLiked ? r.likesCount + 1 : r.likesCount - 1,
          };
        }
        return r;
      })
    );
  };

  const toggleSaveReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const isSaved = !r.isSaved;
          toast(isSaved ? 'Reel saved' : 'Reel removed', 'info');
          return { ...r, isSaved };
        }
        return r;
      })
    );
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        stories,
        reels,
        activeStoryIndex,
        openStoryViewer,
        closeStoryViewer,
        nextStory,
        prevStory,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        selectedProductForCheckout,
        openCheckout,
        closeCheckout,
        selectedPostForBoost,
        openBoostModal,
        closeBoostModal,
        isVerificationModalOpen,
        openVerificationModal,
        closeVerificationModal,
        toggleLikePost,
        toggleSavePost,
        addComment,
        createPost,
        applyBoostToPost,
        toggleLikeReel,
        toggleSaveReel,
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

