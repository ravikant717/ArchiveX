import React, { useEffect, useState } from "react";
import { useFileStore } from "../../store/fileStore";
import FileMenu from "./FileMenu";

const Files = () => {
  const { files, fetching, error, fetchFiles} = useFileStore();
  const [openMenu, setOpenMenu] = useState(null);
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (fetching) return <p>Loading files...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const getExtension = (name) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-3 gap-4">
      {files.map((file) => (
        <div key={file._id} className="border p-3 rounded-xl">
          <div className="w-full h-40 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">
              {getExtension(file.filename)}
            </span>
          </div>
          <div className="flex relative items-center mt-2">
            <p className="w-[90%] text-center font-medium">{file.filename}</p>
            <div className="absolute right-0">
              <button
                className="text-xl font-bold cursor-pointer"
                onClick={() => setOpenMenu(openMenu === file._id ? null: file._id)}
              >
                ⋯
              </button>
            </div>
            {openMenu === file._id && (
              <FileMenu name={file.filename} id={file._id} closed={setOpenMenu}/>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Files;
