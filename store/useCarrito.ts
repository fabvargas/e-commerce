import { create } from "zustand";
import type { CarritoItem } from "@/type";

interface CarritoState {
  carrito: CarritoItem[];

  agregar: (item: CarritoItem) => void;
  aumentar: (id: number) => void;
  disminuir: (id: number) => void;
  eliminar: (id: number) => void;
  vaciar: () => void;

  total: () => number;
}

export const useCarrito = create<CarritoState>((set, get) => ({
  carrito: [],

  agregar: (itemNuevo) =>
    set((state) => {
      const existe = state.carrito.find(
        (i) => i.producto.id === itemNuevo.producto.id
      );

      if (existe) {
        return {
          carrito: state.carrito.map((i) =>
            i.producto.id === itemNuevo.producto.id
              ? { ...i, cantidad: i.cantidad + itemNuevo.cantidad }
              : i
          ),
        };
      }

      return { carrito: [...state.carrito, itemNuevo] };
    }),

  aumentar: (id) =>
    set((state) => ({
      carrito: state.carrito.map((i) =>
        i.producto.id === id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      ),
    })),

  disminuir: (id) =>
    set((state) => ({
      carrito: state.carrito.map((i) =>
        i.producto.id === id
          ? { ...i, cantidad: Math.max(1, i.cantidad - 1) }
          : i
      ),
    })),

  eliminar: (id) =>
    set((state) => ({
      carrito: state.carrito.filter((i) => i.producto.id !== id),
    })),

  vaciar: () => set({ carrito: [] }),

  total: () =>
    get().carrito.reduce(
      (acc, i) => acc + i.producto.precio * i.cantidad,
      0
    ),
}));
