"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import Link from "next/link";

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editMembership, setEditMembership] = useState(user?.membership || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Estado para productos y formulario
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "producto",
    price: "",
    description: "",
    imageUrl: ""
  });
  const [productLoading, setProductLoading] = useState(false);

  // Fetch productos en tiempo real
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {}
    };
    fetchProducts();
  }, []);

  // Handler para el formulario de productos
  const handleProductChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          sellerEmail: user?.email || ""
        })
      });
      if (res.ok) {
        setForm({ name: "", type: "producto", price: "", description: "", imageUrl: "" });
        setShowProductForm(false);
        const data = await res.json();
        setProducts((prev) => [...prev, data.product]);
      }
    } catch (err) {}
    setProductLoading(false);
  };

  // Sincroniza los valores del usuario con los inputs al abrir el modal
  useEffect(() => {
    if (showEditModal) {
      setEditName(user?.name || "");
      setEditMembership(user?.membership || "");
      setEditEmail(user?.email || "");
    }
  }, [showEditModal, user]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/usuarios", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          membership: editMembership,
        }),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error("Error inesperado en el servidor: " + text.slice(0, 100));
      }
      if (!res.ok) throw new Error(data.error || "Error al actualizar");
      setEditName(data.name);
      setEditEmail(data.email);
      setEditMembership(data.membership);
      setShowEditModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-0 sm:px-4 md:px-8 py-2 sm:py-6 w-full">
          <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 w-full min-h-[60vh] flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-600 hover:bg-gray-50 bg-transparent"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Regresar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => { logout(); router.push("/"); }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <User className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 break-words text-center">{editName}</h1>
                <p className="text-muted-foreground mb-2 break-words text-center">{editEmail}</p>
                <div className="text-center">
                  <p className="text-sm font-semibold text-green-600">Membresía:</p>
                  <p className="text-lg font-bold text-green-600">{editMembership || "Sin membresía"}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  onClick={() => alert('Funcionalidad de cambiar membresía próximamente')}
                >
                  Cambiar membresía
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => alert('Funcionalidad de dar de baja próximamente')}
                >
                  Dar de baja
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-4">Tipo: {user?.type}</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                  onClick={() => setShowEditModal(true)}
                >
                  Editar datos
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                  onClick={() => router.push("/")}
                >
                  Volver al inicio
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 mt-6 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Favoritos</h2>
              <p className="text-center text-muted-foreground py-8">No tienes productos favoritos aún.</p>
            </div>
            {/* Menú de ingreso de productos para vendedores */}
            {user?.role === "vendedor" && (
              <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 mt-6 w-full">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 mb-2" onClick={() => setShowProductForm(v => !v)}>
                  {showProductForm ? "Cerrar formulario" : "Agregar producto/platillo"}
                </Button>
                {showProductForm && (
                  <form onSubmit={handleProductSubmit} className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
                    <div className="mb-2">
                      <label htmlFor="product-name" className="block mb-1">Nombre</label>
                      <input id="product-name" name="name" value={form.name} onChange={handleProductChange} required className="w-full px-2 py-1 rounded" placeholder="Nombre del producto o platillo" title="Nombre" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="product-type" className="block mb-1">Tipo</label>
                      <select id="product-type" name="type" value={form.type} onChange={handleProductChange} className="w-full px-2 py-1 rounded" title="Tipo">
                        <option value="producto">Producto</option>
                        <option value="platillo">Platillo</option>
                      </select>
                    </div>
                    {form.type === "platillo" && (
                      <div className="mb-2">
                        <label htmlFor="product-description" className="block mb-1">Descripción</label>
                        <textarea id="product-description" name="description" value={form.description} onChange={handleProductChange} className="w-full px-2 py-1 rounded" placeholder="Describe el platillo" title="Descripción" />
                      </div>
                    )}
                    <div className="mb-2">
                      <label htmlFor="product-price" className="block mb-1">Precio</label>
                      <input id="product-price" name="price" type="number" value={form.price} onChange={handleProductChange} required className="w-full px-2 py-1 rounded" placeholder="Precio" title="Precio" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="product-image" className="block mb-1">Imagen (URL)</label>
                      <input id="product-image" name="imageUrl" value={form.imageUrl} onChange={handleProductChange} className="w-full px-2 py-1 rounded" placeholder="URL de la imagen" title="Imagen" />
                    </div>
                    <button type="submit" disabled={productLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
                      {productLoading ? "Guardando..." : "Guardar"}
                    </button>
                  </form>
                )}
                <h2 className="text-lg font-semibold mb-2">Productos subidos</h2>
                {products.filter(p => p.sellerEmail === user.email).length === 0 ? (
                  <p>No hay productos registrados.</p>
                ) : (
                  <ul className="space-y-2">
                    {products.filter(p => p.sellerEmail === user.email).map((p) => (
                      <li key={p._id} className="border p-2 rounded">
                        <div className="font-bold">{p.name}</div>
                        <div>Tipo: {p.type}</div>
                        <div>Precio: ${p.price}</div>
                        {p.description && <div>Descripción: {p.description}</div>}
                        {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-cover mt-2" />}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
        {/* Modal de edición de datos */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="w-full max-w-lg sm:max-w-xl p-2 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Editar datos</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <Input value={editName} onChange={e => setEditName(e.target.value)} required className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} required type="email" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Membresía</label>
                <Input value={editMembership} onChange={e => setEditMembership(e.target.value)} className="w-full" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:flex-1 bg-primary text-white" disabled={loading}>
                  Guardar
                </Button>
                <Button type="button" variant="outline" className="w-full sm:flex-1" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
