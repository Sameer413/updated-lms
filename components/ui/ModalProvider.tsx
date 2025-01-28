"use client";
import React, {
  FC,
  ReactNode,
  useState,
  createContext,
  useContext,
} from "react";

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal msust be used within a ModalProvider");
  }
  return context;
};

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    console.log("his");

    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modalContent && (
        <div className="fixed top-0 z-50 bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none lg:w-1/3">
            {modalContent}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
