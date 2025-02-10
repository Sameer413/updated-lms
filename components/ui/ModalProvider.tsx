"use client";
import React, {
  FC,
  ReactNode,
  useState,
  createContext,
  useContext,
} from "react";
import { AnimatePresence, motion } from "motion/react";

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
      <AnimatePresence>
        {modalContent && (
          <div
            className="fixed top-0 z-50 bg-black bg-opacity-50 h-full w-full flex items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0 }} // Start from bottom
              animate={{ y: 0, opacity: 1 }} // Move to the center
              exit={{ y: "100vh", opacity: 0 }} // Exit to bottom
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none lg:w-1/3"
              onClick={(e) => e.stopPropagation()}
            >
              {modalContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
