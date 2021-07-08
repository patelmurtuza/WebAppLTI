import axios from "axios";



const fetchdata = async() =>
{
    let a = await axios.get("http://localhost:3302/api/person") ;
    return a.data;
    
}

export default fetchdata;