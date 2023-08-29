import "./App.css";
import Login from "./routers/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./routers/Register";
import Master from "./routers/Master";
import User from "./routers/User";
import Admin from "./routers/Admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/master" element={<Master />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
