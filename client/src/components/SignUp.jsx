import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {signup} = useAuthStore();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, password, username });
    navigate('/dashboard');

  }
  return (
    <div className='flex items-center justify-center h-screen bg-cover bg-center'>
      <div className='p-8 glass w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-10'>Signup</h1>
        <form onSubmit = {handleSignUp}>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <input
          type="email"
          placeholder="Email"
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <input
          type="password"
          placeholder='Enter your password'
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <button type="submit" className='bg-white text-black font-bold p-4  rounded hover:bg-cyan-300 w-full'>Signup</button>
          </form>
      </div>
    </div>
  )
}

export default SignUp