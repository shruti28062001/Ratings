import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import{BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
     
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/events" Component={Events}/>

        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
