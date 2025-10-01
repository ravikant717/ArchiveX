import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router'
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <div className='flex items-center justify-center h-screen bg-cover bg-center'>
      <div className='p-8 glass w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-10'>Login</h1>
        <form onSubmit={handleLogin}>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

        <input
          type="password"
          placeholder='Enter your password'
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <div className='flex justify-end mb-4'>
        <Link to="/forgot-password" className="text-sm text-white hover:drop-shadow-blue-500">Forgot Password?</Link>

        </div>
        <button type="submit" className='bg-white text-black font-bold p-4  rounded hover:bg-cyan-300 w-full'>Login</button>
          </form>
      </div>
    </div>
  )
}

export default Login
