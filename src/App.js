import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import Signup from "./Signup";
import './App.css';
import Todo from "./todo";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='' element ={<Dashboard/>}/>
            <Route path='signin' element ={<Signin/>}/>
            <Route path='signup' element ={<Signup/>}/>     
            <Route path='todo' element ={<Todo/>}/>                      
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
