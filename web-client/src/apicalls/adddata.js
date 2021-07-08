import axios from "axios";



const addData = async(data) =>
{
    delete data.tableData;
    console.log(data)
    try 
    {
        await axios.post("http://localhost:3302/api/person",{
            name:data.name,
            balance:data.balance,
            email_id:data.email_id,
            person_id:data.person_id
        },
        {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return true;
    }
    catch (e)
    {
        return false;
    }
  
    
}

export default addData;