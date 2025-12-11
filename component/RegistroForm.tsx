"use client";

import Input from "./Input";
import Link from "next/link";
import { useState, useTransition } from "react";
import RegisterAction from "@/app/action/RegisterAction";

export default function RegistroForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

     const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const response = await RegisterAction(formData);

      if (response.error) {
        setMessage(response.message || "Error al registrar usuario");
        setError(true);
        return;
      }

      setError(false);
      setMessage("Registro exitoso. Redirigiendo...");

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    });
  };

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
        Registrar
      </h3>

      <section className="space-y-4">
        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Ingrese su email"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="font-medium text-sm">
            Password
          </label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Ingrese una contraseña"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="confirmPassword" className="font-medium text-sm">
            Confirmar Password
          </label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirme su contraseña"
            required
          />
        </div>
      </section>

      {/* Mensaje de error o éxito */}
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
            block
            text-center
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
          {isPending ? "Registrando..." : "Registrar"}
        </button>

        <Link
          href="/login"
          className="
            block
            text-center
            w-full 
            bg-transparent 
            border 
            border-primary 
            text-primary
            py-2 
            rounded-lg
            font-semibold 
            hover:bg-primary
            hover:text-foreground-card 
            transition
          "
        >
          Login
        </Link>
      </div>
    </form>
  );
}
