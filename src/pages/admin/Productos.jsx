import { useState, useEffect } from "react";
import axios from "axios";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { Switch } from "@headlessui/react";

const Productos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`https://localhost:7138/api/Product`);
        setProducts(response.data.resultado);
      } catch (error) {
        console.error("Error al obtener los pronósticos:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-3xl">Productos</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Productos</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-3">
        {products.map((product) => (
          <div
            key={product.productID}
            className="border p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">{product.nombreProducto}</h2>
            <p>
              <span className="font-bold">ID:</span> {product.productID}
            </p>
            <p>
              <span className="font-bold">Precio:</span> ${product.precio}
            </p>
            <p>
              <span className="font-bold">Descripción:</span>{" "}
              {product.descripcion}
            </p>
            <p>
              <span className="font-bold">Cantidad en inventario:</span>{" "}
              {product.cantidadEnInventario}
            </p>
          </div>
        ))}
      </div>
      {/* Portada */}
      <div className="bg-secondary-100 p-8 rounded-lg grid w-full items-center">
        <h1 className="text-3xl">Ingresar Producto</h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="w-full">
          <div className="flex items-center mb-8 w-full">
            <div className="relative w-full">
              <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full"
                placeholder="Buscar Producto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Producto <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Nombre del producto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Descripción <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Descripción del producto"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Cantidad en Inventario <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Cantidad"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Precio <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Subtotal"
              />
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productos;
