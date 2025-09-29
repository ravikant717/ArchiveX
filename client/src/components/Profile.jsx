import React from 'react'

const Profile = () => {
  return (
    <div className='text-white font-gojo '>
       

        <div className='flex gap-4 ml-32 pt-32 align-items justify-center'>
            <div className='border p-4 border-[#3A3C40] mr-10 rounded-md'>
                <h1 className='text-center  text-[#A6EC87] text-2xl font-bold mb-4'>Ravikant Munda</h1>

                <img className='rounded-full border-8 border-blue-200'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZirTv3YUaHSe-VVIQzwXUHXxb8mnJ-krbg&s" alt="Profile" />
            </div>

            <div className='border-2 rounded-md p-4 border-amber-100'>
                <div className='p-2 mb-2'>
                    <h1 className='text-blue-400'>Name</h1>
                    <p>Ravikant Munda</p>
                </div>
                <div className='p-2 mb-2'>
                    <h1 className='text-blue-400'>Email Address</h1>
                    <p>ravikant@example.com</p>
                </div>
                <div className='p-2 mb-2'>
                    <h1 className='text-blue-400'>Phone Number</h1>
                    <p>(123) 456-7890</p>
                </div>
                <div className='p-2 mb-2'>
                    <h1 className='text-blue-400'>User Since</h1>
                    <p>January 1, 2020</p>
                </div>

            </div>
        </div>
        



    </div>
  )
}

export default Profile