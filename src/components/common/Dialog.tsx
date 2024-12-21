import { createContext, useContext, useState, ReactNode, FC } from 'react';
import Button from './Button';

interface DialogContextProps {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog 컴포넌트 내에서 사용해야 합니다.');
  }
  return context;
};

interface DialogProps {
  children: ReactNode;
}

const Dialog: FC<DialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps {
  children: ReactNode;
}

const DialogTrigger: FC<DialogTriggerProps> = ({ children }) => {
  const { openDialog } = useDialogContext();
  return <button onClick={openDialog}>{children}</button>;
};

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent: FC<DialogContentProps> = ({ children }) => {
  const { isOpen, closeDialog } = useDialogContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4">
        {children}
        <Button onClick={closeDialog}>닫기</Button>
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: ReactNode;
}

const DialogHeader: FC<DialogHeaderProps> = ({ children }) => {
  return <div className="mb-4 text-black">{children}</div>;
};

interface DialogTitleProps {
  children: ReactNode;
}

const DialogTitle: FC<DialogTitleProps> = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

interface DialogDescriptionProps {
  children: ReactNode;
}

const DialogDescription: FC<DialogDescriptionProps> = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription };
