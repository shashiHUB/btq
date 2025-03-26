import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Pagination } from 'swiper/modules';
import { ImageWithFallback } from './ImageWithFallback';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  items: Array<{
    image: string;
    title: string;
  }>;
}

export function Carousel({ items }: CarouselProps) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!swiperRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        swiperRef.current.slidePrev();
      } else if (e.key === 'ArrowRight') {
        swiperRef.current.slideNext();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation, Keyboard, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-primary !w-2.5 !h-2.5',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
      }}
      className="pb-12"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative group overflow-hidden rounded-lg">
            <ImageWithFallback
              src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-medium">{item.title}</h4>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}