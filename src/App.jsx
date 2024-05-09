import './App.css'
import Login from './components/Login/Login'
import { UserProvider } from './UserContext';
import Nave from './components/Navegador/Nave'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import APProuter from './components/APProuter';


function App() {

  return (
    <>
     <UserProvider>
     <APProuter/>
    </UserProvider>
    </>
  )
}

export default App
