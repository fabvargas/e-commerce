import { IProductoRepository } from "../Dominio/RepoInterface/IProductoRepository";

const db = {
  productos: [
    {
      id: 1,
      nombre: "Camisa Azul",
      precio: 22000,
      descripcion: "Camisa azul de algodón premium, cómoda y elegante para uso diario.",
      imgUrl: "/productos/camisa-azul.jpg"
    },
    {
      id: 2,
      nombre: "Lente Negro",
      precio: 35500,
      descripcion: "Lentes de sol negros con protección UV400 y diseño moderno.",
      imgUrl: "/productos/lente-negro.jpg"
    },
    {
      id: 3,
      nombre: "Poleras Blancas",
      precio: 15750,
      descripcion: "Pack de poleras blancas de alta calidad, suaves y duraderas.",
      imgUrl: "/productos/poleras-blancas.jpg"
    },
    {
      id: 4,
      nombre: "Poleras de Colores",
      precio: 25000,
      descripcion: "Pack de poleras en varios colores vibrantes, perfectas para cualquier ocasión.",
      imgUrl: "/productos/poleras-colores.jpg"
    },
    {
      id: 5,
      nombre: "Reloj Blanco",
      precio: 22300,
      descripcion: "Reloj blanco minimalista con correa resistente al agua.",
      imgUrl: "/productos/reloj-blanco.jpg"
    },
    {
      id: 6,
      nombre: "Zapatilla Azul",
      precio: 18900,
      descripcion: "Zapatillas deportivas azules, ligeras y transpirables.",
      imgUrl: "/productos/zapatilla-azul.jpg"
    },
    {
      id: 7,
      nombre: "Zapatilla Negra",
      precio: 40000,
      descripcion: "Zapatillas negras con suela antideslizante y diseño urbano.",
      imgUrl: "/productos/zapatilla-negra.jpg"
    },
    {
      id: 8,
      nombre: "Zapatilla Roja",
      precio: 27450,
      descripcion: "Zapatillas rojas llamativas con amortiguación extra para mayor confort.",
      imgUrl: "/productos/zapatilla-roja.jpg"
    }
  ]
};



export class ProductosRepositorio implements IProductoRepository {

    db= db;

    async obtenerTodos() {
        return this.db.productos;
    }
}