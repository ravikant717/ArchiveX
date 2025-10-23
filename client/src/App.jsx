import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import HomeScreen from './components/Dashboard/HomeScreen'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import GifLoader from './components/GifLoader'
import Files from './components/Dashboard/Files'
import Labs from './components/Dashboard/Labs'

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
            <Route path="files" element={<Files />} />
            <Route path="labs" element={<Labs />} />
          </Route>
        <Route path ="/" element={<Navigate to ="/dashboard"/>}/>
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