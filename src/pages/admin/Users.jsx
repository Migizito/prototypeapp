import { useState, useEffect } from "react";
import axios from "axios";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { Switch } from "@headlessui/react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const url = "https://beagranelapisv.azurewebsites.net/api/Auth/";
  useEffect(() => {
    const getUsers = async () => {
      try {
        const endpoint = "Usuarios"; // Replace 'Producto' with the desired endpoint
        const response = await axios.get(`${url}${endpoint}`);
        setUsers(response.data.resultado);
      } catch (error) {
        console.error("Error al obtener los pronósticos:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-3xl">Usuarios</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Usuarios</span>
          </div>
        </div>
        <Link
          to="/registrar-usuarios"
          className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors justify-self md:justify-end"
        >
          Nuevo Usuario
        </Link>
      </div>
      <div className="flex items-center mb-8 w-full">
        <div className="relative w-full">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-4" />
          <input
            type="text"
            className="bg-secondary-100 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full"
            placeholder="Buscar Usuario"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-3">
        {users.map((user) => (
          <div key={user.usuarioID} className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2">{user.username}</h2>
            <div>
              <div className="font-bold flex">
                Rol:
                <div className="mx-2 font-normal">
                  {user.roles.map((rol, index) => (
                    <p key={index}>
                      {rol.rolID === 1
                        ? "ADMIN"
                        : rol.rolID === 2
                        ? "VENDEDOR"
                        : "Otro Rol"}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
