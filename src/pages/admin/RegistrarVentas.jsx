import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//Icons
import { RiSearch2Line } from "react-icons/ri";

const RegistrarVentas = () => {
  //const userId = sessionStorage.getItem("userId");
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productById, setProductById] = useState([]);
  const [products, setProducts] = useState([]);
  const url = "https://beagranelapisv.azurewebsites.net/api/";
  const [formData, setFormData] = useState({
    fechaDeVenta: new Date().toISOString(),
    detallesVenta: [
      {
        productoID: 0,
        cantidadVendida: 0,
      },
    ],
  });

  const handleInputChange = (index, fieldName, value) => {
    const detallesVentaCopy = [...formData.detallesVenta];
    detallesVentaCopy[index][fieldName] =
      fieldName === "productoID" ? parseInt(value, 10) : parseFloat(value);
    setFormData({ ...formData, detallesVenta: detallesVentaCopy });
  };

  const handleAddProducto = async () => {
    const lastProduct =
      formData.detallesVenta[formData.detallesVenta.length - 1];

    // Verifica si el último producto es válido antes de agregarlo
    if (lastProduct.productoID !== 0 && lastProduct.cantidadVendida !== 0) {
      // Actualiza productos antes de agregar un nuevo objeto
      await getProductById(lastProduct.productoID);

      // Verificación de datos del producto
      const productData = products.find(
        (product) => product.productoID === lastProduct.productoID
      );
      if (productData) {
        setProductList((prevProductList) => [
          ...prevProductList,
          { ...lastProduct, nombreProducto: productData.nombreProducto },
        ]);
      }
    }

    // Actualiza detallesVenta sin modificar el objeto original
    setFormData((prevFormData) => ({
      ...prevFormData,
      detallesVenta: [
        ...prevFormData.detallesVenta,
        {
          productoID: 0,
          cantidadVendida: 0,
        },
      ],
    }));
  };

  // Use useEffect to log productList after the component renders
  useEffect(() => {}, [productList]);

  useEffect(() => {}, [productById]);

  const handleSubmit = async () => {
    try {
      console.log("Datos a enviar:", formData);
      const response = await axios.post(`${url}Venta/CrearVenta`, formData);
      Swal.fire({
        icon: "success",
        title:
          "<h5 style='color:white'>" +
          "Venta registrada exitosamente!" +
          "</h5>",
        text: "Se ha registrado exitosamente",
        color: "white",
        background: "#1E1F25",
        confirmButtonColor: "#0090EB",
      });
      console.log(response.data);
      // Manejar la respuesta según sea necesario
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      // Manejar errores aquí
    }
  };

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${url}Producto`);
        setProducts(response.data.resultado);
      } catch (error) {
        console.error("Error al obtener los pronósticos:", error);
      }
    };

    getProducts();
  }, []);

  const getProductById = async (productoId) => {
    try {
      const response = await axios.get(
        `${url}Producto/id:int?id=${productoId}`
      );
      setProductById(response.data.resultado);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return "Producto no encontrado";
    }
    console.log(productById);
  };

  return (
    <div>
      <div className="bg-secondary-100 p-8 rounded-lg grid w-full items-center">
        <h1 className="text-3xl">Ingresar venta</h1>
        <hr className="my-8 border-gray-500/30" />
        <div className="w-full">
          <div className="flex items-center mb-8 w-full">
            <div className="relative w-full">
              <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                type="text"
                className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full"
                placeholder="Buscar Producto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {formData.detallesVenta.map((detalle, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div className="w-full md:w-1/4">
                  <p>Nombre del Producto</p>
                </div>
                <div className="flex-1">
                  <select
                    className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg text-white w-full"
                    onChange={(e) =>
                      handleInputChange(
                        formData.detallesVenta.length - 1,
                        "productoID",
                        e.target.value
                      )
                    }
                  >
                    <option value={0}>Selecciona un producto</option>
                    {filteredProducts.map((product) => (
                      <option
                        key={product.productoID}
                        value={product.productoID}
                      >
                        {product.nombreProducto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                <div className="w-full md:w-1/4">
                  <p>Cantidad Vendida</p>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                    placeholder="Cantidad"
                    value={detalle.cantidadVendida}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "cantidadVendida",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <hr className="my-8 border-gray-500/30" />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              onClick={handleAddProducto}
            >
              Agregar Producto
            </button>
          </div>
          <hr className="my-8 border-gray-500/30" />
          <div>
            <h2>Productos Agregados:</h2>
            <ul>
              {productList.map((product, index) => (
                <li key={index}>
                  Producto: {productById.nombreProducto}, Cantidad:{" "}
                  {product.cantidadVendida}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrarVentas;
