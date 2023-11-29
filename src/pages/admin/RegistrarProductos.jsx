import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const RegistrarProductos = () => {
  const [producto, setProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    cantidadEnInventario: 0,
    precio: 0,
  });
  const url = "https://beagranelapisv.azurewebsites.net/api/";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({ ...prevProducto, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = "CrearProducto"; // Replace 'Producto' with the desired endpoint
      const response = await axios.post(`${url}${endpoint}`, producto);

      if (response.status === 201) {
        console.log("Producto creado:", response.data);
        Swal.fire({
          icon: "success",
          title:
            "<h5 style='color:white'>" +
            "Producto registrado exitosamente!" +
            "</h5>",
          text: "Se ha registrado exitosamente",
          color: "white",
          background: "#1E1F25",
          confirmButtonColor: "#0090EB",
        });
      } else {
        console.error("Error al crear el producto");
        // Puedes manejar errores aquí
      }
    } catch (error) {
      console.error("Error de red:", error);
      // Puedes manejar errores de red aquí
    }
  };

  return (
    <div>
      <div className="bg-secondary-100 p-8 rounded-lg grid w-full items-center">
        <h1 className="text-3xl">Ingresar Producto</h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="w-full" onSubmit={handleSubmit}>
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
                  name="nombreProducto"
                  value={producto.nombreProducto}
                  onChange={handleChange}
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
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
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
                name="cantidadEnInventario"
                value={producto.cantidadEnInventario}
                onChange={handleChange}
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
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Subtotal"
              />
            </div>
          </div>
          <hr className="my-8 border-gray-500/30" />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
