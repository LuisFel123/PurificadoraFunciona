import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import Home from './home/home';

function APProuter() {
  return (
    

    <Router>
      <Routes>
        <Route  path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default APProuter;