// src/routes.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Home from './components/home/home';

function Routes() {
  return (
    

    <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default Routes;
