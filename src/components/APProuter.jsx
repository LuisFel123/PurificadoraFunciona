import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import Home from './home/home';
import Driver from './Driver/Driver';

function APProuter() {
  return (
    

    <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/driver" element={<Driver/>} />


      </Routes>
    </Router>
  );
}

export default APProuter;