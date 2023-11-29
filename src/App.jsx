import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutAuth from "./layouts/LayoutAuth";
//Pages auth
import Login from "./pages/auth/Login";
import Error404 from "./pages/Error404";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
//Pages admin
import Home from "./pages/admin/Home";
import Ventas from "./pages/admin/Ventas";
import Tickets from "./pages/admin/Tickets";
import Profile from "./pages/admin/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Productos from "./pages/admin/Productos";
import Users from "./pages/admin/Users";
import RegistrarVentas from "./pages/admin/RegistrarVentas";
import { RegistrarProductos } from "./pages/admin/RegistrarProductos";
import { RegistrarUsuarios } from "./pages/admin/RegistrarUsuarios";
import Pronostico from "./pages/admin/Pronostico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="olvidar-contraseña" element={<ForgetPassword />} />
        </Route>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="registrar-ventas" element={<RegistrarVentas />} />
          <Route path="registrar-usuarios" element={<RegistrarUsuarios />} />
          <Route path="registrar-productos" element={<RegistrarProductos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="users" element={<Users />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pronostico" element={<Pronostico />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
