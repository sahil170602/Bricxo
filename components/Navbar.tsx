"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, X, Home, Package, Truck } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext'; 

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Added Menu State
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { cartCount } = useCart(); 

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle Search Submit
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.trim();
      if (query) {
        setIsSearchOpen(false);
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-orange-600 border-b border-orange-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center z-20">
            <Link href="/" className="text-3xl font-black tracking-tighter text-white flex items-center gap-1 group">
              BRIC<span className="text-gray-900 group-hover:text-black transition-colors">XO</span>.
            </Link>
          </div>

          <div className="flex-1"></div>

          {/* Icons Group */}
          <div className="flex items-center space-x-4 sm:space-x-6 z-20">
            
            {/* 1. Search Bar (Expandable) */}
            <div className="relative flex items-center">
              <div 
                className={`
                  flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ease-in-out shadow-lg absolute right-0 top-1/2 -translate-y-1/2 z-30
                  ${isSearchOpen ? 'w-[calc(100vw-40px)] sm:w-80 opacity-100 right-0' : 'w-0 opacity-0 -z-10'}
                `}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 text-gray-900 text-sm font-bold focus:outline-none"
                  onKeyDown={handleSearch}
                  onBlur={() => {
                      setTimeout(() => {
                        if (!searchInputRef.current?.value) setIsSearchOpen(false);
                      }, 200);
                  }} 
                />
                <button onClick={() => setIsSearchOpen(false)} className="pr-4 text-gray-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>

              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`flex flex-col items-center text-white hover:text-gray-900 transition-colors ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <Search size={24} />
                <span className="hidden sm:block text-[10px] font-medium uppercase mt-0.5 tracking-wide">Search</span>
              </button>
            </div>

            {/* 2. Profile (Desktop) */}
            <Link href="/profile/orders" className="hidden md:flex flex-col items-center text-white hover:text-gray-900 transition-colors">
              <User size={24} />
              <span className="text-[10px] font-medium uppercase mt-0.5 tracking-wide">Profile</span>
            </Link>
            
            {/* 3. Cart with Dynamic Badge */}
            <Link href="/cart" className={`flex flex-col items-center text-white hover:text-gray-900 transition-colors relative ${isSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
              <ShoppingCart size={24} />
              <span className="hidden sm:block text-[10px] font-medium uppercase mt-0.5 tracking-wide">Cart</span>
              
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-orange-600 animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* 4. Hamburger Menu (Mobile Toggle) */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-gray-900 transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 absolute w-full shadow-2xl animate-in slide-in-from-top-5 z-40">
          <div className="p-4 space-y-2">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-gray-900 font-bold"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Home size={20} /></div>
              Home
            </Link>
            <Link 
              href="/search" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-gray-900 font-bold"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Package size={20} /></div>
              Shop Materials
            </Link>
            <Link 
              href="/profile/orders" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-gray-900 font-bold"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Truck size={20} /></div>
              Track Orders
            </Link>
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-gray-900 font-bold"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><User size={20} /></div>
              Login / Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;