import React from 'react'
import { useAuthStore } from '../store/authStore';
import HomeScreen from '../components/HomeScreen';
import Login from '../components/Login';

const HomePage = () => {
    const {user} = useAuthStore();
    return (
    <div>{user ? <HomeScreen/> : <Login/>}</div>
  )
}

export default HomePage