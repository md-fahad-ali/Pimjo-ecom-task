import Image from 'next/image';
import Link from 'next/link';
  

const categories = [
  {
    id: 1,
    name: 'DSLR Camera',
    productCount: 50,
    image: '/assets/dslr-camera.png',
    href: '/category/dslr-camera'
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    productCount: 45,
    image: '/assets/wireless-earbuds.png',
    href: '/category/wireless-earbuds'
  },
  {
    id: 3,
    name: 'Wristwatch',
    productCount: 57,
    image: '/assets/wristwatch.png',
    href: '/category/wristwatch'
  },
  {
    id: 4,
    name: 'SkyFlyer Drone',
    productCount: 86,
    image: '/assets/skyflyer-drone.png',
    href: '/category/skyflyer-drone'
  },
  {
    id: 5,
    name: 'Smart Speaker',
    productCount: 38,
    image: '/assets/smart-speaker.png',
    href: '/category/smart-speaker'
  }
];



const ProductCategories = () => {
  return (
    <section className="bg-[#F3F4F6] py-28">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col items-center gap-16 items-start">
          {/* Section Title */}
          <div className="flex flex-col items-start gap-4 max-w-[574px] text-center">
            <h2 className="text-[48px] font-semibold leading-[52px] text-[#1F2937]">
              Shop by Category
            </h2>
            <p className="text-base text-left font-normal leading-6 text-[#6B7280]  tracking-[-0.2px]">
              Explore our curated selection of products across premium categories, from everyday essentials to exclusive limited collections.
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group"
              >
                <div className="bg-white rounded-2xl p-2 hover:shadow-lg transition-shadow duration-300">
                  {/* Image Container */}
                  <div className="relative w-full h-[188px] bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Info */}
                  <div className="flex flex-col items-center gap-2 p-3">
                    <div className="flex flex-col items-center gap-1 w-full">
                      <h3 className="text-base font-semibold leading-6 text-[#1F2937] text-center tracking-[-0.2px]">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-base font-medium leading-6 text-[#6B7280] text-center tracking-[-0.2px]">
                      {category.productCount} Products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
