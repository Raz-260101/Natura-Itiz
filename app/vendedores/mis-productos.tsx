"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";

const categorias = [
  "Pescado", "Carne", "Pollo", "Verdura", "Fruta", "Bebida", "Postre", "Otro"
];

export default function MisProductos() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number|null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    imageUrl: "",
    isOrganic: false
  });
  const [loading, setLoading] = useState(false);

  // Fetch productos al cargar
  useEffect(() => {
    if (!user?.email) return;
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProductos(data.filter((prod: any) => prod.sellerEmail === user.email));
      });
  }, [user]);

  // Abrir modal para agregar o editar
  const openModal = (idx: number|null = null) => {
    if (idx !== null) {
      const prod = productos[idx];
      setForm({
        name: prod.name,
        description: prod.description || "",
        price: prod.price?.toString() || "",
        originalPrice: prod.originalPrice?.toString() || "",
        category: prod.category || "",
        imageUrl: prod.imageUrl || "",
        isOrganic: !!prod.isOrganic
      });
      setEditIndex(idx);
    } else {
      setForm({ name: "", description: "", price: "", originalPrice: "", category: "", imageUrl: "", isOrganic: false });
      setEditIndex(null);
    }
    setModalOpen(true);
  };

  // Guardar producto (nuevo o editado)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      sellerEmail: user?.email || ""
    };
    let res;
    if (editIndex === null) {
      res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const nuevo = await res.json();
        setProductos([nuevo, ...productos]);
      }
    } else {
      const prodId = productos[editIndex]._id;
      res = await fetch(`/api/products/${prodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const actualizado = await res.json();
        const actualizados = [...productos];
        actualizados[editIndex] = actualizado;
        setProductos(actualizados);
      }
    }
    setModalOpen(false);
    setLoading(false);
  };

  // Eliminar producto (backend)
  const handleDelete = async (idx: number) => {
    const prodId = productos[idx]._id;
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const res = await fetch(`/api/products/${prodId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setProductos(productos.filter((_, i) => i !== idx));
      }
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-700 mb-1">Mis Productos</h1>
          <p className="text-gray-600">Gestiona los productos que ofreces en Natura-Itiz</p>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2"
          onClick={() => openModal(null)}
        >
          <span className="text-xl">+</span> Agregar Producto
        </button>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productos.map((prod, idx) => (
          <div key={prod._id || idx} className="bg-white rounded-2xl shadow p-0 overflow-hidden flex flex-col">
            {prod.imageUrl && (
              <img src={prod.imageUrl} alt={prod.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="font-bold text-lg mb-1">{prod.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-600 font-bold text-xl">${prod.price?.toFixed(2)}</span>
                <span className="border px-2 py-0.5 rounded text-xs text-gray-700 bg-gray-100">{prod.category}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex-1 flex items-center justify-center gap-1 border rounded px-2 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={() => openModal(idx)}
                >
                  <span className="material-icons text-base">edit</span> Editar
                </button>
                <button
                  className="flex items-center justify-center gap-1 border rounded px-2 py-1 text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(idx)}
                >
                  <span className="material-icons text-base">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setModalOpen(false)}
            >×</button>
            <h2 className="text-xl font-bold mb-2">{editIndex === null ? "Agregar Nuevo Producto" : "Editar Producto"}</h2>
            <p className="text-gray-600 mb-4">Completa la información del producto que deseas {editIndex === null ? "agregar" : "actualizar"} a tu tienda.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="font-medium">Nombre del Producto *
                <input
                  name="name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="font-medium">Descripción *
                <textarea
                  name="description"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <div className="flex gap-2">
                <label className="font-medium flex-1">Precio (MXN) *
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    required
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="font-medium flex-1">Precio Original (opcional)
                  <input
                    name="originalPrice"
                    type="number"
                    min="0"
                    value={form.originalPrice}
                    onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
              </div>
              <label className="font-medium">Categoría *
                <select
                  name="category"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
              <label className="font-medium">URL de Imagen
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full border rounded px-2 py-1 mt-1"
                  placeholder="/ruta/a/imagen.jpg"
                />
                <span className="text-xs text-gray-400">Deja vacío para usar imagen por defecto</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isOrganic}
                  onChange={e => setForm(f => ({ ...f, isOrganic: e.target.checked }))}
                />
                Producto Orgánico
              </label>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {editIndex === null ? "Agregar Producto" : "Actualizar Producto"}
              </button>
              <button
                type="button"
                className="mt-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setModalOpen(false)}
              >Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
