import React from 'react'
import HomeScreen from '../components/Dashboard/HomeScreen';
import Login from '../components/Login';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const HomePage = () => {
    return (
    <div className='bg-amber-50 h-screen flex flex-col overflow-hidden'>
      <Navbar/>
      
      <div className='flex-1 flex border-5'>
      <Sidebar/>
      <main className='flex-1 p-4 border-5 overflow-auto'>

        <Outlet/>
      </main>
      </div>
      

 
    </div>
  )
}

export default HomePage