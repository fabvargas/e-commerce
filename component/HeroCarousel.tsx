"use client";
import { ProductoType } from "@/app/type";
import React, { useEffect, useState } from "react";


interface HeroCarouselProps {
  items: ProductoType[];
  autoPlayInterval?: number; // ms, opcional
}

export default function HeroCarousel({ items, autoPlayInterval = 4000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [items.length, autoPlayInterval]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % items.length);

  return (
  <section className="w-full my-4 flex flex-col items-center gap-4 bg-card py-12 sm:px-6 px-4 rounded-lg relative">
  <div className="w-full max-w-[800px] h-64 md:h-96 relative overflow-hidden rounded-lg">
    {items.map((item, index) => (
      <img
        key={item.id}
        src={item.imgUrl}
        alt={item.nombre}
        className={`w-full h-full object-cover transition-opacity duration-700 absolute top-0 left-0
          ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
        `}
      />
    ))}

    {/* Controles */}
    <button
      onClick={goPrev}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-black px-2 py-1 rounded z-20"
    >
      ◀
    </button>
    <button
      onClick={goNext}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-black px-2 py-1 rounded z-20"
    >
      ▶
    </button>
  </div>

  {/* Paginación */}
  <div className="flex gap-2 mt-4">
    {items.map((_, index) => (
      <span
        key={index}
        onClick={() => setCurrent(index)}
        className={`w-3 h-3 rounded-full cursor-pointer transition-colors
          ${index === current ? "bg-primary" : "bg-gray-400"}
        `}
      />
    ))}
  </div>
</section>
  );
}
