import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Create = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[age,setAge]=useState(0);
    const[error,setError]=useState("");
    const navigate = useNavigate();

    const handleNameChange =(e)=>{
        setName(e.target.value);

    }
    const handlesubmit=async (e)=>{
        e.preventDefault(); 
        const addUser={name,email,age};
        const response = await fetch("http://localhost:5000/api/user",{
            method: "POST",
            body: JSON.stringify(addUser),
            headers:{
                "Content-Type": "application/json",
            },

        });
        const result =await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
            
        }
        if(response.ok){
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge("");
            navigate("/all")

        }


    };
    
    console.log(name,email,age);

  return (
    <div className='Container my-2'>
        {error && <div className="alert alert-danger" role="alert">
       {error}
     
</div>}
        <h2>Enter the data</h2>
        
        <form onSubmit={handlesubmit}>
  
  <div className="mb-3">
    <label  htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" value={name} onChange={handleNameChange} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label  htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3">
    <label  htmlFor="exampleInputEmail1" className="form-label">Age</label>
    <input type="number" value={age} onChange={(e)=> setAge(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


    </div>
  )
}

export default Create