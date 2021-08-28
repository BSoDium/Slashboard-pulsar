declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
      };
    };
  }
}
export {};
