import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';




const Read = () => {
    const[data,setData]=useState();
    const[error,setError]=useState("");

   async function showdata(){

        const response= await fetch("http://localhost:5000/api/user");
        const result= await response.json();
        
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok){
            setData(result);
            

        }

    }
   async function handledelete(id){
         
        const response= await fetch(`http://localhost:5000/api/user/${id}`, {
          method: "DELETE",

        });
        const result= await response.json();
        if(!response.ok){
            setError(response.error);

        }
        if(response.ok){
            // setError("");
            setError("Deleted successfully");
           setTimeout(()=>{
            setError("");
            showdata();
            

           }, 1000);

        }


    }
    useEffect(()=>{
        showdata();

        

    },[])
    // console.log(data);
  return (
    
    <div className='container my-2'>
        {error && <div className="alert alert-danger" role="alert">
       {error}
     
</div>}

    <h2 className='text-center'>All Data</h2>
    

    <div className='row'>
        {data?.map((ele) => (
            <div className='col-3' key={ele._id}>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{ele.name}</h5> {/* Assuming 'name' is the property */}
                        <h6 className='card-subtitle mb-2 text-muted'>{ele.email}</h6> {/* Assuming 'email' is the property */}
                        <p className='text-muted'>Age: {ele.age}</p> {/* Assuming 'age' is the property */}
                        <a href='#' onClick={()=>handledelete(ele._id)} className='card-link'>Delete</a>
                        <br />
                        <Link to={`/${ele._id}`} className='card-link'>Edit</Link>

                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

  )
}

export default Read