import React from 'react'
import { useAuthStore } from '../store/authStore';

const HomeScreen = () => {
  const {logout} = useAuthStore();
  return (
    <div>
        <button className='bg-blue-400' onClick={logout}>Logout</button>
    </div>
  )
}

export default HomeScreen