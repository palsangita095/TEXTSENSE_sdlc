"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const companies = [
  { logo: 1, name: "Brightpath" },
  { logo: 2, name: "Lumen Labs" },
  { logo: 3, name: "Northwind" },
  { logo: 4, name: "Tidalform" },
  { logo: 5, name: "Kitewave" },
  { logo: 6, name: "Orbitstack" },
  { logo: 7, name: "Meridian" },
];

const Trustedcompanies = () => {
  return (
    <section className="py-6 sm:py-8 border-y border-gray-200 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <p className="text-center text-[10px] sm:text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-6">
          Trusted by customer-obsessed teams at 2,600+ companies
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={3000}
          slidesPerView={2}
          spaceBetween={20}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 25 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 35 },
            1280: { slidesPerView: 6, spaceBetween: 40 },
          }}
        >
          {companies.map((company) => (
            <SwiperSlide key={company.name}>
              <div className="flex items-center justify-center">
                <Image
                  src={`/assets/images/home_page/company-logo${company.logo}.png`}
                  alt={`${company.name} logo`}
                  width={10}
                  height={13}
                  className="w-5 h-5 object-contain mr-2"
                />

                <Image
                  src={`/assets/images/home_page/company-name${company.logo}.png`}
                  alt={company.name}
                  width={88}
                  height={18}
                  className="w-24 h-6 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Trustedcompanies;
