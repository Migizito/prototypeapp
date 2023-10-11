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
import Chat from "./pages/admin/Chat";
import Tickets from "./pages/admin/Tickets";
import Profile from "./pages/admin/Profile";
import Dashboard from "./pages/admin/Dashboard";

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
          <Route path="chat" element={<Chat />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
