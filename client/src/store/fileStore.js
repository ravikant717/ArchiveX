import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useFileStore = create((set) => ({
  files: [],
  uploading: false,
  error: null,
  successMsg: null,

  fetching: false,
  uploadFile: async (file) => {
    try {
      set({ uploading: true, error: null, successMsg: null });
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/api/v1/file/upload", formData);

      set((state) => ({
        files: [response.data.file, ...state.files],
        uploading: false,
        successMsg: response.data.message || "File uploaded successfully!",
      }));
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload error");
      set({
        uploading: false,
        error: error.response?.data?.message || "File Upload failed",
      });
    }
  },
  downloadFile: async (fileId, filename) => {
    try {
      const response = await axios.get(
        `/api/v1/file/download/${fileId}`,
        {
          responseType: "blob",
        },
        { withCredentials: true }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  },

  fetchFiles: async () => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get("/api/v1/file/my-files", {
        withCredentials: true,
      });

      const data = res.data;
      set({ files: data.files || [], fetching: false });
    } catch (err) {
      console.error("Error fetching files: ", err);
      set({
        fetching: false,
        error: err.response?.data?.message || err.message || "Fetch failed",
      });
      toast.error(err.response?.data?.message || "Failed to fetch files");
    }
  },
  renameFile: async (fileId, filename) => {
    try {
      const response = await axios.post(
        `/api/v1/file/rename/${fileId}`,
        { newFilename: filename },
        { withCredentials: true }
      );

      const updatedFile = response.data.file;

      set((state) => {
        const filesCopy = [...state.files];
        const idx = filesCopy.findIndex((f) => f._id === fileId);
        if (idx !== -1) {
          filesCopy[idx] = updatedFile;
        }
        return { files: filesCopy };
      });
      toast.success("Renamed successfully");
    } catch (err) {
      console.error("Can't rename file", err);
      toast.error("Rename failed");
    }
  },
}));
