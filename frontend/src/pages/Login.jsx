import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/AuthSlice'



function Login() {
const [formData,setFormData]=useState({
 
  email:'',
  password:'',
  
})

const {email,password}=formData

const dispatch=useDispatch()
//we use this to bring values from global state
const {user,isSuccess,isError,isLoading,message} =useSelector(state=>state.auth)

const navigate=useNavigate()

useEffect(() => {
  if (isError) {
    toast.error(message);
  }
  if (isSuccess || user) {
    navigate("/");
  }
  dispatch(reset());
}, [user, isError, isSuccess, dispatch, message, navigate]);


const onChange=(e)=>{
  setFormData((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}

const onSubmit=(e)=>{
  e.preventDefault()
  const userData={email,password}
  dispatch(login(userData))
}



  return (
    <>
    <section className="heading">
          <h1>
            <FaUser/>Log - In
          </h1>
          <p>Log in to your account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        

        <div className="form-group">
          <input required type="email" className="form-control"  id='email' name='email' value={email} onChange={onChange} placeholder='Enter your email'/>
        </div>

        <div className="form-group">
          <input required type="password" className="form-control"  id='password' name='password' value={password} onChange={onChange} placeholder='Enter your password'/>
        </div>
        <div className="form-group-margin">
          <button className="button btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login