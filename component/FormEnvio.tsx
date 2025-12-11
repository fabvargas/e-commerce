"use client";

import React, { useState } from "react";
import Input from "./Input";

export default function FormularioEnvio() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    region: "",
    codigoPostal: "",
    telefono: "",
    metodoPago: "tarjeta",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del envío:", form);
    alert("Formulario enviado");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-6 rounded-xl shadow-md w-full max-w-[600px] lg:max-w-[450px]  mt-10 space-y-5 flex flex-col mx-auto"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Información de Envío</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Nombre completo</label>
        <Input
          name="nombre"
          type="text"
          className="input"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Email</label>
        <Input
          name="email"
          type="email"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Dirección</label>
        <Input
          name="direccion"
          type="text"
          className="input"
          value={form.direccion}
          onChange={handleChange}
          required
        />
      </div>

     
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Ciudad</label>
          <Input
            name="ciudad"
            type="text"
            className="input"
            value={form.ciudad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Región</label>
          <Input
            name="region"
            type="text"
            className="input"
            value={form.region}
            onChange={handleChange}
            required
          />
        </div>
     

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Código Postal</label>
        <Input
          name="codigoPostal"
          type="text"
          className="input"
          value={form.codigoPostal}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Teléfono</label>
        <Input
          name="telefono"
          type="text"
          className="input"
          value={form.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Método de pago</label>
        <select
          name="metodoPago"
          className="input"
          value={form.metodoPago}
          onChange={handleChange}
        >
          <option value="tarjeta">Tarjeta de crédito / débito</option>
          <option value="transferencia">Transferencia bancaria</option>
          <option value="contraentrega">Pago contra entrega</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-foreground-card py-3 rounded-lg font-bold hover:bg-primary/80 transition"
      >
        Finalizar compra
      </button>
    </form>
  );
}
