import React, { useEffect } from "react";
import { useFileStore } from "../../store/fileStore";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Files = () => {
  const { files, fetching, error, fetchFiles } = useFileStore();

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
          <p className="mt-2 text-center font-medium">{file.filename}</p>
        </div>
      ))}
    </div>
  );
};

export default Files;
