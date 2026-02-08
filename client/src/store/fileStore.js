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
      // Use axios to download file with proper error handling
      const response = await api.get(`/api/v1/file/download/${fileId}`, {
        responseType: 'blob',
      });

      // Create a blob URL from the response, preserving content type
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const blob = new Blob([response.data], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.remove();
      // Revoke blob URL after brief delay to allow browser to start download
      const BLOB_REVOKE_DELAY_MS = 100;
      setTimeout(() => URL.revokeObjectURL(blobUrl), BLOB_REVOKE_DELAY_MS);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error(getErrorMessage(err, "Download failed"));
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
