import React from 'react'

const SearchBar = () => {
  return (
    <div className='bg-white px-3 py-2 rounded-3xl'>
        <input type='text' className='w-full outline-none text-black bg-transparent' placeholder='Search here'></input>
    </div>
  )
}

export default SearchBar