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
}));
