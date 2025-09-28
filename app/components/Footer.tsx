'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                            <Image src="/assets/logo.png" alt="PIMJO" width={32} height={32} className="object-contain" />
                            <span className="text-2xl font-bold text-gray-900">PIMJO</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                            PIMJO comes with all the essentials UI components you need to create beautiful websites based on Tailwind CSS.
                        </p>
                        <div className="space-y-2">
                            <p className="text-gray-900 text-sm font-medium">Follow us on</p>
                            <div className="flex space-x-3">
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    <FaFacebook size={18} />
                                </Link>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    <FaXTwitter size={18} />
                                </Link>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    <BiLogoInstagramAlt size={20} />
                                </Link>
                                <Link href="#" className="text-gray-500 hover:text-gray-900">
                                    <FaLinkedin size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Clothing */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-base mb-4">Clothing</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Tops</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Tops & Blouses</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Dresses</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Outerwear</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Accessories</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">New Arrivals</a></li>
                        </ul>
                    </div>

                    {/* Shoes */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-base mb-4">Shoes</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Hills shoed</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Running Shoes</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Sandals</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Ballet Pumps</a></li>
                            <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900">Slingback</a></li>
                            <li>
                                <a href="#" className="text-gray-600 text-sm hover:text-gray-900 flex items-center">
                                    Sale 
                                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">Hot Item</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-base mb-4">Newsletter</h3>
                        <p className="text-gray-600 text-sm mb-4">Signup for latest news and insights from PIMJO</p>
                        <form className="space-y-3">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 py-8 lg:py-0 lg:h-25">
                    {/* Mobile Layout - Vertical Stack */}
                    <div className="flex flex-col space-y-6 lg:hidden">
                        {/* Contact Info Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 17.0518V12C20 7.58174 16.4183 4 12 4C7.58168 4 3.99994 7.58174 3.99994 12V17.0518M19.9998 14.041V19.75C19.9998 20.5784 19.3282 21.25 18.4998 21.25H13.9998M6.5 18.75H5.5C4.67157 18.75 4 18.0784 4 17.25V13.75C4 12.9216 4.67157 12.25 5.5 12.25H6.5C7.32843 12.25 8 12.9216 8 13.75V17.25C8 18.0784 7.32843 18.75 6.5 18.75ZM17.4999 18.75H18.4999C19.3284 18.75 19.9999 18.0784 19.9999 17.25V13.75C19.9999 12.9216 19.3284 12.25 18.4999 12.25H17.4999C16.6715 12.25 15.9999 12.9216 15.9999 13.75V17.25C15.9999 18.0784 16.6715 18.75 17.4999 18.75Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs">8:30 AM - 10:30 PM</p>
                                <p className="text-gray-900 font-semibold text-sm">+16283998030</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Payment Support Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <p className="text-gray-500 text-sm font-medium">We Support</p>
                            <div className="flex items-center space-x-4">
                                <Image src="/assets/mastercard-logo.png" alt="Mastercard" width={33} height={20} className="object-contain" />
                                <Image src="/assets/visa-logo.png" alt="Visa" width={34} height={20} className="object-contain" />
                                <Image src="/assets/paypal-logo.png" alt="PayPal" width={44} height={20} className="object-contain" />
                                <Image src="/assets/amex-logo.png" alt="American Express" width={43} height={20} className="object-contain" />
                                <Image src="/assets/westernunion-logo.png" alt="Western Union" width={52} height={20} className="object-contain" />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Download App Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <div className="text-center">
                                <p className="text-gray-900 font-semibold text-base">Download Now on</p>
                                <p className="text-gray-500 text-xs max-w-60">Free home delivery on your first purchase</p>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <Link href="#">
                                    <Image src="/assets/Mobileappstorebadge.png" alt="App Store Badge" width={133} height={40} className="object-contain" />
                                </Link>
                                <Link href="#">
                                    <Image src="/assets/Mobileappstorebadge-1.png" alt="Google Play Badge" width={133} height={40} className="object-contain" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout - Horizontal */}
                    <div className="hidden lg:flex lg:items-center lg:justify-between lg:h-25 lg:gap-16">
                        {/* Contact Info Section */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 17.0518V12C20 7.58174 16.4183 4 12 4C7.58168 4 3.99994 7.58174 3.99994 12V17.0518M19.9998 14.041V19.75C19.9998 20.5784 19.3282 21.25 18.4998 21.25H13.9998M6.5 18.75H5.5C4.67157 18.75 4 18.0784 4 17.25V13.75C4 12.9216 4.67157 12.25 5.5 12.25H6.5C7.32843 12.25 8 12.9216 8 13.75V17.25C8 18.0784 7.32843 18.75 6.5 18.75ZM17.4999 18.75H18.4999C19.3284 18.75 19.9999 18.0784 19.9999 17.25V13.75C19.9999 12.9216 19.3284 12.25 18.4999 12.25H17.4999C16.6715 12.25 15.9999 12.9216 15.9999 13.75V17.25C15.9999 18.0784 16.6715 18.75 17.4999 18.75Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">8:30 AM - 10:30 PM</p>
                                <p className="text-gray-900 font-semibold text-sm">+16283998030</p>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px h-16 bg-gray-200"></div>

                        {/* Download App Section */}
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-gray-900 font-semibold text-base">Download Now on</p>
                                <p className="text-gray-500 text-xs max-w-60">Free home delivery on your first purchase</p>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <Link href="#">
                                    <Image src="/assets/Mobileappstorebadge.png" alt="App Store Badge" width={133} height={40} className="object-contain" />
                                </Link>
                                <Link href="#">
                                    <Image src="/assets/Mobileappstorebadge-1.png" alt="Google Play Badge" width={133} height={40} className="object-contain" />
                                </Link>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px h-16 bg-gray-200"></div>

                        {/* Payment Support Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <p className="text-gray-500 text-sm font-medium">We Support</p>
                            <div className="flex items-center space-x-4">
                                <Image src="/assets/mastercard-logo.png" alt="Mastercard" width={33} height={20} className="object-contain" />
                                <Image src="/assets/visa-logo.png" alt="Visa" width={34} height={20} className="object-contain" />
                                <Image src="/assets/paypal-logo.png" alt="PayPal" width={44} height={20} className="object-contain" />
                                <Image src="/assets/amex-logo.png" alt="American Express" width={43} height={20} className="object-contain" />
                                <Image src="/assets/westernunion-logo.png" alt="Western Union" width={52} height={20} className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Bottom Section */}
            <div className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 py-5">
                    {/* Mobile Layout */}
                    <div className="flex flex-col items-center space-y-3 lg:hidden">
                        <div className="flex flex-col items-center space-y-3">
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Refund Policy</a>
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Terms of Services</a>
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Shipping policy</a>
                        </div>
                        <p className="text-gray-500 text-base">&copy; Copyright 2025 - TailGrids.</p>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Refund Policy</a>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Terms of Services</a>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <a href="#" className="text-gray-500 text-base hover:text-gray-900">Shipping policy</a>
                        </div>
                        <p className="text-gray-500 text-base">&copy; Copyright 2025 - TailGrids.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
