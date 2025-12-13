"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { useAuth } from "@/store/useAuth";
import UpdateUserAction from "@/app/action/UpdateUserAction";
import GetUserAction from "@/app/action/GetUserAction";

export default function PerfilForm() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });

  useEffect(() => {
    if (user) {
      startTransition(async () => {
        const response = await GetUserAction(user.id);
        if (!response.error && response.data) {
          setForm({
            nombre: response.data.nombre || "",
            direccion: response.data.direccion || "",
            telefono: response.data.telefono || "",
          });
        }
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!user) {
      setError(true);
      setMessage("No hay usuario logueado");
      return;
    }

    const formData = new FormData();
    formData.append("id", user.id.toString());
    formData.append("nombre", form.nombre);
    formData.append("direccion", form.direccion);
    formData.append("telefono", form.telefono);

    startTransition(async () => {
      const response = await UpdateUserAction(formData);

      if (response.error) {
        setError(true);
        setMessage(response.message || "Error al actualizar el usuario");
        return;
      }

      if (response.data) {
        login({
          id: response.data.id,
          email: response.data.email,
          rol: response.data.rol || user?.rol,
        });
      }

      setError(false);
      setMessage("Información actualizada correctamente");
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-[500px] bg-card px-4 py-8 md:p-8 rounded-lg space-y-6">
        <p className="text-center text-mutted">Cargando...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full 
        max-w-[500px] 
        bg-card 
        px-4
        py-8
        md:p-8 
        rounded-lg 
        space-y-6 
        box-border
      "
    >
      <h3 className="text-primary text-3xl md:text-4xl font-bold text-center md:text-left">
        Mi Perfil
      </h3>

      <div className="space-y-2">
        <label className="font-medium text-sm text-mutted">Email</label>
        <Input
          name="email"
          type="email"
          value={user?.email || ""}
          disabled
          className="opacity-60 cursor-not-allowed"
        />
        <p className="text-xs text-mutted">El email no se puede modificar</p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="nombre" className="font-medium text-sm">
            Nombre completo
          </label>
          <Input
            name="nombre"
            id="nombre"
            type="text"
            placeholder="Ingrese su nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="direccion" className="font-medium text-sm">
            Dirección
          </label>
          <Input
            name="direccion"
            id="direccion"
            type="text"
            placeholder="Ingrese su dirección"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="telefono" className="font-medium text-sm">
            Teléfono
          </label>
          <Input
            name="telefono"
            id="telefono"
            type="text"
            placeholder="Ingrese su teléfono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>
      </section>

      {message && (
        <p
          className={`text-center text-sm font-medium ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <div className="flex flex-col space-y-4 md:px-6 px-0">
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full 
            bg-primary 
            text-foreground-card
            py-2 
            rounded-lg
            font-semibold 
            hover:bg-primary/80 
            transition
            disabled:opacity-50
          "
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="
            w-full 
            bg-transparent 
            border 
            border-red-500 
            text-red-500
            py-2 
            rounded-lg
            font-semibold 
            hover:bg-red-500
            hover:text-white 
            transition
          "
        >
          Cerrar Sesión
        </button>
      </div>
    </form>
  );
}

