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
  imgUrl: p.imgUrl
}));

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
  

  {/* FORM */}
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
        >
          -
        </button>

        {/* Input cantidad */}
        <input
          type="text"
          value={1}
          readOnly
          className="w-14 text-center border border-border rounded-lg py-2 bg-card"
        />

        {/* Botón + */}
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center 
          bg-foreground-card rounded-lg text-xl font-bold 
          hover:bg-foreground/20 transition"
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
    >
      Añadir al carrito
    </button>
  </form>
</aside>

      </section>

     {/* Productos relacionados con scroll horizontal */}
<div className="mt-16">
  <h2 className="text-xl sm:text-2xl font-bold mb-4">Productos relacionados</h2>

  <div 
  className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent custom-scroll"
  
  >
    
    {/* Reemplaza este array por productos reales si quieres */}
    {itemCarousel.map((item, index) => (
      <div
        key={index}
        className="min-w-[220px] bg-card rounded-xl shadow-md p-4  hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={item.imgUrl}
          alt={item.nombre}
          className="w-full h-[150px] object-cover rounded-lg"
        />

        <h3 className="mt-3 font-semibold text-primary">
          {item.nombre}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.descripcion}
        </p>

        <p className="mt-2 font-bold text-primary text-lg">${item.precio}</p>
      </div>
    ))}

  </div>
</div>


    </div>
  );
}
