"use client";


import { ProductoType } from '@/type'
import Link from "next/link";
import React from 'react'

export default function ProductCard({
producto
}:{
producto:ProductoType
}) {
  
  return (
    <div
              className=" py-8 px-4 bg-card hover:shadow-lg hover:shadow-primary transition cursor-pointer rounded-lg"
            >
              <img 
                src={producto.imgUrl}
                alt={producto.nombre}
              className="w-full h-44 bg-gray-100 rounded object-cover"/>
              <h3 className="mt-2 font-semibold">{producto.nombre}</h3>
              <p className="text-sm text-mutted">{`$${producto.precio}`}</p>
              <p>{producto.descripcion}</p>
             <Link
  href={`${"/producto"}/${producto.id}`}
  className="mt-2 block text-center w-full bg-primary text-foreground-card font-bold py-1 rounded hover:bg-primary/80 transition"
>
  Ver
</Link>
            </div>
  )
}
