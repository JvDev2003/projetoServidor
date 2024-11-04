import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Login from './pages/Login'
import Register from './pages/Register'
import Teste from './pages/Teste'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/cadastrar' element={<Register />}/>
        <Route path='/teste' element={<Teste/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
