import { CarritoItem } from '@/type'
import React from 'react'

export default function CarroItem({
    item, 
    cantidad,
    aumentar, 
    disminuir, 
    eliminar
}:{
    item:CarritoItem,
    cantidad:number,
    aumentar: (id:number) => void,
    disminuir: (id:number) => void,
    eliminar: (id:number) => void
}) {

    const {producto} = item;
  return (
    <div
              key={producto?.id}
              className="flex gap-4 p-4 bg-card rounded-xl shadow-sm"
            >
              <img
                src={producto?.imgUrl}
                alt={producto?.nombre}
                className="w-24 h-24 rounded object-cover"
              />

              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold text-lg">{producto?.nombre}</h3>
                  <p className="text-primary font-bold">
                    ${producto?.precio.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => disminuir(producto.id)}
                      className="px-2 py-1 rounded bg-secondary hover:bg-secondary/70"
                    >
                      -
                    </button>

                    <span className="px-3">{cantidad}</span>

                    <button
                      onClick={() => aumentar(producto.id)}
                      className="px-2 py-1 rounded bg-secondary hover:bg-secondary/70"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => eliminar(producto.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
  )
}
