import React,{useState , useEffect,useContext} from "react";
//  
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";





const Login = () => {
   
    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const {setToken} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const {email,password} = user;

    useEffect(()=>{
        if(localStorage.getItem("token") != null){
            navigate("/deshboard")
        }
    })

    async function implementSignup(e){
        e.preventDefault();

        if(!email || !password){
            setError("Please fill all the fields");
            setSuccess("")
            return
        }

        // api call
        try{
            //  const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login",
            const response =  await auth.post("/login",
             {email:email, password:password})
            //  console.log(response.data) 
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                setError("")
                //save token to local storage:
                localStorage.setItem("token",response.data.data.token)

                alert("You are Successfully logged In!")
                navigate("/deshboard")
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

            <h1>Login</h1>

            {
                error && <h3>{error}</h3>
            }
            {
                success && <h3>{success}</h3>
            }

            <form className="form-class" onSubmit={implementSignup}>
                
               
                <input type="email" placeholder="Enter ur Email" 
                onChange={(e)=>setUser({...user,email:e.target.value})}
                />
                <input type="password" placeholder="Enter ur Password" 
                onChange={(e)=>setUser({...user,password:e.target.value})}
                />
               
                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login;
