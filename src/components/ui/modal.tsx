import { X } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1e272b] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-[#37464a] transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
