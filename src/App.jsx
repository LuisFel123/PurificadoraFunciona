import './App.css'
import Login from './components/Login/Login'
import { UserProvider } from './UserContext';
import Nave from './components/Navegador/Nave'
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  return (
    <>
        <Nave/>
        <UserProvider>
        <Login/>
        </UserProvider>
    </>
  )
}

export default App
