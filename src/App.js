import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Todo from "./page/Todo";
import './App.css';

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
