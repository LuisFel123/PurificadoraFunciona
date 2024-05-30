import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import Home from './home/home';
import Driver from './Driver/Driver';
import Rutas from './Rutas/Rutas'
import Product from './Product/Product';
function APProuter() {
  return (
    

    <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/driver" element={<Driver/>} />
        <Route path="/Rutas" element={<Rutas/>} />
        <Route path="/Product" element={<Product/>} />



      </Routes>
    </Router>
  );
}

export default APProuter;