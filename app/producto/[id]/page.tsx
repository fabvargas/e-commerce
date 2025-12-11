import FooterItem from "@/component/FooterItem";
import FormProducto from "@/component/FormProducto";
import { productoServicio } from "@/src/Servicios/ProducosServicio";

export default async function Page({ params }: {params:Promise<{ id: string }>}) {

  const { id } = await params;
  const producto = await productoServicio.obtenerProductoPorId(Number(id));

  const productos = (await productoServicio.obtenerTodosLosProductos()).filter(p => p.id !== producto?.id).slice(0, 6);

const itemCarousel = productos.map(p => ({
  id: p.id,
  nombre: p.nombre,
  precio: p.precio,
  descripcion: p.descripcion,
  stock: p.stock,
  imgUrl: p.imgUrl
}));

const item = producto ? {
  id: producto.id,
  nombre: producto.nombre,
  precio: producto.precio,
  descripcion: producto.descripcion,
  stock: producto.stock,
  imgUrl: producto.imgUrl
} : null;
  

  return (
    <div className="w-full p-4 sm:p-8 md:p-12 lg:p-16">
      
      <section className="flex flex-col lg:flex-row rounded-lg overflow-hidden w-full gap-4 max-w-[1500px] mx-auto">
        
        {/* Imagen */}
        <div
          className="
            flex-1 bg-foreground-card p-4 sm:p-8 md:p-10 
            max-h-[700px]
            flex items-center justify-center
          "
        >
          <img
            src={producto?.imgUrl}
            alt={producto?.nombre}
            className="w-full max-h-[600px] object-cover bg-white rounded-lg"
          />
        </div>

        {/* Aside Info */}
      <aside className="bg-card w-full lg:max-w-[400px] flex flex-col p-4 sm:p-6 gap-6 rounded-xl shadow-md">
  

  <FormProducto producto={item!} />
</aside>

      </section>

     {/* Productos relacionados con scroll horizontal */}
    <FooterItem items={itemCarousel} />


    </div>
  );
}
