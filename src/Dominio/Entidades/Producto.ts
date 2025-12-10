export interface ProductoProps {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imgUrl: string;
}

export class Producto {
  private readonly props: ProductoProps;

 
  private constructor(props: ProductoProps) {
    this.props = props;
  }


  private static validar(props: ProductoProps) {
    if (!props.nombre || props.nombre.trim().length === 0) {
      throw new Error("El nombre del producto no puede estar vacío.");
    }

    if (props.precio <= 0) {
      throw new Error("El precio debe ser mayor a 0.");
    }

    if (!props.imgUrl.endsWith(".jpg")) {
      throw new Error("La imagen debe ser un archivo .jpg.");
    }
  }


  static crear(props: ProductoProps): Producto {
    this.validar(props); 
    return new Producto(props);
  }


  get id(): number {
    return this.props.id;
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get precio(): number {
    return this.props.precio;
  }

  get descripcion(): string {
    return this.props.descripcion;
  }

  get imgUrl(): string {
    return this.props.imgUrl;
  }
}
