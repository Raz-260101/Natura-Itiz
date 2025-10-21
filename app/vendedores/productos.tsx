"use client";

import React, { useState } from "react";

export default function VendedorProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    tipo: "producto",
    precio: "",
    descripcion: "",
    imagen: null,
    imagenUrl: ""
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file" && files && files[0]) {
      setForm(f => ({ ...f, imagen: files[0], imagenUrl: URL.createObjectURL(files[0]) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProductos(prev => [
      ...prev,
      {
        nombre: form.nombre,
        tipo: form.tipo,
        precio: form.precio,
        descripcion: form.tipo === "platillo" ? form.descripcion : "",
        imagenUrl: form.imagenUrl
      }
    ]);
    setForm({ nombre: "", tipo: "producto", precio: "", descripcion: "", imagen: null, imagenUrl: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Menú de ingreso de productos</h1>
      <button
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setShowForm(f => !f)}
      >
        {showForm ? "Cerrar formulario" : "Agregar producto/platillo"}
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded shadow p-4 mb-8 flex flex-col gap-3"
        >
          <label className="font-medium">Nombre
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="font-medium">Tipo
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            >
              <option value="producto">Producto</option>
              <option value="platillo">Platillo</option>
            </select>
          </label>
          <label className="font-medium">Precio
            <input
              name="precio"
              type="number"
              min="0"
              value={form.precio}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>
          {form.tipo === "platillo" && (
            <label className="font-medium">Descripción
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1 mt-1"
              />
            </label>
          )}
          <label className="font-medium">Imagen
            <input
              name="imagen"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 mt-1"
            />
          </label>
          {form.imagenUrl && (
            <img src={form.imagenUrl} alt="Vista previa" className="w-32 h-32 object-cover rounded mx-auto my-2" />
          )}
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      )}
      <div className="w-full max-w-2xl grid gap-6 grid-cols-1 sm:grid-cols-2">
        {productos.map((prod, idx) => (
          <div key={idx} className="bg-white rounded shadow p-4 flex flex-col items-center">
            {prod.imagenUrl && (
              <img src={prod.imagenUrl} alt={prod.nombre} className="w-32 h-32 object-cover rounded mb-2" />
            )}
            <h2 className="text-lg font-bold mb-1">{prod.nombre}</h2>
            <span className="text-sm text-gray-600 mb-1">{prod.tipo === "platillo" ? "Platillo" : "Producto"}</span>
            <span className="text-green-700 font-semibold mb-1">${prod.precio}</span>
            {prod.tipo === "platillo" && (
              <p className="text-gray-700 text-center text-sm mb-1">{prod.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
