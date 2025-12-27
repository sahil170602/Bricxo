"use client";

import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { 
  ArrowRight, 
  Loader2, 
  Phone, 
  MessageSquare, 
  User, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export default function LoginPage() {
  // State for tracking the current step
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=Phone, 2=OTP, 3=Details
  const [isLoading, setIsLoading] = useState(false);

  // Form Data
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({ name: '', address: '' });

  // STEP 1: SEND OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit number");
      return;
    }
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // Move to OTP step
      alert(`OTP sent to ${phone}. (Use 1234 for demo)`);
    }, 1500);
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "1234") {
        setStep(3); // Move to Profile step
      } else {
        alert("Invalid OTP! Try 1234.");
      }
    }, 1500);
  };

  // STEP 3: SUBMIT DETAILS
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call (Save user to DB)
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome, ${profile.name}! Your account is ready.`);
      // Redirect to Home here
      window.location.href = '/'; 
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4">
        <BackButton />
        <div className="flex-1">
          <div className="flex gap-1 mb-1">
             {/* Step Indicators */}
             <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#FF8237]' : 'bg-gray-100'}`} />
             <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#FF8237]' : 'bg-gray-100'}`} />
             <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-[#FF8237]' : 'bg-gray-100'}`} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Step {step} of 3
          </p>
        </div>
      </div>

      <div className="px-6 py-8">
        
        {/* Dynamic Title based on Step */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 leading-none mb-3 uppercase">
            {step === 1 && <>Let's Get<br/><span className="text-[#FF8237]">Started.</span></>}
            {step === 2 && <>Verify<br/><span className="text-[#FF8237]">Number.</span></>}
            {step === 3 && <>Finish<br/><span className="text-[#FF8237]">Up.</span></>}
          </h1>
          <p className="text-gray-500 font-bold text-sm">
            {step === 1 && 'Enter your phone number to continue.'}
            {step === 2 && `We sent a 4-digit code to +91 ${phone}`}
            {step === 3 && 'Tell us where to deliver your materials.'}
          </p>
        </div>

        {/* --- STEP 1: PHONE INPUT --- */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={20} />
              </span>
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-900 font-bold border-r border-gray-300 pr-3 mr-3">
                +91
              </span>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} // Only numbers, max 10
                className="w-full pl-28 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FF8237] focus:bg-white transition-all outline-none font-bold text-gray-900 text-lg tracking-widest"
                autoFocus
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || phone.length < 10}
              className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={20} className="text-[#FF8237]" /></>}
            </button>
          </form>
        )}

        {/* --- STEP 2: OTP INPUT --- */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MessageSquare size={20} />
              </span>
              <input 
                type="text" 
                placeholder="X - X - X - X" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FF8237] focus:bg-white transition-all outline-none font-black text-gray-900 text-2xl tracking-[1em] text-center"
                autoFocus
                required
              />
            </div>

            <div className="flex justify-between items-center">
               <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-gray-400 uppercase">Change Number</button>
               <button type="button" className="text-xs font-bold text-[#FF8237] uppercase">Resend Code</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || otp.length < 4}
              className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Verify OTP <CheckCircle2 size={20} className="text-[#FF8237]" /></>}
            </button>
          </form>
        )}

        {/* --- STEP 3: DETAILS INPUT --- */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8">
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={20} />
              </span>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FF8237] focus:bg-white transition-all outline-none font-bold text-gray-900"
                autoFocus
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-400">
                <MapPin size={20} />
              </span>
              <textarea 
                placeholder="Delivery Address (Site Location)" 
                rows={3}
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FF8237] focus:bg-white transition-all outline-none font-bold text-gray-900 resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#FF8237] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Complete <ArrowRight size={20} /></>}
            </button>
          </form>
        )}

      </div>
    </main>
  );
}