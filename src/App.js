import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login' ;
import Dashboard from './components/Dashboard';
import Forgetpassword from './components/forgetpassword';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/Register' element={<Register/>}/>
      <Route exact path='/reset-password' element={<Forgetpassword/>}/>
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
