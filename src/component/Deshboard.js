import React,{useEffect, useState,useContext} from "react"
// import axios from "axios";
import auth from "../utils/auth";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";



const Deshboard = () =>{
    const[zuku,setZuku] = useState("");
    const[name,setName] = useState("");
    const navigate = useNavigate();

    const{token,setToken} = useContext(AuthContext);


    useEffect(()=>{
     
            // axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                auth.get("/zuku",{
                headers:{
                    "Authorization" : `Bearer ${token!==""?token: localStorage.getItem("token")}`
                }
            })
            .then(res =>{
                setZuku(res.data.data.message);
                setName(res.data.data.user.name);
               
            })
            .catch(err =>{
                console.log(err);
            })
        
    },[token])

    function logout(){
        // axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
            auth.delete("/logout",{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(() =>{
            setZuku("")
            setName("")
            setToken("")
             // remove token from local storage
             localStorage.removeItem("token")
             alert("You are successfully Logged Out!")
             navigate("/login")

        })
        .catch( err =>{
            console.log(err);
        })
    }

    return(
        <div>
            <h1>Deshboard</h1>
            {
                name && <h3 style={{textAlign: "center"}}>{name}</h3>
            }
            {
               zuku && <h3>Mark Zuckerberg says: {zuku}</h3>
            }
            {
              name &&  <button onClick={logout}>Logout</button>
            }
        </div>
    )
}
export default Deshboard;