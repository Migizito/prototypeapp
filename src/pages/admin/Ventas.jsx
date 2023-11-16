import { useState, useEffect } from "react";
import axios from "axios";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { Switch } from "@headlessui/react";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const getVentas = async () => {
      try {
        const response = await axios.get(`https://localhost:7138/api/Venta`);
        const ventasConNombresProductos = await Promise.all(
          response.data.resultado.map(async (venta) => {
            const vendedor = await obtenerUsuarioPorId(venta.vendedorId);
            const detalleVentasConNombres = await Promise.all(
              venta.detalleVentas.map(async (detalle) => {
                const producto = await obtenerProductoPorId(detalle.productID);
                return { ...detalle, nombreProducto: producto.nombreProducto };
              })
            );

            return {
              ...venta,
              detalleVentas: detalleVentasConNombres,
              nombreUsuario: vendedor.username,
            };
          })
        );

        setVentas(ventasConNombresProductos);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    getVentas();
  }, []);

  const obtenerProductoPorId = async (productId) => {
    try {
      const response = await axios.get(
        `https://localhost:7138/api/Product/id:int?id=${productId}`
      );
      return response.data.resultado;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const obtenerUsuarioPorId = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7138/api/Auth/id:int?id=${userId}`
      );
      return response.data.resultado;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-3xl">Ventas</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Ventas</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-3">
        {ventas.map((sale) => (
          <div key={sale.saleId} className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2">Venta ID: {sale.saleId}</h2>
            <p>
              <span className="font-bold">Fecha de Venta:</span>{" "}
              {sale.fechaDeVenta}
            </p>
            <p>
              <span className="font-bold">Monto:</span> {sale.monto}
            </p>
            <p>
              <span className="font-bold">Vendedor:</span> {sale.nombreUsuario}
            </p>
            <h3 className="text-md font-bold mt-2">Detalle de Ventas:</h3>
            <ul>
              {sale.detalleVentas.map((detalle) => (
                <li key={detalle.detailID}>
                  Producto ID: {detalle.nombreProducto}, Cantidad Vendida:{" "}
                  {detalle.cantidadVendida}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Portada */}
      <div className="bg-secondary-100 p-8 rounded-lg grid w-full items-center">
        <h1 className="text-3xl">Ingresar venta</h1>
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
                Productos <span className="text-red-500">*</span>
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
                CantidadVendida <span className="text-red-500">*</span>
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
                MontoAPagar <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Monto"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Fecha <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Fecha"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Vendedor <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Vendedor"
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

export default Ventas;
