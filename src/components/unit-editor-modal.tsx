"use client";

import { useState, useEffect } from "react";
import { Modal } from "./ui/modal";
import { Unit } from "@/types";

interface UnitEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, type: Unit["type"]) => void;
  initialData?: { title: string; type: Unit["type"] };
}

export function UnitEditorModal({ isOpen, onClose, onSave, initialData }: UnitEditorModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Unit["type"]>("academic");

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "");
      setType(initialData?.type || "academic");
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, type);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Unit" : "New Unit"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Unit Name</label>
          <input
            autoFocus
            type="text"
            className="w-full bg-[#2d3a3f] text-white border border-[#37464a] rounded-lg p-3 outline-none focus:border-[#ff8154] transition-colors"
            placeholder="e.g. Advanced Algorithms"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
          <div className="grid grid-cols-3 gap-3">
            {(["academic", "portfolio", "life"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`p-2 rounded-lg text-sm font-bold capitalize border-2 transition-all ${
                  type === t
                    ? "border-[#ff8154] bg-[#ff8154]/10 text-[#ff8154]"
                    : "border-[#37464a] bg-[#2d3a3f] text-gray-500 hover:border-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#ff8154] text-[#253034] px-6 py-2 rounded-lg font-bold hover:bg-[#ff9f7c] transition-colors"
          >
            Save Unit
          </button>
        </div>
      </form>
    </Modal>
  );
}
