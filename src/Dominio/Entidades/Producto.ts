export interface ProductoProps {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imgUrl: string;
}

export class Producto implements ProductoProps {
  private readonly props: ProductoProps;

  private constructor(props: ProductoProps) {
    this.props = props;
  }

  // ---------------------
  // Validaciones
  // ---------------------
  private static validar(props: ProductoProps) {
    if (!props.nombre || props.nombre.trim().length < 3) {
      throw new Error("El nombre del producto debe tener al menos 3 caracteres.");
    }

    if (props.precio <= 0) {
      throw new Error("El precio debe ser mayor a 0.");
    }

    if (props.stock < 0) {
      throw new Error("El stock no puede ser negativo.");
    }

    if (!props.descripcion || props.descripcion.trim().length === 0) {
      throw new Error("La descripción no puede estar vacía.");
    }

  }
  // ---------------------
  // Método fábrica
  // ---------------------
  static crear(props: ProductoProps): Producto {
    this.validar(props);
    return new Producto(props);
  }

  // ---------------------
  // Getters
  // ---------------------
  get id() {
    return this.props.id;
  }

  get nombre() {
    return this.props.nombre;
  }

  get precio() {
    return this.props.precio;
  }

  get descripcion() {
    return this.props.descripcion;
  }

  get stock() {
    return this.props.stock;
  }

  get imgUrl() {
    return this.props.imgUrl;
  }
}
