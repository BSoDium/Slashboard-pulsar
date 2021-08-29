declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        currentWindow: {
          minimize: () => void;
          maximize: () => void;
          close: () => void;
        };
        storage: {
          getServers: () => Promise<any>;
          addServer: (
            ip: string,
            port: string,
            auth: string,
            type: string
          ) => void;
          delServer: (id: string) => void;
        };
      };
    };
  }
}
export {};
