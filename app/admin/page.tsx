import { productoServicio } from "@/src/Servicios/ProducosServicio";
import StockManager from "@/component/StockManager";

export default async function AdminPanel() {
  const productos = await productoServicio.obtenerTodosLosProductos();

  const productosData = productos.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    descripcion: p.descripcion,
    stock: p.stock,
    imgUrl: p.imgUrl,
  }));

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Panel de Administración</h1>
      
      <StockManager productos={productosData} />
    </div>
  );
}

