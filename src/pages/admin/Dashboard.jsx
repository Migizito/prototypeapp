import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  //   RiFilter2Fill,
  RiSearch2Line,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiTicketLine,
  RiArrowLeftSLine,
  RiFileTextLine,
  RiDiscussLine,
  RiTwitterLine,
  RiGithubLine,
} from "react-icons/ri";
import { Tab, Disclosure, Transition } from "@headlessui/react";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [pronosticos, setPronosticos] = useState([]);
  const [productoInput, setProductoInput] = useState(""); // Cambia a producto seleccionado
  const [productos, setProductos] = useState([]);
  const [productsPronosticos, setProductsPronosticos] = useState([]);
  //   const [topProducts, setTopProducts] = useState([]);
  //   const [forecastTopProducts, setForecastTopProducts] = useState([]);
  const [salesByMonthYear, setSalesByMonthYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  //   const [topNextMonthForecast, setTopNextMonthForecast] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("No se ha seleccionado un archivo CSV.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Cargar el archivo CSV a través de la API
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData
      );
      console.log("hola");
      if (
        response.data &&
        response.data.status === "Data uploaded successfully"
      ) {
        console.log("Archivo CSV cargado exitosamente.");
        setProductos(response.data.productos);
        Swal.fire({
          icon: "success",
          title: "Archivo CSV cargado exitosamente!",
          text: "Archivo Subido Correctamente",
        });
      }
    } catch (error) {
      console.error("Error al cargar el archivo CSV:", error);
      Swal.fire({
        icon: "error",
        title: "Error al cargar el archivo CSV",
        text: "Ocurrió un error al cargar el archivo. Por favor, inténtalo de nuevo más tarde o contacta al soporte técnico.",
      });
    }
  };

  const getForecast = async (producto) => {
    try {
      // Obtener los pronósticos a través de la API
      const response = await axios.get(
        `http://localhost:8000/forecast/?producto=${producto}`
      );

      setPronosticos(response.data);
    } catch (error) {
      console.error("Error al obtener los pronósticos:", error);
    }
  };

  const getForecastAllProducts = async () => {
    try {
      // Obtener los pronósticos a través de la API
      const response = await axios.get(
        `http://localhost:8000/forecast/all_products`
      );

      setProductsPronosticos(response.data);
    } catch (error) {
      console.error("Error al obtener los pronósticos:", error);
    }
  };

  const getSalesByMonthYear = async (selectedMonth, selectedYear) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/sales-by-month-year/?month=${selectedMonth}&year=${selectedYear}`
      );
      setSalesByMonthYear(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas por mes y año:", error);
    }
  };
  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">
            Dashboard y Pronóstico de Ventas
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Dashboard</span>
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <button className="bg-secondary-100/50 hover:bg-secondary-100 flex items-center gap-2 py-2 px-4 rounded-lg hover:text-primary transition-colors">
            <RiFilter2Fill /> Filter
          </button>
          <button className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
            Subir A
          </button>
        </div> */}
      </div>
      {/* Portada */}
      <div className="bg-secondary-100 p-8 rounded-tl-lg rounded-tr-lg grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="p-8">
          <h1 className="text-3xl mb-8">Archivo a analizar</h1>
          <form>
            <div className="relative">
              <input
                type="file"
                className="file:bg-primary file:text-white file:m-4 file:border-none file:rounded-lg file:cursor-pointer file:py-3 file:px-4 bg-secondary-900 py-4 pr-5 pl-10 rounded-lg w-full mb-8"
                accept=".csv"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={uploadFile}
                className="bg-primary text-white rounded-lg py-3 px-6"
              >
                Cargar Archivo
              </button>
            </div>
          </form>
        </div>
        {/* Image */}
        <div className="flex justify-center">
          <img src="portada.svg" className="w-45 h-45 object-cover" />
        </div>
      </div>
      <Tab.Group>
        <div className="bg-secondary-100 p-8 rounded-bl-lg rounded-br-lg">
          <Tab.List className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-2 gap-y-6 bg-secondary-900/50 py-3 px-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                Overview
              </Tab>
              <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                Por Producto
              </Tab>
              <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                FAQ
              </Tab>
            </div>
            <div className="flex justify-center">
              <button className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                Create
              </button>
            </div>
          </Tab.List>
        </div>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary-100 p-8 rounded-lg">
                {/* Title card */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-white text-xl md:text-2xl">
                    Pronostico de todos los productos
                  </h1>
                  <Link to="/" className="flex items-center gap-2 text-primary">
                    Support <RiArrowRightLine />
                  </Link>
                </div>
                {/* Content card */}
                <div>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => getForecastAllProducts()}
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
                        <li key={index}>
                          <b>Producto: </b> {pronostico.Producto},{" "}
                          <b>Pronóstico: </b>
                          {pronostico.Pronostico} unidades
                        </li>
                      ))}
                    </ul>
                    <ul className="mx-5" style={{ listStyleType: "none" }}>
                      {pronosticos.map((pronostico, index) => (
                        <li key={index}>
                          <b>Producto:</b>
                          {pronostico.Producto},<b> Pronóstico: </b>
                          {pronostico.Pronostico} unidades
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-100 p-8 rounded-lg">
                {/* Title card */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-white text-xl md:text-2xl">
                    Ventas por fecha
                  </h1>
                  <Link to="/" className="flex items-center gap-2 text-primary">
                    All FAQ <RiArrowRightLine />
                  </Link>
                </div>
                {/* Content card */}
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
                      onClick={() =>
                        getSalesByMonthYear(selectedMonth, selectedYear)
                      }
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
                          <li key={product.Producto}>
                            <b>{product.Producto}:</b> {product.Cantidad}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Section 1 */}
              <div className="md:col-span-3">
                <form>
                  <div className="relative">
                    <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-4" />
                    <input
                      type="text"
                      className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full"
                      placeholder="Search for anything"
                    />
                  </div>
                </form>
                <h1 className="text-white text-2xl my-8">Public tickets</h1>
                {/* Tickets */}
                <div>
                  {/* Ticket */}
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <RiTicketLine className="md:text-2xl text-yellow-500" />
                      <Link
                        to="/"
                        className="md:text-xl hover:text-blue-500 transition-colors"
                      >
                        How to use Netronic with Django Framework?
                      </Link>
                      <span className="hidden md:block bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                        React
                      </span>
                    </div>
                    <div className="md:px-10">
                      <p className="text-gray-500">
                        By Keenthemes to save tons and more to time money
                        projects are listed amazing outstanding projects are
                        listed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <RiTicketLine className="md:text-2xl text-blue-500" />
                      <Link
                        to="/"
                        className="md:text-xl hover:text-blue-500 transition-colors"
                      >
                        How to use Netronic with Django Framework?
                      </Link>
                      <span className="hidden md:block bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                        React
                      </span>
                    </div>
                    <div className="md:px-10">
                      <p className="text-gray-500">
                        By Keenthemes to save tons and more to time money
                        projects are listed amazing outstanding projects are
                        listed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <RiTicketLine className="md:text-2xl text-green-500" />
                      <Link
                        to="/"
                        className="md:text-xl hover:text-blue-500 transition-colors"
                      >
                        How to use Netronic with Django Framework?
                      </Link>
                      <span className="hidden md:block bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                        React
                      </span>
                    </div>
                    <div className="md:px-10">
                      <p className="text-gray-500">
                        By Keenthemes to save tons and more to time money
                        projects are listed amazing outstanding projects are
                        listed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <RiTicketLine className="md:text-2xl text-yellow-500" />
                      <Link
                        to="/"
                        className="md:text-xl hover:text-blue-500 transition-colors"
                      >
                        How to use Netronic with Django Framework?
                      </Link>
                      <span className="hidden md:block bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                        React
                      </span>
                    </div>
                    <div className="md:px-10">
                      <p className="text-gray-500">
                        By Keenthemes to save tons and more to time money
                        projects are listed amazing outstanding projects are
                        listed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <RiTicketLine className="md:text-2xl text-yellow-500" />
                      <Link
                        to="/"
                        className="md:text-xl hover:text-blue-500 transition-colors"
                      >
                        How to use Netronic with Django Framework?
                      </Link>
                      <span className="hidden md:block bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                        React
                      </span>
                    </div>
                    <div className="md:px-10">
                      <p className="text-gray-500">
                        By Keenthemes to save tons and more to time money
                        projects are listed amazing outstanding projects are
                        listed
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pagination */}
                <div className="p-8 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                      <RiArrowLeftSLine />
                    </button>
                    <div className="flex items-center">
                      <button className="py-2 px-4 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                        1
                      </button>
                      <button className="py-2 px-4 bg-secondary-900 rounded-lg transition-colors text-gray-100">
                        2
                      </button>
                      <button className="py-2 px-4 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                        3
                      </button>
                      <button className="py-2 px-4 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                        4
                      </button>
                      <button className="py-2 px-4 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                        5
                      </button>
                    </div>
                    <button className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                      <RiArrowRightSLine />
                    </button>
                  </nav>
                </div>
              </div>
              {/* Section 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
                <div className="bg-secondary-900 p-8 rounded-lg xl:mb-8">
                  <h1 className="text-2xl text-white mb-8">More channels</h1>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <RiFileTextLine className="text-4xl text-primary" />
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white">Project Briefing</h5>
                        <p className="text-xs">
                          Check out our{" "}
                          <Link to="/" className="text-primary">
                            Support Policy
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <RiDiscussLine className="text-4xl text-primary" />
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white">More to discuss?</h5>
                        <p className="text-xs">
                          Check out our{" "}
                          <Link to="/" className="text-primary">
                            jorge@gmail.com
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <RiTwitterLine className="text-4xl text-primary" />
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white">Latest News</h5>
                        <p className="text-xs">
                          Follow us at{" "}
                          <Link to="/" className="text-primary">
                            KeenThemes Twitter
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <RiGithubLine className="text-4xl text-primary" />
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white">Github Access</h5>
                        <p className="text-xs">
                          Our github repo{" "}
                          <Link to="/" className="text-primary">
                            KeenThemes Github
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary-900 p-8 rounded-lg">
                  <h1 className="text-2xl text-white mb-8">Documentation</h1>
                  <ul className="flex flex-col gap-y-4">
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <RiArrowRightSLine /> Angular Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <RiArrowRightSLine /> React Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <RiArrowRightSLine /> Vue Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <RiArrowRightSLine /> Nich Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <RiArrowRightSLine /> Dashboard Admin
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-secondary-100 p-8 rounded-lg">
              <div className="mb-10">
                <h1 className="text-2xl text-white mb-2">How does it work?</h1>
                <p className="text-gray-500">
                  First, a disclaimer – the entire process of writing a blog
                  post often takes more than a couple of hours, even if you can
                  type eighty words as per minute and your writing skills are
                  sharp.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 1 */}
                <div>
                  <h1 className="text-xl text-white mb-8">Buying Product</h1>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                </div>
                {/* Section 2 */}
                <div>
                  <h1 className="text-xl text-white mb-8">Installation</h1>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                  <div className="border-b border-dashed border-gray-600 p-2">
                    <Disclosure>
                      <Disclosure.Button className="py-2 text-lg flex items-center gap-4">
                        <RiArrowRightSLine className="text-xl ui-open:rotate-90 ui-open:text-primary ui-open:transform transition-all" />{" "}
                        What admin theme does?{" "}
                        <span className="bg-secondary-900 text-white text-sm py.0.5 px-2 rounded-lg">
                          React
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="text-gray-500 text-sm px-8 py-2">
                          By Keenthemes to save tons and more to time money
                          projects are listed and outstanding{" "}
                          <Link to="/" className="text-primary">
                            Learn more
                          </Link>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Dashboard;
