import { useState } from "react";
import { Link } from "react-router-dom";
//Icons
import {
  RiMailFill,
  RiLockFill,
  RiEyeFill,
  RiEyeOffFill,
} from "react-icons/ri";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Iniciar Sesión
      </h1>

      <form className="mb-8">
        <button className="flex items-center justify-center py-3 px-4 gap-4 bg-secondary-900 w-full rounded-full mb-8 text-gray-200">
          <img
            src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
            className="w-4 h-4"
          />
          Ingresa con Google
        </button>
        <div className="relative mb-4">
          <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="email"
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-gray-600"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="relative mb-8">
          <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type={showPassword ? "text" : "password"}
            className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-gray-600"
            placeholder="Contraseña"
          />
          {showPassword ? (
            <RiEyeOffFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 hover:cursor-pointer"
            />
          ) : (
            <RiEyeFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 hover:cursor-pointer"
            />
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary/70 uppercase text-gray-800 font-bold text-sm w-full py-3 px-4 rounded-lg hover:text-gray-200 transition-colors"
          >
            <Link to="/">Ingresar</Link>
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-4">
        <Link
          to="/auth/olvidar-contraseña"
          className="hover:text-primary transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <span className="flex items-center gap-2">
          ¿No tienes cuenta?
          <Link
            to="/auth/registro"
            className="text-primary hover:text-gray-100 transition-colors"
          >
            Registrate
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
