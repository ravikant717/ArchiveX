import React from 'react'
import { CiUser } from "react-icons/ci";

const SignedInUser = () => {
  return (
    <div className='flex gap-4'>
         <div className='pl-4 pt-4.5'>  
         <CiUser className='size-8'/>
         </div>
         <div className='w-50 pt-3'>
            <p className='text-black 1.5 font-gojo'>Ravikant Munda</p>
            <p className='text-black size-1.5 font-gojo'>ravi@gmail.com</p>
         </div>
    </div>
  )
}

export default SignedInUser