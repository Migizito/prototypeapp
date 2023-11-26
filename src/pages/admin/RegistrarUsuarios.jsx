import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const RegistrarUsuarios = () => {
  const [formData, setFormData] = useState({
    username: "",
    contraseña: "",
    rol: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7175/api/Auth/Register",
        formData
      );
      if (response.status === 200) {
        console.log("Registro exitoso:", response.data);
        Swal.fire({
          icon: "success",
          title:
            "<h5 style='color:white'>" +
            "Usuario registrado exitosamente!" +
            "</h5>",
          text: "Se ha registrado exitosamente",
          color: "white",
          background: "#1E1F25",
          confirmButtonColor: "#0090EB",
        });
      } else {
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="bg-secondary-100 p-8 rounded-lg grid w-full items-center">
        <h1 className="text-3xl">Ingresar Usuario</h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Nombre de Usuario <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Nombre de usuario"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Contraseña <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input
                type="password"
                name="contraseña"
                value={formData.constraseña}
                onChange={handleChange}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Rol <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <select
                name="rol"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                value={formData.rol !== 0 ? formData.rol : ""}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Selecciona un Rol
                </option>
                <option value="1">Admin</option>
                <option value="2">Vendedor</option>
              </select>
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
