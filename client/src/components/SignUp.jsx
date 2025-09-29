import React from 'react'

const SignUp = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-cover bg-center'>
      <div className='p-8 glass w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-10'>Signup</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
        />

        <input
          type="password"
          placeholder='Enter your password'
          className="w-full pb-2 bg-transparent border-b border-white/50 text-white placeholder-white/70 mb-6 focus:outline-none focus:border-white"
        />
  
        <button className='bg-white text-black font-bold p-4  rounded hover:bg-cyan-300 w-full'>Signup</button>
      </div>
    </div>
  )
}

export default SignUp