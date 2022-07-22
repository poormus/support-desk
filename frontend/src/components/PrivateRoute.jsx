import React from 'react'
//use rafce
import { Navigate,Outlet } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useAuthStatus } from '../hooks/UseAuthStatus'

const PrivateRoute = () => {

    const {loggedIn,chekingStatus}=useAuthStatus()

    if(chekingStatus){
        console.log('checking status...')
        return <div className='spinner'>
            <ClipLoader/>
        </div>
    }
  return loggedIn ? <Outlet/> :<Navigate to='/login'/>
}

export default PrivateRoute