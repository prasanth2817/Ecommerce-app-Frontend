import React from 'react'
import { useNavigate } from 'react-router-dom'
function useLogout() {
    let navigate = useNavigate()
  return ()=>{
    sessionStorage.clear()
   console.log("User Logout Successfull")
    navigate('/')
  }
}

export default useLogout