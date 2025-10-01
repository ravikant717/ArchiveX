import React from 'react'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'

const App = () => {
  const {user, authCheck} = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);
  return (
    <div className='bg-[#1E1F23] h-screen'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App