'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AccountType } from '@/types';
import { CURRENT_USER } from '@/data/seedData';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  isSetupWizardOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openSetupWizard: () => void;
  closeSetupWizard: () => void;
  loginWithEmail: (email: string) => Promise<boolean>;
  sendMobileOtp: (mobile: string) => Promise<{ success: boolean; testOtp?: string }>;
  verifyMobileOtp: (otp: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
  tempPhone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(CURRENT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('vyaparvibe_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(CURRENT_USER);
      }
    }
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openSetupWizard = () => setIsSetupWizardOpen(true);
  const closeSetupWizard = () => setIsSetupWizardOpen(false);

  const loginWithEmail = async (email: string) => {
    const updated: UserProfile = {
      ...CURRENT_USER,
      email,
      username: email.split('@')[0],
    };
    setUser(updated);
    localStorage.setItem('vyaparvibe_user', JSON.stringify(updated));
    closeAuthModal();
    toast(`Namaste! Logged in as ${updated.fullName} (${updated.businessName || 'VyaparVibe Member'})`, 'success');
    return true;
  };

  const sendMobileOtp = async (mobile: string) => {
    const cleaned = mobile.replace(/\D/g, '').slice(-10);
    if (cleaned.length !== 10) {
      toast('Please enter a valid 10-digit Indian mobile number', 'error');
      return { success: false };
    }
    const fullNumber = `+91 ${cleaned}`;
    setTempPhone(fullNumber);
    toast(`OTP sent to ${fullNumber}. Use test OTP: 123456`, 'info');
    return { success: true, testOtp: '123456' };
  };

  const verifyMobileOtp = async (otp: string) => {
    if (otp === '123456' || otp.length === 6) {
      const updated: UserProfile = {
        ...CURRENT_USER,
        phone: tempPhone,
        isPhoneVerified: true,
      };
      setUser(updated);
      localStorage.setItem('vyaparvibe_user', JSON.stringify(updated));
      closeAuthModal();
      toast('Mobile verified! Welcome to VyaparVibe local commerce.', 'success');
      return true;
    }
    toast('Invalid OTP code. Please enter 123456', 'error');
    return false;
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('vyaparvibe_user', JSON.stringify(updated));
    toast('Profile & artisan details updated successfully!', 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vyaparvibe_user');
    toast('Logged out from VyaparVibe', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        isSetupWizardOpen,
        openAuthModal,
        closeAuthModal,
        openSetupWizard,
        closeSetupWizard,
        loginWithEmail,
        sendMobileOtp,
        verifyMobileOtp,
        updateProfile,
        logout,
        tempPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
