import React, { useState } from 'react'
import { useFileStore } from '../../store/fileStore'
import RenameMenu from './RenameMenu';

const FileMenu = ({id, name, closed}) => {

  const {downloadFile} = useFileStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

    
    return (
        <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg border z-10">
            <button
                className="block px-6 py-2 text-sm  hover:bg-green-300  w-full text-left"
                onClick = {() => {setIsModalOpen(true) 

                } }
            >
                  Rename
                </button>
                <button
                  className="block px-6 py-2 text-sm hover:bg-green-300 w-full text-left"
                  onClick={() => {downloadFile(id, name)
                    closed(null)
                  }}
                >
                  Download
                </button>

                {isModalOpen && (
                    <RenameMenu id = {id} close = {setIsModalOpen} closed={closed}/>
                )}
              </div>
  )
}

export default FileMenu