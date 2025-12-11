"use client"

import { ProductoType } from '@/type'
import Link from 'next/link'


export default function FooterItem({items}:{items:ProductoType[]}) {
  return (
  <div className="mt-16">
  <h2 className="text-xl sm:text-2xl font-bold mb-4">Productos relacionados</h2>

  <div 
  className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent custom-scroll"
  
  >
    
    {/* Reemplaza este array por productos reales si quieres */}
    {items.map((item, index) => (
      <Link
        key={index}
        href={`/producto/${item.id}`}
        className="min-w-[220px] bg-card rounded-xl shadow-md p-4  hover:shadow-lg transition cursor-pointer"
    
      >
        <img
          src={item.imgUrl}
          alt={item.nombre}
          className="w-full h-[150px] object-cover rounded-lg"
        />

        <h3 className="mt-3 font-semibold text-primary">
          {item.nombre}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.descripcion}
        </p>

        <p className="mt-2 font-bold text-primary text-lg">${item.precio}</p>
      </Link>
    ))}

  </div>
</div>
  )
}
