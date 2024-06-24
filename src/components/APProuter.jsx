import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Home from './home/home';
import Driver from './Driver/Driver';
import Rutas from './Rutas/Rutas';
import Product from './Product/Product';
import CarCrud from './cars/cars';
import ProtectedRoute from './ProtectedRoute';
import Pedidos from './pedidos/Pedidos'
function APProuter() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} redirectTo="/" />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} redirectTo="/" />} />
        <Route path="/driver" element={<ProtectedRoute element={<Driver />} redirectTo="/" />} />
        <Route path="/Rutas" element={<ProtectedRoute element={<Rutas />} redirectTo="/" />} />
        <Route path="/Product" element={<ProtectedRoute element={<Product />} redirectTo="/" />} />
        <Route path="/cars" element={<ProtectedRoute element={<CarCrud />} redirectTo="/" />} />
        <Route path="/pedidos" element={<ProtectedRoute element={<Pedidos />} redirectTo="/" />} />

      </Routes>
    </Router>
  );
}

export default APProuter;
