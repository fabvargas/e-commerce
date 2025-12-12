import { ValidationError } from "@/src/CustomError";

export interface UserProps {
  id: number;
  email: string;
  password: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;
}

export class User implements UserProps {
  id: number;
  email: string;
  password: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;

  private constructor({
    id,
    email,
    password,
    nombre,
    direccion,
    telefono
  }: UserProps) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  // -----------------------------
  // Validaciones internas
  // -----------------------------
  private static validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static validarPassword(password: string): boolean {
    return password.length >= 6;
  }

  private static validar(props: UserProps) {
    if (!this.validarEmail(props.email)) {
      throw new ValidationError("Email no es válido");
    }

    if (!this.validarPassword(props.password)) {
      throw new ValidationError("Password debe tener al menos 6 caracteres");
    }
  }

  // -----------------------------
  // Método fábrica
  // -----------------------------
  static crear(props: UserProps): User {
    this.validar(props);
    return new User(props);
  }
}
