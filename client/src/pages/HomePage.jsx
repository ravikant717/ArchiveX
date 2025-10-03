import React from 'react'
import HomeScreen from '../components/HomeScreen';
import Login from '../components/Login';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const HomePage = () => {
    return (
    <div className='bg-amber-50 h-screen overflow-hidden'>
      
      <Navbar/>
      <Sidebar/>
      </div>
  )
}

export default HomePage