import React, { useRef, useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadModal from './UploadModal';
import { SlCloudUpload } from "react-icons/sl";
import { useFileStore } from '../../store/fileStore';

const UploadButton = () => {
  const fileInputRef = useRef(null);
  const {uploadFile, uploading, error, successMsg} = useFileStore();
  const [selectedName, setSelectedName] = useState('');

  const handleClick = () => {
    fileInputRef.current.click();
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return; 
    if(file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit!");
      return; 
    }
    setSelectedName(file.name);
    uploadFile(file);
  }
  const [open, setOpen] = useState(false);
  return (

    <div>
      <button type="button" onClick = {() => setOpen(true)}  className='active:bg-green-600 cursor-pointer flex bg-green-400 pt-2 pb-2 pl-4 pr-4 rounded-3xl'>
          <div className='pt-1.5 pr-3'>
          <IoCloudUploadOutline/>
          </div>
          <p className='font-bold text-amber-50'>Upload</p>
      </button>
      <UploadModal open={open} onClose= {() => setOpen(false)}>        
        <div onClick={handleClick} className='bg-green-300 p-14 rounded-lg'>
          <p className='font-bold text-xl  text-black'>Upload your files</p>
          <div className='border-dashed border-2 text-blue-600 px-32 py-8 mx-4 my-8 flex flex-col items-center justify-center'>
            <SlCloudUpload className='text-4xl'/>
            <p className='pl-2'>Click to upload</p>
            <p className='text-xs'>Maximum file size: 5MB</p>
            <input 
              ref = {fileInputRef}
              type = "file"
              onChange = {handleFileChange}
              className='hidden'
            />

            {uploading && <p className='text-sm text-blue-800'>Uploading</p>}
            {successMsg && <p className='text-sm text-green-800'>{successMsg}</p>}
            {error && <p className='text-sm text-red-600 '>{error}</p>}
            {selectedName && !uploading && (
              <p className='text-sm text-gray-800 mt-1'>Uploaded: {selectedName}  </p>
            )}

          </div>
        </div>
      
      </UploadModal>
    </div>
  )
}

export default UploadButton