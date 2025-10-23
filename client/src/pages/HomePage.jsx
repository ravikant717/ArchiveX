import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const HomePage = () => {
    return (
    <div className='bg-amber-50 h-screen flex flex-col overflow-hidden'>
      <Navbar/>
      
      <div className='flex-1 flex'>
      <Sidebar/>
      <main className='flex-1 p-4 overflow-auto'>

        <Outlet/>
      </main>
      </div>
      

 
    </div>
  )
}

export default HomePage