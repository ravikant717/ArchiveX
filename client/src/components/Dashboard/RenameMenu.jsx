import React, { useState } from 'react'
import { useFileStore } from '../../store/fileStore';

const RenameMenu = ({id, close, closed}) => {

  const {renameFile} = useFileStore();
  const [newName, setNewName] = useState("")
  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if(newName.trim() !== "") {
        renameFile(id, newName);
        close(false);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Rename File</h2>
            <form onSubmit={handleRenameSubmit}>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded mb-4"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  onClick={() => {close(false)
                    closed(null)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Rename
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default RenameMenu