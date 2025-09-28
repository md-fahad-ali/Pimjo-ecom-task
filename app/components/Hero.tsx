'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Slide = {
  id: number;
  brand: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    brand: 'SAMSUNG',
    title: 'Galaxy S24 Ultra 5G',
    subtitle:
      'Galaxy AI is here | Pro-grade camera, seamless 5G, and revolutionary AI – Redefine possibilities.',
    cta: 'Buy Now $899',
    image: '/assets/hero-phone-1bf159.png',
  },
  {
    id: 2,
    brand: 'APPLE',
    title: 'iPhone 15 Pro Max',
    subtitle:
      'Titanium design • Pro camera • A17 Pro chip • USB-C. The most powerful iPhone yet.',
    cta: 'Buy Now $1099',
    image: '/assets/hero-phone-1bf159.png',
  },
  {
    id: 3,
    brand: 'GOOGLE',
    title: 'Pixel 9 Pro',
    subtitle:
      'Best-in-class AI features • Pro camera • All-day battery • Clean Android experience.',
    cta: 'Buy Now $999',
    image: '/assets/hero-phone-1bf159.png',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // Simple autoplay
  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="w-full py-4 md:py-12 lg:py-20 bg-white">
      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-4 lg:gap-5 w-full max-w-[1307px] mx-auto px-4 sm:px-6 md:px-4 lg:px-6 xl:px-8 2xl:px-0">
        {/* Main Hero Banner */}
        <div className="relative bg-[#111827] rounded-xl flex flex-col md:flex-row md:items-center md:justify-between px-5 py-7 md:px-6 lg:px-10 lg-custom:px-12 xl-custom:px-14 md:py-0 flex-shrink-0 w-full md:w-[58%] lg:w-[calc(100%-400px)] lg-custom:w-[780px] xl-custom:w-[887px] h-auto md:h-[420px] lg:h-[544px]">
          {/* Mobile: Text content at top */}
          <div className="flex flex-col gap-6 md:gap-8 lg-custom:gap-12 max-w-none md:max-w-[240px] lg:max-w-md lg-custom:max-w-lg xl-custom:max-w-lg md:order-1">
            <div className="flex flex-col gap-4 md:gap-4 xl-custom:gap-6">
              <p className="text-[#9CA3AF] text-sm xl-custom:text-base font-medium uppercase tracking-wider text-left">
                {slides[active].brand}
              </p>
              <div className="flex flex-col gap-2 md:gap-3 xl-custom:gap-4">
                <h1 className="text-white text-[28px] md:text-2xl lg:text-4xl lg-custom:text-4xl xl-custom:text-5xl font-semibold leading-[1.14] md:leading-tight xl-custom:leading-tight text-left">
                  {slides[active].title}
                </h1>
                <p className="text-[#9CA3AF] text-base md:text-sm lg:text-base lg-custom:text-base xl-custom:text-lg leading-6 md:leading-5 lg:leading-6 xl-custom:leading-7 max-w-none md:max-w-[240px] lg:max-w-[360px] lg-custom:max-w-[398px] xl-custom:max-w-[480px] text-left">
                  {slides[active].subtitle}
                </p>
              </div>
            </div>
            
            <button className="inline-flex items-center justify-center gap-1 px-4 py-2.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 xl-custom:px-6 xl-custom:py-3 bg-white transition-colors w-full md:w-fit border border-[#D1D5DB] text-[#1F2937] rounded-lg text-sm md:text-xs lg:text-sm xl-custom:text-base font-medium hover:bg-gray-50">
              {slides[active].cta}
            </button>
          </div>

          {/* Mobile: Product image at bottom, Desktop: right side */}
          <div className="relative w-full h-[295px] md:w-[200px] md:h-[220px] lg:w-[300px] lg:h-[310px] lg-custom:w-[320px] lg-custom:h-[330px] xl-custom:w-[380px] xl-custom:h-[390px] mt-11 md:mt-0 md:order-2">
            <Image
              src={slides[active].image}
              alt={slides[active].title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 200px, 380px"
              className="object-contain"
            />
          </div>

          {/* Slide indicators - bottom center */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 lg:bottom-12 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  active === i 
                    ? 'w-5.5 bg-white' 
                    : 'w-4 bg-white/30 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side cards - Stack vertically on mobile */}
        <div className="flex flex-col justify-stretch items-stretch gap-3 md:gap-2 lg:gap-3 xl-custom:gap-3 w-full md:w-[40%] lg:w-[400px]">
          {/* Smart Camera Card */}
          <div className="bg-[#F3F4F6] rounded-xl flex items-center justify-between px-5 py-5 md:px-4 md:py-4 lg:px-6 lg:py-6 xl-custom:px-8 xl-custom:py-8 h-auto md:h-[200px] lg:h-[262px] xl-custom:h-[300px]">
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 xl-custom:gap-14 flex-1">
              <div className="flex flex-col gap-1 md:gap-2 xl-custom:gap-3">
                <p className="text-[#6B7280] text-xs md:text-xs lg:text-sm xl-custom:text-base font-medium uppercase tracking-wider">
                  XIAOMI
                </p>
                <h3 className="text-[#374151] text-lg md:text-base lg:text-xl xl-custom:text-2xl font-semibold leading-6 md:leading-5 lg:leading-7 xl-custom:leading-8">
                  Smart Security Home Camera
                </h3>
              </div>
              
              <button className="inline-flex items-center justify-center gap-1.5 px-3 py-2 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2.5 xl-custom:px-4 xl-custom:py-3 bg-[#3758F9] text-white rounded-lg text-xs md:text-xs lg:text-sm xl-custom:text-base font-medium hover:bg-[#2D4AE6] transition-colors w-fit">
                Shop Now
              </button>
            </div>

            {/* Camera image */}
            <div className="relative w-[120px] h-[150px] md:w-[100px] md:h-[120px] lg:w-[162px] lg:h-[214px] xl-custom:w-[200px] xl-custom:h-[260px] ml-3 md:ml-2 lg:ml-5 xl-custom:ml-6">
              <div className="absolute left-3 top-4 w-24 h-36 md:left-2 md:top-3 md:w-20 md:h-28 lg:left-4 lg:top-5 lg:w-32 lg:h-48 xl-custom:left-5 xl-custom:top-6 xl-custom:w-40 xl-custom:h-60">
                <Image
                  src="/assets/camera-2de248.png"
                  alt="Smart Security Camera"
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 100px, 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Smart Watch Card */}
          <div className="bg-[#F3F4F6] rounded-xl flex items-center justify-between px-5 py-5 md:px-4 md:py-4 lg:px-6 lg:py-6 xl-custom:px-8 xl-custom:py-8 h-auto md:h-[200px] lg:h-[262px] xl-custom:h-[300px]">
            <div className="flex flex-col justify-between gap-4 md:gap-6 lg:gap-8 xl-custom:gap-14 flex-1 h-full">
              <div className="flex flex-col gap-1 md:gap-2 xl-custom:gap-3">
                <p className="text-[#6B7280] text-xs md:text-xs lg:text-sm xl-custom:text-base font-medium uppercase tracking-wider">
                  REDMI
                </p>
                <h3 className="text-[#374151] text-lg md:text-base lg:text-xl xl-custom:text-2xl font-semibold leading-6 md:leading-5 lg:leading-7 xl-custom:leading-8">
                  Smart Watch<br />5 lite
                </h3>
              </div>
              
              <button className="inline-flex items-center justify-center gap-1.5 px-3 py-2 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2.5 xl-custom:px-4 xl-custom:py-3 bg-[#3758F9] text-white rounded-lg text-xs md:text-xs lg:text-sm xl-custom:text-base font-medium hover:bg-[#2D4AE6] transition-colors w-fit">
                Shop Now
              </button>
            </div>

            {/* Watch image */}
            <div className="relative w-[120px] h-[150px] md:w-[100px] md:h-[120px] lg:w-[162px] lg:h-[214px] xl-custom:w-[200px] xl-custom:h-[260px] ml-3 md:ml-2 lg:ml-5 xl-custom:ml-6">
              <div className="absolute -left-0.5 top-3 w-[120px] h-[144px] md:-left-0.5 md:top-2.5 md:w-[100px] md:h-[116px] lg:-left-0.5 lg:top-3.5 lg:w-[162px] lg:h-[196px] xl-custom:-left-1 xl-custom:top-4 xl-custom:w-[200px] xl-custom:h-[240px]">
                <Image
                  src="/assets/smartwatch-270bee.png"
                  alt="Smart Watch 5 lite"
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 100px, 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}