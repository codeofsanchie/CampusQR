import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login' ;

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/Register' element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
