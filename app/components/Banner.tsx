'use client';

import Image from 'next/image';

export default function Banner() {
  return (
    <section className="w-full py-11 bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-stretch gap-5 w-full">
          {/* Left Image */}
          <div className="relative w-full md:flex-1 h-[300px] md:h-[467px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/banner-left.png"
              alt="Fashion Banner"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Center Card */}
          <div className="bg-gray-100 rounded-2xl p-6 md:p-10 flex flex-col justify-center items-center w-full md:flex-1 min-h-[300px] md:h-[467px]">
            <div className="flex flex-col items-center gap-7 py-6 md:py-11 w-full">
              {/* Text Content */}
              <div className="flex flex-col gap-3 w-full">
                <h2 className="text-gray-900 text-3xl md:text-4xl font-semibold leading-tight text-center">
                  Don&apos;t Miss Out<br />50% OFF
                </h2>
                <p className="text-gray-600 text-sm leading-5 text-center">
                  Get 50% Off – Limited Time Only Refresh your<br />wardrobe with modern essentials.
                </p>
              </div>
              
              {/* Button */}
              <button className="inline-flex items-center justify-center gap-1 px-5 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-colors">
                Shop now
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:flex-1 h-[300px] md:h-[467px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/banner-right.png"
              alt="Fashion Banner"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
