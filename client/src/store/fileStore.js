import { create } from "zustand";
import api from "../lib/api.js";
import toast from "react-hot-toast";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

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
      const response = await api.post("/api/v1/file/upload", formData);

      set((state) => ({
        files: [response.data.file, ...state.files],
        uploading: false,
        successMsg: response.data.message || "File uploaded successfully!",
      }));
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Upload error"));
      set({
        uploading: false,
        error: getErrorMessage(error, "File Upload failed"),
      });
    }
  },
  downloadFile: async (fileId, filename) => {
    try {
      const downloadPath = `/api/v1/file/download/${fileId}`;
      const baseUrl = api.defaults.baseURL || "";
      const downloadUrl = baseUrl
        ? new URL(downloadPath, baseUrl).toString()
        : downloadPath;

      const link = document.createElement("a"); //create anchor tag
      link.href = downloadUrl;
      if (filename) {
        link.setAttribute("download", filename); //make the a tag only downloadable
      }
      link.rel = "noreferrer";
      document.body.appendChild(link); //put the link in dom 
      link.click(); //click the link 
      link.remove(); //remove the link
    } catch (err) {
      console.error("Download failed:", err);
    }
  },

  fetchFiles: async () => {
    set({ fetching: true, error: null });
    try {
      const res = await api.get("/api/v1/file/my-files");

      const data = res.data;
      set({ files: data.files || [], fetching: false });
    } catch (err) {
      console.error("Error fetching files: ", err);
      set({
        fetching: false,
        error: getErrorMessage(err, "Fetch failed"),
      });
      toast.error(getErrorMessage(err, "Failed to fetch files"));
    }
  },
  renameFile: async (fileId, filename) => {
    try {
      const response = await api.post(`/api/v1/file/rename/${fileId}`, {
        newFilename: filename,
      });

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
