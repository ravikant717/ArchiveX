import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { useAuthStore } from '../../store/authStore';

const LogoutButton = () => {
    const {logout} = useAuthStore();
  
    return (
    
            <button onClick={logout} className='cursor-pointer'> 
            <IoMdLogOut className='text-2xl text-green-700'/>
            </button>  )
}

export default LogoutButton