import { useState, useEffect } from "react";
import axios from "axios";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import bluebird from "bluebird";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [productosCache, setProductosCache] = useState({});
  const url = "https://beagranelapisv.azurewebsites.net/api/";

  useEffect(() => {
    const getVentas = async () => {
      try {
        const endpoint = "Venta";
        const response = await axios.get(`${url}${endpoint}`);
        const ventasConNombresProductos = await Promise.all(
          response.data.resultado.map(async (venta) => {
            const detalleVentasConNombres = await bluebird.map(
              venta.detalleVentas,
              async (detalle) => {
                // Verificar la caché antes de realizar una nueva solicitud
                if (productosCache[detalle.productoID]) {
                  return {
                    ...detalle,
                    nombreProducto:
                      productosCache[detalle.productoID].nombreProducto,
                  };
                } else {
                  const producto = await obtenerProductoPorId(
                    detalle.productoID
                  );
                  // Actualizar la caché
                  setProductosCache((prevCache) => ({
                    ...prevCache,
                    [detalle.productoID]: producto,
                  }));
                  return {
                    ...detalle,
                    nombreProducto: producto.nombreProducto,
                  };
                }
              },
              { concurrency: 5 } // Limita el número de solicitudes simultáneas
            );
            return {
              ...venta,
              detalleVentas: detalleVentasConNombres,
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
        `https://beagranelapisv.azurewebsites.net/api/Producto/id:int?id=${productId}`
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
        <Link
          to="/registrar-ventas"
          className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors justify-self md:justify-end"
        >
          Nueva Venta
        </Link>
      </div>
      <div className="flex items-center mb-8 w-full">
        <div className="relative w-full">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-4" />
          <input
            type="text"
            className="bg-secondary-100 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full"
            placeholder="Buscar Venta"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-3">
        {ventas.map((sale) => (
          <div key={sale.ventaId} className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2">Venta ID: {sale.ventaId}</h2>
            <p>
              <span className="font-bold">Fecha de Venta:</span>{" "}
              {sale.fechaDeVenta}
            </p>
            <p>
              <span className="font-bold">Monto:</span> {sale.monto}
            </p>
            <h3 className="text-md font-bold mt-2">Detalle de Ventas:</h3>
            <ul>
              {sale.detalleVentas.map((detalle) => (
                <li key={detalle.detalleID}>
                  Producto: {detalle.nombreProducto}, Cantidad Vendida:{" "}
                  {detalle.cantidadVendida}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ventas;
