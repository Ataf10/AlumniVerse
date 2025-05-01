import { createContext, useState, useContext } from "react";

const PendingContext = createContext();

export const usePending = () => useContext(PendingContext);

export const PendingProvider = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);

  return (
    <PendingContext.Provider value={{ pendingCount, setPendingCount }}>
      {children}
    </PendingContext.Provider>
  );
};
