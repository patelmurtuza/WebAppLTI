import axios from "axios";



const deleteData = async(data) =>
{
    delete data.tableData;
    let a = await axios.delete("http://localhost:3302/api/person",{
        data: data
    },
    {
        headers: {
            "Content-Type": "application/json"
        },
    });
    return true;
    
}

export default deleteData;