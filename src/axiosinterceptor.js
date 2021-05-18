import axios from "axios"
const instance = axios.create({

})
instance.defaults.headers.common["Authorization_instance"]="Auth Token Instance"
//Here you can write interceptors also for this axios
export default instance
