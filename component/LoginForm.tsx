"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Input from "./Input";
import LoginAction from "@/app/action/LoginAction";
import { useAuth } from "@/store/useAuth";

export default function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setMessage(null);
    setError(null);

    startTransition(async () => {
      const response = await LoginAction(formData);

      if (response.error) {
        setMessage(response.message || "Error al iniciar sesión");
        setError(true);
        return;
      }

      if (response.data) {
        login({
          id: response.data.id,
          email: response.data.email,
          rol: response.data.rol,
        });
      }

      setError(false);
      setMessage("Login exitoso. Redirigiendo...");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
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
        Login
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            required
          />
        </div>
      </section>

      {/* Mensaje */}
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
          {isPending ? "Ingresando..." : "Login"}
        </button>

        <Link
          href="/registro"
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
          Registrar
        </Link>
      </div>
    </form>
  );
}
