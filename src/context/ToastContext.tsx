import { createContext } from 'react';

type ToastType = 'success' | 'danger';

export interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

// Just the context
export const ToastContext = createContext<ToastContextProps | undefined>(undefined);
