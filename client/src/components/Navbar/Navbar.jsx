import React from 'react'
import UploadButton from './UploadButton';
import LogoutButton from './LogoutButton';
import BrandingLogo from './BrandingLogo';
import SearchBar from './SearchBar';
const Navbar = () => {
  return (
    <div>
        <div className='flex items-center justify-between px-6 py-3 bg-lime-300 text-white'>
            <div className='flex-shrink-0'>
            <BrandingLogo/>
            </div>
            <div className='flex-grow mx-50'>
            <SearchBar/>
            </div>
            <div className='flex items-center gap-4'>   
            <UploadButton/>
            <LogoutButton/>

            </div>
        </div>
    </div>
  )
}

export default Navbar