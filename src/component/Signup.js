import React,{useState,useEffect,useContext} from "react"
// import axios from "axios";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = () =>{

    const [user,setUser] = useState({name:"",email:"",password:"",cpassword:""});
    const[error,setError]  = useState("");
    const[success,setSuccess] = useState("");
    // const[token,setToken] = useState("")
    const {setToken} = useContext(AuthContext);

    const Navigate = useNavigate();

    useEffect(() =>{
        if(localStorage.getItem("token") !=null){
            Navigate("/deshboard")
        }
    })
    


    const {name,email,password,cpassword} = user;

    async function implementSignup(e){
        e.preventDefault();

        if(!name || !email || !password || !cpassword){
            setError("Please fill all the fields");
            setSuccess("")
            return
        }
        if(password !== cpassword){
            setError("Password and Confirm Password should be same");
            setSuccess("")
            return
        }


          // api call
          try{
            //  const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
             const response = await auth.post("/signup",
            // const response =  await auth.post("/signup",
             {name:name, email:email, password:password})
            //  console.log(response.data) 
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                setError("")
                //save token to local storage: 
                localStorage.setItem("token",response.data.data.token)
                // goto the deshboard
                alert("You are Successfully Signup")
                Navigate("/deshboard")


        }
        catch(err){
            console.log(err)
            console.log(err.response)
            console.log(err.response.data)
            console.log(err.response.data.message)
            setError(err.response.data.message)
            setSuccess("")


        }
    }


    return(
        <div>
            <h1>SignUp</h1>

        {
            error && <h3>{error}</h3>
        }
        {
            success && <h3>{success}</h3>
        }

        <form className="form-class" onSubmit={implementSignup}>
            <input type="text" placeholder="Enter ur Name" 
            onChange={(e)=>setUser({...user,name:e.target.value})} />
           
            <input type="email" placeholder="Enter ur Email" 
            onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            <input type="password" placeholder="Enter ur Password" 
            onChange={(e)=>setUser({...user,password:e.target.value})}
            />
            <input type="password" placeholder="Confirm ur Password" 
            onChange={(e)=>setUser({...user,cpassword:e.target.value})}
            />

            <button type="submit">Sign Up</button>

        </form>
    </div>
    )
}

export default Signup