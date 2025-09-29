import React from 'react'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <div className='bg-[#1E1F23] h-screen'>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App