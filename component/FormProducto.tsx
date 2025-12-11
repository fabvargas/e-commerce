"use client"
import { useCarrito } from '@/store/useCarrito';
import { ProductoType } from '@/type'
import { useState } from 'react'

export default function FormProducto({
    producto
}:{
    producto:ProductoType
}) {

const [cantidad, setCantidad] = useState(1);
const {agregar} =useCarrito()

const handleSumar = () => {
    if(cantidad < producto.stock){
         setCantidad(prev => prev + 1);
    }
 
};

const handleRestar = () => {
  if(cantidad > 1){
    setCantidad(prev => prev - 1);
  }
}

  return (
    
  <form className="flex flex-col gap-4 my-auto">
    <h3 className="text-xl sm:text-2xl font-semibold text-primary">{producto?.nombre}</h3>

  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
    {producto?.descripcion}
  </p>

  <p className="text-primary text-2xl font-bold mb-10">${producto?.precio}</p>
    
    {/* Stock */}
    <p className="text-sm font-bold mb-4">
      Stock: {" "}
      <span className="bg-foreground-card px-3 py-2 rounded-md font-bold">
        {producto?.stock}
      </span>
    </p>

    {/* Cantidad */}
    <div className="flex flex-col gap-2 mb-10">
      <span className="text-sm font-bold">Cantidad:</span>

      <div className="flex items-center gap-3">
        
        {/* Botón - */}
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center 
          bg-foreground-card rounded-lg text-xl font-bold 
          hover:bg-foreground/20 transition"
            onClick={handleRestar}
        >
          -
        </button>

        {/* Input cantidad */}
        <input
          type="text"
          value={cantidad}
          readOnly
          className="w-14 text-center border border-border rounded-lg py-2 bg-card"
        />

        {/* Botón + */}
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center 
          bg-foreground-card rounded-lg text-xl font-bold 
          hover:bg-foreground/20 transition"
            onClick={handleSumar}
        >
          +
        </button>
      </div>
    </div>

    {/* Botón principal */}
    <button
      type="submit"
      className="w-full bg-primary text-foreground-card font-bold py-3 rounded-lg 
      hover:bg-primary/80 transition shadow-sm "
        onClick={(e) => {
            e.preventDefault();
            agregar({producto, cantidad});
        }}
    >
      Añadir al carrito
    </button>
  </form>
  )
}
