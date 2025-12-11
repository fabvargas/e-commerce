"use client";

import { useCarrito } from "../store/useCarrito";
import CarroItem from "./CarroItem";

export default function Carro() {
  const carrito = useCarrito((state) => state.carrito);
  const aumentar = useCarrito((state) => state.aumentar);
  const disminuir = useCarrito((state) => state.disminuir);
  const eliminar = useCarrito((state) => state.eliminar);
  const total = useCarrito((state) => state.total)();

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
          {carrito.map((item, i) => (
            <CarroItem
              key={i}
              item={item}
              cantidad={item.cantidad}
              aumentar={aumentar}
              disminuir={disminuir}
              eliminar={eliminar}
            />
          ))}

          {/* Total */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                ${total.toLocaleString()}
              </span>
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
}
