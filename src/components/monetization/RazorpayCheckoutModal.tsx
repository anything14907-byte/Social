'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function RazorpayCheckoutModal() {
  const { selectedProductForCheckout, closeCheckout } = useFeed();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [name, setName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Sea Green Apts, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!selectedProductForCheckout) return null;

  const product = selectedProductForCheckout.product;
  const seller = selectedProductForCheckout.postAuthor;

  const handlePay = () => {
    setIsProcessing(true);
    const mockOrderId = `order_BG_${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(mockOrderId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast(`Payment of ${formatINR(product.price)} successful! Order confirmed.`, 'success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Razorpay Brand Header */}
        <div className="bg-[#0C2340] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-400/40">
              <span className="font-black text-blue-400 text-sm">₹</span>
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                <span>BharatGram Secure Pay</span>
                <span className="text-[10px] bg-blue-600/60 px-1.5 py-0.5 rounded font-mono">
                  RAZORPAY
                </span>
              </div>
              <div className="text-[11px] text-blue-200 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit Encrypted Payment Gateway
              </div>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Success State */
          <div className="p-8 flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Payment Successful! 🎉
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Your order for <strong className="text-neutral-800 dark:text-neutral-200">{product.title}</strong> has been confirmed.
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount Paid</span>
                <span className="font-bold text-neutral-900 dark:text-white">{formatINR(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID</span>
                <span className="font-mono text-neutral-900 dark:text-white">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Seller</span>
                <span className="font-medium text-neutral-900 dark:text-white">{seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery To</span>
                <span className="font-medium text-neutral-900 dark:text-white">{city} ({pincode})</span>
              </div>
            </div>

            <button
              onClick={closeCheckout}
              className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm shadow-md hover:opacity-90"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="overflow-y-auto p-5 flex flex-col gap-5 flex-1">
            {/* Order Summary Item */}
            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-500">Product / Service</span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {product.title}
                </h4>
                <span className="text-[11px] text-neutral-400">Sold by: {seller}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-black text-rose-600 dark:text-rose-400">
                  {formatINR(product.price)}
                </span>
                <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Free Express Delivery
                </span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Shipping & Customer Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="+91 Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Street Address / Flat No."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white sm:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City (e.g. Mumbai)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* Indian Payment Methods Tabs */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Select Indian Payment Option
              </span>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building },
                  { id: 'cod', label: 'COD', icon: Truck },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                        paymentMethod === m.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Sub Options (GPay, PhonePe, Paytm) */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'gpay', name: 'Google Pay' },
                      { id: 'phonepe', name: 'PhonePe' },
                      { id: 'paytm', name: 'Paytm UPI' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setUpiApp(app.id as any)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                          upiApp === app.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-neutral-500">
                      Enter UPI ID or Virtual Payment Address (VPA)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 flex flex-col gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (RuPay, Visa, Mastercard)"
                    defaultValue="4111 •••• •••• 4242"
                    className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="08/28"
                      className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="888"
                      className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 grid grid-cols-3 gap-2 text-xs font-bold">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map((b) => (
                    <div key={b} className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center cursor-pointer hover:border-blue-500">
                      {b}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-700 hover:to-rose-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Bank Gateway...</span>
                </>
              ) : (
                <>
                  <span>Pay {formatINR(product.price)} Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

