import React from "react"
import Signup from "./component/Signup";
import Deshboard from "./component/Deshboard";
import Login from "./component/Login";

import { Routes,Route } from "react-router-dom";



const App = () =>{
  // const[token,setToken] = useState("");

  return (
    <div>
      <Routes>
      
      {/* <Signup setToken={setToken} /> */}
      <Route path="/" element ={<Signup />} />
      {/* <Login   setToken={setToken}/> */}
      <Route path="/Login" element = {<Login />}/>
     
      {/* <Deshboard token={token} setToken={setToken}/> */}
      <Route path="/Deshboard" element={<Deshboard />}/> 
      </Routes>
      


    </div>


  )
}

export default App;
