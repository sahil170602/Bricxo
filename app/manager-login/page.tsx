"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import { adminLogin } from '@/app/actions';

export default function ManagerLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await adminLogin(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid Password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-4 rounded-full"><Lock className="text-gray-900 w-8 h-8" /></div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Manager Access</h1>
        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <input 
            type="password" 
            placeholder="••••••" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-bold tracking-widest"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
          <button className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
            Login <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}