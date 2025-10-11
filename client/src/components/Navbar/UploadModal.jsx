import React from 'react'
import { IoClose } from "react-icons/io5";

const UploadModal = ({open, onClose, children}) => {
  return (
    <div onClick={onClose} className={`fixed text-center inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20": "invisible"}`}>
        <div onClick={e => e.stopPropagation()} className={`bg-white relative rounded-xl shadow-p-6 transition-all ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}`}>
            <button onClick={onClose} className='absolute top-2 right-2 p-1 rounded-lg hover:scale-125 hover:text-red-500 transition-transform text-gray-400'>
                <IoClose className='size-8'/>
            </button>
            {children} 
        </div>
    </div>
  )
}

export default UploadModal