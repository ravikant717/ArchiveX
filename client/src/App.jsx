import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import HomeScreen from './components/Dashboard/HomeScreen'
import Academic from './components/Dashboard/Academic'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import GifLoader from './components/GifLoader'

const App = () => {
  const {user, isCheckingAuth, authCheck} = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth) {
    return (
      <div className='h-screen'>
        <GifLoader/>
      </div>

    )
  }
  return (
    <div className='bg-[#1E1F23] h-screen'>
      <Routes>
          <Route path="/dashboard" element={user ? <HomePage />: <Navigate to="/login"/>}>
            <Route index element={<HomeScreen />} />
            <Route path="academic" element={<Academic />} />
          </Route>
   
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
/>
        <Route path="/signup" element={!user ? <SignupPage />: <Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App