"use client";

import React, { useState } from "react";

interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  imgUrl: string;
  cantidad: number;
}

export default function Carro() {
  const [carrito, setCarrito] = useState<CarritoItem[]>([
    {
      id: 1,
      nombre: "Audífonos Bluetooth",
      precio: 29990,
      imgUrl: "/img/audifonos.jpg",
      cantidad: 1,
    },
    {
      id: 2,
      nombre: "Teclado Mecánico RGB",
      precio: 54990,
      imgUrl: "/img/teclado.jpg",
      cantidad: 2,
    },
  ]);

  // Aumentar cantidad
  const aumentar = (id: number) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // Disminuir cantidad
  const disminuir = (id: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
            : item
        )
    );
  };

  // Eliminar producto
  const eliminar = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Carro de Compras
      </h1>

      {carrito.length === 0 ? (
        <p className="text-muted-foreground text-center text-lg">
          Tu carrito está vacío 🛒
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-card rounded-xl shadow-sm"
            >
              <img
                src={item.imgUrl}
                alt={item.nombre}
                className="w-24 h-24 rounded object-cover"
              />

              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold text-lg">{item.nombre}</h3>
                  <p className="text-primary font-bold">
                    ${item.precio.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => disminuir(item.id)}
                      className="px-2 py-1 rounded bg-secondary hover:bg-secondary/70"
                    >
                      -
                    </button>

                    <span className="px-3">{item.cantidad}</span>

                    <button
                      onClick={() => aumentar(item.id)}
                      className="px-2 py-1 rounded bg-secondary hover:bg-secondary/70"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => eliminar(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                ${total.toLocaleString()}
              </span>
            </div>

            <button className="w-full mt-4 bg-primary text-foreground-card py-3 rounded-lg font-bold hover:bg-primary/80 transition">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
