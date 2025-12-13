"use client";

import { useState, useTransition } from "react";
import { ProductoType } from "@/type";
import UpdateStockAction from "@/app/action/UpdateStockAction";

interface StockManagerProps {
  productos: ProductoType[];
}

export default function StockManager({ productos }: StockManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [productosList, setProductosList] = useState(productos);

  const handleEdit = (producto: ProductoType) => {
    setEditingId(producto.id);
    setStockValue(producto.stock);
    setMessage(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setStockValue(0);
    setMessage(null);
  };

  const handleSave = (id: number) => {
    if (stockValue < 0) {
      setMessage({ text: "El stock no puede ser negativo", error: true });
      return;
    }

    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("stock", stockValue.toString());

    startTransition(async () => {
      const response = await UpdateStockAction(formData);

      if (response.error) {
        setMessage({ text: response.message || "Error al actualizar stock", error: true });
        return;
      }

      setMessage({ text: response.message || "Stock actualizado correctamente", error: false });
      
      setProductosList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: stockValue } : p))
      );

      setTimeout(() => {
        setEditingId(null);
        setMessage(null);
      }, 1500);
    });
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-500";
    if (stock < 10) return "text-yellow-500";
    return "text-primary";
  };

  const getStockBg = (stock: number) => {
    if (stock === 0) return "bg-red-500/20 border-red-500";
    if (stock < 10) return "bg-yellow-500/20 border-yellow-500";
    return "bg-primary/20 border-primary";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Gestión de Stock</h2>
        <span className="text-sm text-mutted">
          Total productos: {productosList.length}
        </span>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.error
              ? "bg-red-500/20 text-red-400 border border-red-500/50"
              : "bg-primary/20 text-primary border border-primary/50"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productosList.map((producto) => (
          <div
            key={producto.id}
            className="bg-card p-4 rounded-xl shadow-md hover:shadow-lg transition border border-card"
          >
            <div className="flex gap-4">
              <img
                src={producto.imgUrl}
                alt={producto.nombre}
                className="w-20 h-20 object-cover rounded-lg bg-foreground-card"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate mb-1">
                  {producto.nombre}
                </h3>
                <p className="text-sm text-mutted mb-2 line-clamp-2">
                  {producto.descripcion}
                </p>
                
                {editingId === producto.id ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={stockValue}
                        onChange={(e) => setStockValue(parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 bg-input text-foreground rounded border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <span className="text-sm text-mutted">unidades</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(producto.id)}
                        disabled={isPending}
                        className="px-3 py-1 bg-primary text-foreground-card text-sm font-semibold rounded hover:bg-primary/80 transition disabled:opacity-50"
                      >
                        {isPending ? "Guardando..." : "Guardar"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isPending}
                        className="px-3 py-1 bg-transparent border border-mutted text-mutted text-sm font-semibold rounded hover:bg-mutted/10 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className={`px-3 py-2 rounded-lg border ${getStockBg(producto.stock)}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-mutted">Stock:</span>
                        <span className={`text-lg font-bold ${getStockColor(producto.stock)}`}>
                          {producto.stock}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(producto)}
                      className="w-full px-3 py-2 bg-primary/10 text-primary text-sm font-semibold rounded hover:bg-primary/20 transition"
                    >
                      Editar Stock
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {productosList.length === 0 && (
        <div className="text-center py-12 text-mutted">
          <p>No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
}

