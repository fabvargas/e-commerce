import React from 'react'
import ProductoCard from './ProductCard';
import { ProductoType } from '@/app/type';

export default function ProductosGrid({
    productos,
}:{
    productos: ProductoType[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {/* Producto demo */}
          {productos.map((produc) => (
            <ProductoCard key={produc.id} producto={produc} />
          ))}
        </div>
  )
}
