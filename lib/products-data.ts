export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  vendor: string
  badges: string[]
  category: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Filete de Pescado Pochado con Vegetales",
    price: 120.0,
    image: "/poached-fish-fillet-with-vegetables.jpg",
    description:
      "Un ligero y saludable filete de pescado pochado, servido sobre puré de calabaza o camote, y coronado con salsa fresca de aguacate y hierbas.",
    vendor: "Mariscos del Valle",
    badges: [],
    category: "Pescado",
  },
  {
    id: "2",
    name: "Tortitas de Quinoa y Vegetales",
    price: 76.5,
    originalPrice: 90.0,
    image: "/quinoa-vegetable-patties.jpg",
    description:
      "Tortitas doradas y crujientes de quinoa y vegetales, servidas sobre lechugas frescas, tomates y cebolla morada. Opción vegana y sin gluten.",
    vendor: "Veggie Life",
    badges: ["ORGÁNICO", "-15%"],
    category: "Vegetales",
  },
  {
    id: "3",
    name: "Pechuga de Pollo y Camarones",
    price: 140.0,
    image: "/chicken-breast-with-shrimp.jpg",
    description:
      "Pechuga de pollo y camarones salteados en salsa de naranja con arroz y ensalada fresca de lechuga, tomate y aguacate.",
    vendor: "Sabores del Mar y Tierra",
    badges: [],
    category: "Pollo",
  },
  {
    id: "4",
    name: "Salteado de Pollo y Vegetales",
    price: 104.5,
    originalPrice: 110.0,
    image: "/chicken-vegetable-stir-fry.jpg",
    description:
      "Pollo tierno con vegetales frescos al wok: zanahorias, calabacín, cebolla morada y chícharos. Sabor oriental delicioso.",
    vendor: "Wok Natural",
    badges: ["ORGÁNICO", "-5%"],
    category: "Pollo",
  },
  {
    id: "5",
    name: "Filete de Pescado con Salsa Verde",
    price: 135.0,
    image: "/fish-fillet-with-green-sauce.jpg",
    description:
      "Filete de pescado con salsa verde cremosa y papas doradas con perejil. Ideal para una comida elegante y saludable.",
    vendor: "Delicias del Lago",
    badges: [],
    category: "Pescado",
  },
  {
    id: "6",
    name: "Pechugas de Pollo Rellenas",
    price: 125.0,
    image: "/stuffed-chicken-breast.jpg",
    description:
      "Pechugas rellenas de espinacas y queso, envueltas en tocino y horneadas. Suculentas y llenas de sabor.",
    vendor: "Cocina Artesanal",
    badges: [],
    category: "Pollo",
  },
  {
    id: "7",
    name: "Carne Asada Premium",
    price: 180.0,
    image: "/grilled-premium-beef-steak.jpg",
    description: "Corte premium de carne asada a la parrilla, jugosa y tierna, acompañada de vegetales asados.",
    vendor: "Carnes del Norte",
    badges: ["TOP"],
    category: "Carne",
  },
  {
    id: "8",
    name: "Costillas BBQ",
    price: 165.0,
    originalPrice: 195.0,
    image: "/bbq-ribs-with-sauce.jpg",
    description: "Costillas de cerdo glaseadas con salsa BBQ casera, cocidas a fuego lento hasta la perfección.",
    vendor: "BBQ Masters",
    badges: ["-15%"],
    category: "Carne",
  },
]
