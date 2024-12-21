import { createContext, useContext, useState, ReactNode, FC } from 'react';
import Button from './Button';
import { cn } from '../../utils/utils';

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
  className?: string;
}

const DialogTrigger: FC<DialogTriggerProps> = ({ children, className }) => {
  const { openDialog } = useDialogContext();
  return (
    <div onClick={openDialog} className={cn(className)}>
      {children}
    </div>
  );
};

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

const DialogContent: FC<DialogContentProps> = ({ children, className }) => {
  const { isOpen, closeDialog } = useDialogContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4',
        className
      )}
    >
      <div className="m-4 flex w-full flex-col rounded-md bg-white p-4 transition-all md:max-w-md">
        {children}
        <Button onClick={closeDialog}>닫기</Button>
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

const DialogHeader: FC<DialogHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-center text-black sm:text-left', className)}>
      {children}
    </div>
  );
};

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

const DialogTitle: FC<DialogTitleProps> = ({ children, className }) => {
  return <h2 className={cn('text-lg font-bold', className)}>{children}</h2>;
};

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

const DialogDescription: FC<DialogDescriptionProps> = ({ children, className }) => {
  return <div className={cn('text-sm text-gray-600', className)}>{children}</div>;
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription };
