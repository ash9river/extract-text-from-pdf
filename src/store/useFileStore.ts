/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface FileStore {
  fileData: any;
  textData: any;
  resultData: Array<Array<Array<string>>>;
  setFileData: (fileData: any) => void;
  setTextData: (textData: any) => void;
  setResultData: (resultData: any) => void;
}

const useFileStore = create<FileStore>((set) => ({
  fileData: null,
  textData: null,
  resultData: [],
  setFileData: (fileData) => set({ fileData }),
  setTextData: (textData) => set({ textData }),
  setResultData: (resultData) => set({ resultData }),
}));

export default useFileStore;
