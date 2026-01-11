"use client";

import { useState, useEffect } from "react";
import { Modal } from "./ui/modal";

interface TaskEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

export function TaskEditorModal({ isOpen, onClose, onSave }: TaskEditorModalProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Mission">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Task Description</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-[#2d3a3f] text-white border border-[#37464a] rounded-lg p-3 outline-none focus:border-[#ff8154] transition-colors"
            placeholder="e.g. Complete Lab 3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#ff8154] text-[#253034] px-6 py-2 rounded-lg font-bold hover:bg-[#ff9f7c] transition-colors"
          >
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}
