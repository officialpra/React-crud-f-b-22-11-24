import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    // console.log(_id);

  }
  const { id } = useParams();
  console.log(id);
  const getSingleuser = async () => {
    const response = await fetch(`http://localhost:5000/api/user/${id}`);
    const result = await response.json();
    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
    if(!response.ok){
      setName("");
      setEmail("");
      setAge("");
    }
    // console.log(result);
  }
  const handleupdate = async (e) => {
    e.preventDefault();
    const datauser={name,email,age};
    const response = await fetch(`http://localhost:5000/api/user/${id}`,{
     
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(datauser),
      


  })
  if (response.ok) {
    navigate("/all")
  }
  


}

  //  getSingleuser();


  useEffect(() => {
    getSingleuser();

  }, [])




  return (

    <div>
      <h2>Enter the data</h2>

      <form onSubmit={handleupdate} >

        <div className="mb-3">
          <label  htmlFor="exampleInputPassword1" className="form-label">Name</label>
          <input type="text" value={name} onChange={handleNameChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label  htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label  htmlFor="exampleInputEmail1" className="form-label">age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>

  )
}

export default Update