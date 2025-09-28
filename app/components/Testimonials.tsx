'use client';

import Image from 'next/image';

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 4.5,
    text: "Working with this team has been a game-changer — their attention to detail, creativity, and commitment to deadlines exceeded every expectation I had.",
    name: "Kathryn Murphy",
    role: "Ceo",
    avatar: "/assets/avatar-1.png"
  },
  {
    id: 2,
    rating: 5,
    text: "From the initial consultation to the final delivery, the process was seamless and incredibly professional — I've never felt more confident in a partnership.",
    name: "Jerome Bell",
    role: "Marketing Coordinator",
    avatar: "/assets/avatar-2.png"
  },
  {
    id: 3,
    rating: 5,
    text: "The results speak for themselves — our engagement increased by 300% within the first month, and the quality of work continues to impress our entire team.",
    name: "Arlene McCoy",
    role: "Product Manager",
    avatar: "/assets/avatar-3.png"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-[-1px]">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-4 h-4 relative">
          {index < fullStars ? (
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 16 16">
              <path d="M8 1.62l1.9 3.85 4.25.62-3.07 2.99.72 4.22L8 11.77l-3.8 1.99.72-4.22L1.85 6.09l4.25-.62L8 1.62z"/>
            </svg>
          ) : index === fullStars && hasHalfStar ? (
            <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 16 16">
              <defs>
                <linearGradient id="half-star">
                  <stop offset="50%" stopColor="#FACC15"/>
                  <stop offset="50%" stopColor="#E5E7EB"/>
                </linearGradient>
              </defs>
              <path fill="url(#half-star)" d="M8 1.62l1.9 3.85 4.25.62-3.07 2.99.72 4.22L8 11.77l-3.8 1.99.72-4.22L1.85 6.09l4.25-.62L8 1.62z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 16 16">
              <path d="M8 1.62l1.9 3.85 4.25.62-3.07 2.99.72 4.22L8 11.77l-3.8 1.99.72-4.22L1.85 6.09l4.25-.62L8 1.62z"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col gap-8 h-full">
    <div className="flex flex-col gap-6">
      <StarRating rating={testimonial.rating} />
      <p className="text-gray-600 text-base leading-6 font-normal">
        &quot;{testimonial.text}&quot;
      </p>
    </div>
    
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="text-gray-700 text-base font-medium leading-6">
          {testimonial.name}
        </h4>
        <p className="text-gray-600 text-sm font-normal leading-5">
          {testimonial.role}
        </p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="w-full py-16 md:py-28 bg-gray-100">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-11 md:gap-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-36">
            <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 w-full md:w-[640px] mx-auto md:mx-0">
              {/* Sub heading */}
              <div className="inline-flex items-center justify-center px-3 md:px-4 py-1 bg-blue-50 rounded-lg self-center md:self-start">
                <span className="text-blue-600 text-sm md:text-base font-medium">
                  Testimonial
                </span>
              </div>
              
              {/* Main heading */}
              <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[328px] md:max-w-none">
                <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold leading-[1.11] md:leading-tight text-center md:text-left">
                  Hear from Our Happy Customers
                </h2>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-5 w-full">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-1">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
