import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';

//hooks
import { useAuth } from './hooks/useAuth';
import useSession from './hooks/useSession';


//pages
import Login from './pages/Login'
import Register from './pages/Register'
import Teste from './pages/Teste'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Logout from './pages/Logout'
import EditUser from './pages/EditUser';
import Perfil from './pages/Perfil';

//components
import Menu from './components/Menu'
import MenuAdmin from './components/MenuAdmin';
import MenuUser from './components/MenuUser';
import Usuarios from './pages/Usuarios';

function App() {

  const {admin, isAuthenticated} = useAuth()
  const { verifySession } = useSession(); 
  useEffect(() => {
     verifySession(); 
  }, []);

  return (
      <BrowserRouter>
      {!isAuthenticated ? <Menu/>: admin? <MenuAdmin/>: <MenuUser/>}
        <Routes>
          <Route path='/' element={!isAuthenticated ? <Home/>: admin? <Dashboard/>: <Teste/>}/>
          <Route path='/usuarios' element={!isAuthenticated ? <Home/>: admin? <Usuarios/>: <Home/>}/>
          <Route path='/editUser/:email' element={!isAuthenticated ? <Home/>: <EditUser/>}/>
          <Route path='/perfil/:email' element={!isAuthenticated ? <Home/>: <Perfil/>}/>
          <Route path='/cadastrar' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
