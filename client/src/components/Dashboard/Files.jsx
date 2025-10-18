import React, { useEffect, useState } from "react";
import { useFileStore } from "../../store/fileStore";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import FileMenu from "./FileMenu";

const Files = () => {
  const { files, fetching, error, fetchFiles} = useFileStore();
  const [openMenu, setOpenMenu] = useState(null);
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (fetching) return <p>Loading files...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {files.map((file) => (
        <div key={file._id} className="border p-3 rounded-xl">
          <Zoom>
            <img
              src={file.url}
              alt={file.filename}
              className="w-full h-40 object-cover rounded-lg cursor-pointer"
            />
          </Zoom>
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
  );
};

export default Files;
