import axios from "axios";

const auth= axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api/auth",
    // headers:{}
    // params:{}
})

export default auth

