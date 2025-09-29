'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import ReactCountryFlag from 'react-country-flag';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'English',
    country: 'US',
    name: 'English'
  });
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: 'USD',
    symbol: '$',
    country: 'US',
    name: 'US Dollar'
  });

  const langRef = useRef<HTMLDivElement | null>(null);
  const currRef = useRef<HTMLDivElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const wishRef = useRef<HTMLDivElement | null>(null);

  const { items: cartItems, updateQty, removeFromCart, loading: cartLoading, error: cartError } = useCart();
  const { items: wishItems,  removeFromWishlist, loading: wishLoading, error: wishError } = useWishlist();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const cartCount = useMemo(() => cartItems.reduce((sum, it) => sum + it.quantity, 0), [cartItems]);
  const wishlistCount = useMemo(() => wishItems.length, [wishItems]);

  const incQty = useCallback((id: number) => updateQty(id, (cartItems.find(i => i.productId === id)?.quantity || 0) + 1), [cartItems, updateQty]);
  const decQty = useCallback((id: number) => {
    const q = (cartItems.find(i => i.productId === id)?.quantity || 0) - 1;
    updateQty(id, q);
  }, [cartItems, updateQty]);

  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(target)) {
        setIsCurrOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(target)) {
        setShowCart(false);
      }
      if (wishRef.current && !wishRef.current.contains(target)) {
        setShowWishlist(false);
      }
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, []);

  const languages = [
    { code: 'English', country: 'US', name: 'English' },
    { code: 'Español', country: 'ES', name: 'Spanish' },
    { code: 'Français', country: 'FR', name: 'French' }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', country: 'US', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', country: 'EU', name: 'Euro' },
    { code: 'GBP', symbol: '£', country: 'GB', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', country: 'JP', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', country: 'CA', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', country: 'AU', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'CHF', country: 'CH', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', country: 'CN', name: 'Chinese Yuan' }
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-[#111827] h-[48px] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="relative h-full text-sm">
            {/* Left side - Language and Currency */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <div className="flex items-center">
                {/* Language Selector */}
                <div ref={langRef} className="left-[9px] relative">
                  <button
                    type="button"
                    className="flex items-center space-x-1 text-white hover:text-gray-300 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={isLangOpen}
                    onClick={() => setIsLangOpen((v) => !v)}
                  >
                    <GlobeAltIcon className="w-4 h-4" aria-hidden="true" />
                    <span>{selectedLanguage.code}</span>
                    <ChevronDownIcon className="w-3 h-3" aria-hidden="true" />
                  </button>
                  {isLangOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-[#111827] py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          role="menuitem"
                          onClick={() => {
                            setSelectedLanguage(language);
                            setIsLangOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-800"
                        >
                          <GlobeAltIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                          <span className="flex-1 text-left">{language.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currency Selector */}
                <div ref={currRef} className="relative inline-block align-middle">
                  <button
                    type="button"
                    className="inline-flex items-center space-x-1 text-white hover:text-gray-300 focus:outline-none align-middle"
                    aria-haspopup="true"
                    aria-expanded={isCurrOpen}
                    onClick={() => setIsCurrOpen((v) => !v)}
                  >
                    <ReactCountryFlag
                      countryCode={selectedCurrency.country}
                      svg
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%'
                      }}
                      title={selectedCurrency.name}
                    />
                    <span>{selectedCurrency.code}</span>
                    <ChevronDownIcon className="w-3 h-3" aria-hidden="true" />
                  </button>
                  {isCurrOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-[#111827] py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          role="menuitem"
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setIsCurrOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-800"
                        >
                          <ReactCountryFlag
                            countryCode={currency.country}
                            svg
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              marginRight: '8px'
                            }}
                            title={currency.name}
                          />
                          <span className="flex-1 text-left">{currency.code}</span>
                          <span className="text-gray-400 text-xs">{currency.symbol}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Flash Sale Banner */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-white font-medium">Flash Sale Live - 30% Off Everything</span>
            </div>

            {/* Right side - Login/Register */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="text-white flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.083 10.3857C13.7871 10.3857 16.7898 13.3887 16.79 17.0928V17.4395C16.79 17.8537 16.4543 18.1895 16.04 18.1895C15.6259 18.1893 15.29 17.8536 15.29 17.4395V17.0928C15.2898 14.2171 12.9587 11.8857 10.083 11.8857H6.70703C3.83142 11.8859 1.50027 14.2172 1.5 17.0928V17.4395C1.5 17.8537 1.16421 18.1895 0.75 18.1895C0.335786 18.1895 0 17.8537 0 17.4395V17.0928C0.000274757 13.3888 3.00299 10.3859 6.70703 10.3857H10.083ZM8.39453 0C10.8323 9.89535e-05 12.8085 1.9763 12.8086 4.41406C12.8086 6.85187 10.8323 8.82803 8.39453 8.82812C5.9567 8.82808 3.98047 6.8519 3.98047 4.41406C3.98051 1.97626 5.95673 4.37769e-05 8.39453 0ZM8.39453 1.5C6.78516 1.50004 5.48051 2.80469 5.48047 4.41406C5.48047 6.02347 6.78513 7.32808 8.39453 7.32812C10.0039 7.32803 11.3086 6.02344 11.3086 4.41406C11.3085 2.80472 10.0039 1.5001 8.39453 1.5Z" fill="#ffff" />
                </svg>
                <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
                <span>/</span>
                <Link href="/auth/register" className="hover:text-gray-300">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar - Only visible on mobile */}
      <div className="md:hidden bg-[#111827] py-3 px-4">
        <div className="flex items-center justify-center">
          <span className="text-white text-sm font-normal">Flash Sale Live – 30% Off Everything</span>
        </div>
        <div className="flex items-center justify-center md:justify-between mt-2">
          <div className="flex items-center gap-5">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-transparent rounded-lg px-0">
              <GlobeAltIcon className="w-4 h-4 text-white" />
              <span className="text-white text-sm">English</span>
              <ChevronDownIcon className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%'
              }}
              title="US Dollar"
            />
            <span className="text-white text-sm">USD</span>
            <ChevronDownIcon className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-5 md:gap-0">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex gap-1 items-center">
              <div className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="PIMJO Logo"
                  width={25}
                  height={25}
                  className="object-contain md:w-10 md:h-10"
                  
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-[#232939] tracking-wide">PIMJO</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/deals" className="flex items-center space-x-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
              <span>Deals of the Week</span>
              <span className="bg-[#FDE3E3] text-red-500 text-xs px-2 py-0.5 rounded-full ">Hot</span>
            </Link>
            <Link href="/new-arrivals" className="text-gray-700 hover:text-[#1D4ED8] font-medium">
              New Arrivals
            </Link>
            <Link href="/men" className="text-gray-700 hover:text-[#1D4ED8] font-medium">
              Men
            </Link>
            <Link href="/women" className="text-gray-700 hover:text-[#1D4ED8] font-medium">
              Women
            </Link>
            <Link href="/kids" className="text-gray-700 hover:text-[#1D4ED8] font-medium">
              Kids
            </Link>
            <Link href="/sale" className="flex items-center space-x-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
              <span>Sale</span>
              <span className="bg-[#EFF6FF] text-[0.8rem] text-blue-600 px-2 py-0.5 rounded-full">20% OFF</span>
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2.5">
            {/* Search - Visible on mobile and desktop */}
            <button className="p-2 text-gray-700 hover:text-[#1D4ED8]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Account - Hidden on mobile */}
            <button className="hidden md:block p-2 text-[1.3rem] text-gray-700 hover:text-[#1D4ED8]">
              <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.083 10.3857C13.7871 10.3857 16.7898 13.3887 16.79 17.0928V17.4395C16.79 17.8537 16.4543 18.1895 16.04 18.1895C15.6259 18.1893 15.29 17.8536 15.29 17.4395V17.0928C15.2898 14.2171 12.9587 11.8857 10.083 11.8857H6.70703C3.83142 11.8859 1.50027 14.2172 1.5 17.0928V17.4395C1.5 17.8537 1.16421 18.1895 0.75 18.1895C0.335786 18.1895 0 17.8537 0 17.4395V17.0928C0.000274757 13.3888 3.00299 10.3859 6.70703 10.3857H10.083ZM8.39453 0C10.8323 9.89535e-05 12.8085 1.9763 12.8086 4.41406C12.8086 6.85187 10.8323 8.82803 8.39453 8.82812C5.9567 8.82808 3.98047 6.8519 3.98047 4.41406C3.98051 1.97626 5.95673 4.37769e-05 8.39453 0ZM8.39453 1.5C6.78516 1.50004 5.48051 2.80469 5.48047 4.41406C5.48047 6.02347 6.78513 7.32808 8.39453 7.32812C10.0039 7.32803 11.3086 6.02344 11.3086 4.41406C11.3085 2.80472 10.0039 1.5001 8.39453 1.5Z" fill="#374151" />
              </svg>
            </button>
            {/* Wishlist */}
            <div className="relative" ref={wishRef}>
              <button onClick={() => setShowWishlist(v => !v)} className="relative p-2 text-gray-700 hover:text-[#1D4ED8]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.21563 5.30222C2.26145 7.2564 2.26146 10.4248 4.21563 12.3789L10.9393 19.1027C11.5251 19.6885 12.4749 19.6885 13.0606 19.1027L19.7844 12.379C21.7385 10.4249 21.7385 7.2565 19.7844 5.30232C17.8302 3.34814 14.6618 3.34815 12.7076 5.30232L12 6.00993L11.2923 5.30222C9.33816 3.34804 6.16981 3.34804 4.21563 5.30222Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute top-[3px] right-0 border-2 border-white bg-[#1D4ED8] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              </button>
              {showWishlist && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3">
                  <h4 className="text-sm font-semibold mb-2">Wishlist</h4>
                  {wishLoading && (
                    <p className="text-sm text-gray-500">Loading wishlist...</p>
                  )}
                  {!wishLoading && wishError && (
                    <p className="text-sm text-red-600">{wishError}</p>
                  )}
                  {!wishLoading && !wishError && wishItems.length === 0 ? (
                    <p className="text-sm text-gray-500">No items in wishlist</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {wishItems.map((it) => (
                        <li key={it.productId} className="py-2 flex items-center gap-2">
                          <Image src={it.image} alt={it.name} width={40} height={40} className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{it.name}</p>
                            <p className="text-xs text-gray-500">{it.price}</p>
                          </div>
                          <button disabled={wishLoading} onClick={() => removeFromWishlist(it.productId)} className="text-xs text-red-600 hover:underline disabled:opacity-60">Remove</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            {/* Shopping Cart */}
            <div className="relative" ref={cartRef}>
              <button onClick={() => setShowCart(v => !v)} className="relative p-2 text-gray-700 hover:text-[#1D4ED8]">
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.31641 1H2.49696C3.24468 1 3.87822 1.55068 3.98234 2.29112L4.13429 3.37161M4.13429 3.37161L5.23641 11.2089C5.34053 11.9493 5.97407 12.5 6.72179 12.5L16.0833 12.5C16.6803 12.5 17.2205 12.146 17.4587 11.5986L20.126 5.47023C20.5572 4.4795 19.8312 3.37161 18.7507 3.37161H4.13429Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.7832 16.5H6.7932M15.3203 16.5H15.3303" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute top-0 right-0 border-2 border-white bg-[#1D4ED8] text-white text-xs rounded-full min-w-4 w-4 h-4 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              </button>
              {showCart && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3">
                  <h4 className="text-sm font-semibold mb-2">Cart</h4>
                  
                  {!cartLoading && cartError && (
                    <p className="text-sm text-red-600">{cartError}</p>
                  )}
                  {!cartLoading && !cartError && cartItems.length === 0 ? (
                    <p className="text-sm text-gray-500">Your cart is empty</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {cartItems.map((it) => (
                        <li key={it.productId} className="py-2 flex items-center gap-2">
                          <Image src={it.image} alt={it.name} width={40} height={40} className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{it.name}</p>
                            <p className="text-xs text-gray-500">{it.price}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button disabled={cartLoading} aria-label="decrease" onClick={() => decQty(it.productId)} className="px-2 py-1 border rounded disabled:opacity-60">-</button>
                            <span className="text-sm w-6 text-center">{it.quantity}</span>
                            <button disabled={cartLoading} aria-label="increase" onClick={() => incQty(it.productId)} className="px-2 py-1 border rounded disabled:opacity-60">+</button>
                          </div>
                          <button disabled={cartLoading} onClick={() => removeFromCart(it.productId)} className="text-xs text-red-600 hover:underline disabled:opacity-60">Remove</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-full max-w-sm h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#1F2937]">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <Link href="/deals" className="flex items-center justify-between py-3 text-gray-700 border-b border-gray-100">
                  <span>Deals of the Week</span>
                  <span className="bg-[#FDE3E3] text-red-500 text-xs px-2 py-0.5 rounded-full">Hot</span>
                </Link>
                <Link href="/new-arrivals" className="block py-3 text-gray-700 border-b border-gray-100">
                  New Arrivals
                </Link>
                <Link href="/men" className="block py-3 text-gray-700 border-b border-gray-100">
                  Men
                </Link>
                <Link href="/women" className="block py-3 text-gray-700 border-b border-gray-100">
                  Women
                </Link>
                <Link href="/kids" className="block py-3 text-gray-700 border-b border-gray-100">
                  Kids
                </Link>
                <Link href="/sale" className="flex items-center justify-between py-3 text-gray-700 border-b border-gray-100">
                  <span>Sale</span>
                  <span className="bg-[#EFF6FF] text-blue-600 text-xs px-2 py-0.5 rounded-full">20% OFF</span>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-700">
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.083 10.3857C13.7871 10.3857 16.7898 13.3887 16.79 17.0928V17.4395C16.79 17.8537 16.4543 18.1895 16.04 18.1895C15.6259 18.1893 15.29 17.8536 15.29 17.4395V17.0928C15.2898 14.2171 12.9587 11.8857 10.083 11.8857H6.70703C3.83142 11.8859 1.50027 14.2172 1.5 17.0928V17.4395C1.5 17.8537 1.16421 18.1895 0.75 18.1895C0.335786 18.1895 0 17.8537 0 17.4395V17.0928C0.000274757 13.3888 3.00299 10.3859 6.70703 10.3857H10.083ZM8.39453 0C10.8323 9.89535e-05 12.8085 1.9763 12.8086 4.41406C12.8086 6.85187 10.8323 8.82803 8.39453 8.82812C5.9567 8.82808 3.98047 6.8519 3.98047 4.41406C3.98051 1.97626 5.95673 4.37769e-05 8.39453 0ZM8.39453 1.5C6.78516 1.50004 5.48051 2.80469 5.48047 4.41406C5.48047 6.02347 6.78513 7.32808 8.39453 7.32812C10.0039 7.32803 11.3086 6.02344 11.3086 4.41406C11.3085 2.80472 10.0039 1.5001 8.39453 1.5Z" fill="#374151" />
                    </svg>
                    <span>Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
