import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { RiArrowRightLine } from "react-icons/ri";
import { Tab } from "@headlessui/react";

const Dashboard = () => {
  // Cambia a producto seleccionado
  const [topProducts, setTopProducts] = useState([]);
  const [salesByMonthYear, setSalesByMonthYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [topNextMonthForecast, setTopNextMonthForecast] = useState([]);
  const [productsPronosticos, setProductsPronosticos] = useState([]);

  const getSalesByMonthYear = async (selectedMonth, selectedYear) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/ventas-por-fecha/?month=${selectedMonth}&year=${selectedYear}`
      );
      setSalesByMonthYear(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas por mes y año:", error);
    }
  };

  const [chartTopData, setChartTopData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      fill: {
        colors: ["#3F93A2"],
      },
    },
    series: [
      {
        name: "Gráfica de Productos Más Vendidos",
        data: [],
      },
    ],
  });

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
    },
    series: [
      {
        name: "Gráfica de Productos Pronosticados",
        data: [],
      },
    ],
  });

  const getTopNextMonthForecast = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/obtener-pronostico-bd/"
      );
      const pronosticosEnteros = response.data.map((producto) => ({
        ...producto,
        CantidadPronosticada: Math.round(producto.CantidadPronosticada),
      }));

      setProductsPronosticos(pronosticosEnteros);
    } catch (error) {
      console.error("Error al obtener los pronósticos:", error);
    }
  };

  const getTopPronostico = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/obtener-top-pronostico-bd/"
      );
      setTopNextMonthForecast(response.data);
      const labels = topNextMonthForecast.map((item) => item.NombreProducto);
      const data = topNextMonthForecast.map((item) =>
        parseFloat(item.CantidadPronosticada).toFixed(2)
      );

      // Actualizar chartData con los datos recuperados
      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: labels,
          },
        },
        series: [
          {
            ...prevChartData.series[0],
            data: data,
          },
        ],
      }));
    } catch (error) {
      console.error(
        "Error al obtener el top 10 de pronósticos para el próximo mes:",
        error
      );
    }
  };

  const getTopProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/top-productos-bd/"
      );
      setTopProducts(response.data);
      console.log(topProducts);
      // Crear etiquetas y datos para el gráfico de barras
      const labels = topProducts.map((item) => item.NombreProducto);
      const data = topProducts.map((item) =>
        parseFloat(item.CantidadVendida).toFixed(2)
      );
      setChartTopData((prevChartTopData) => ({
        ...prevChartTopData,
        options: {
          ...prevChartTopData.options,
          xaxis: {
            categories: labels,
          },
        },
        series: [
          {
            ...prevChartTopData.series[0],
            data: data,
          },
        ],
      }));
    } catch (error) {
      console.error("Error al obtener el top 10 de productos:", error);
    }
  };

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Dashboard</span>
          </div>
        </div>
      </div>
      {/* Portada */}
      <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 items-center mb-6">
        <div className="p-8">
          <h1 className="text-3xl mb-8">
            Mira las estadisticas de tus Ventas!
          </h1>
        </div>
        {/* Image */}
        <div className="flex justify-center">
          <img src="portada.svg" className="w-45 h-45 object-cover" />
        </div>
      </div>
      <Tab.Group>
        <div className="bg-secondary-100 p-8 rounded-t-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-xl md:text-2xl">Ventas por fecha</h1>
            <Link to="/" className="flex items-center gap-2 text-primary">
              <RiArrowRightLine />
            </Link>
          </div>
          <div>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <label>
                <h2 className="text-xl px-1 mb-3">Seleccionar mes</h2>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-lg p-2 text-secondary-100/60"
                >
                  <option value="">Selecciona un Mes</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                  {/* Agrega las opciones para los otros meses */}
                </select>
              </label>
              <label>
                <div>
                  <h2 className="text-xl px-1 mb-3">Ingresa un año</h2>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="rounded-lg p-2 text-secondary-100"
                    placeholder="Ingresar Año"
                  />
                </div>
              </label>
              <button
                type="submit"
                onClick={() => getSalesByMonthYear(selectedMonth, selectedYear)}
                className="bg-secondary-900 rounded-lg p-3 ml-8 text-white hover:bg-secondary-900/50 hover:text-gray-200 transition-colors mb-3"
              >
                Obtener Ventas
              </button>
            </form>
            {salesByMonthYear && (
              <div className="mx-5 px-5">
                <h3 className="text-xl font-bold mb-3">
                  Resultados para {salesByMonthYear.Month}/
                  {salesByMonthYear.Year}
                </h3>
                <p>
                  <b>Total de ventas: {salesByMonthYear.TotalSales}</b>
                </p>
                <ul style={{ listStyleType: "none" }}>
                  {salesByMonthYear.ProductSales.map((product) => (
                    <li key={product.ProductoID}>
                      <b>{product.NombreProducto}:</b>{" "}
                      {Math.round(product.CantidadVendida)} unidades
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="bg-secondary-100 p-8 mb-6 rounded-b-lg">
          <Tab.List className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-2 gap-y-6 bg-secondary-900 py-3 px-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-100 ui-selected:text-gray-100">
                Modelo ARIMA
              </Tab>
            </div>
            <div className="flex justify-center">
              <div className="bg-primary/50 text-gray-200 hover:bg-primary/80 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                Modelos
              </div>
            </div>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-secondary-100 p-8 rounded-lg">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-white text-xl md:text-2xl">
                    Pronostico de todos los productos ARIMA
                  </h1>
                </div>

                <div>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => getTopNextMonthForecast()}
                      className="bg-secondary-900 rounded-lg p-3 ml-8 text-white hover:bg-secondary-900/50 hover:text-gray-200 transition-colors"
                    >
                      Obtener pronóstico de todos los productos
                    </button>
                  </div>
                  <div className="mx-5 px-5">
                    <h3 className="text-xl font-bold mb-3">
                      Resultados para el siguiente mes
                    </h3>
                    <ul className="mx-1" style={{ listStyleType: "none" }}>
                      {productsPronosticos.map((pronostico, index) => (
                        <li className="flex justify-between" key={index}>
                          <div>
                            <b>Producto: </b> {pronostico.NombreProducto}
                          </div>
                          <div>
                            <b>Pronóstico: </b>
                            {pronostico.CantidadPronosticada} unidades
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary-100 p-8 rounded-lg mb-6">
              <div className="p-8">
                <h1 className="text-3xl mb-8">
                  Historial de productos más vendidos
                </h1>
                <button
                  type="button"
                  onClick={() => getTopProducts()}
                  className="bg-third text-white rounded-lg py-3 px-6"
                >
                  Obtener historial de productos más vendidos
                </button>
              </div>
              <Chart
                options={chartTopData.options}
                series={chartTopData.series}
                type="bar"
                className="w-full"
                height={500}
              />
            </div>
            <div className="bg-secondary-100 p-8 rounded-lg">
              <div className="p-8">
                <h1 className="text-3xl mb-8">
                  Pronóstico de productos más vendidos
                </h1>
                <button
                  type="button"
                  onClick={() => getTopPronostico()}
                  className="bg-primary text-white rounded-lg py-3 px-6"
                >
                  Obtener pronóstico de productos más vendidos
                </button>
              </div>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                className="w-full"
                height={500}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Dashboard;
