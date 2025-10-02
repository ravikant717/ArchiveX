import React from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadButton = () => {
  return (
    <button type="button"  className='active:bg-green-600 flex bg-green-400 pt-2 pb-2 pl-4 pr-4 rounded-3xl'>
        <div className='pt-1.5 pr-3'>    
        <IoCloudUploadOutline/>
        </div>
        <p className='font-bold text-amber-50'>Upload</p>
    </button>
  )
}

export default UploadButton