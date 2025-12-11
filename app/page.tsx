
import HeroCarousel from "@/component/HeroCarousel";
import ProductosGrid from "@/component/ProductosGrid";
import { productoServicio } from "@/src/Servicios/ProducosServicio";


export default async function Page() {

const productoService = productoServicio
const productos = await productoService.obtenerTodosLosProductos();

const itemCarousel = productos.map(p => ({
  id: p.id,
  nombre: p.nombre,
  precio: p.precio,
  descripcion: p.descripcion,
  imgUrl: p.imgUrl
}));

  return (
    <div className="w-full min-h-screen flex flex-col p-2 sm:p-6 mb-10">

    
     <HeroCarousel items={itemCarousel}/>
      <ProductosGrid productos={productos}/>
     
    </div>
  );
}
