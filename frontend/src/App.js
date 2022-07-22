import React from 'react';
import Toast from './components/Toast';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from './pages/Login'
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/new-ticket' element={<PrivateRoute/>}>
          <Route path='/new-ticket' element={<NewTicket/>}/>
        </Route>
      </Routes>
      </div>
    </Router>
    <Toast/>
    </>
      
  );
}

export default App;
