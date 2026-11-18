import { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  src: string | null;
  caption: string;
  onClose: () => void;
}

export function LightboxModal({ src, caption, onClose }: LightboxModalProps) {
  useEffect(() => {
    if (!src) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#16191D]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white">
          <p className="truncate text-sm font-medium">{caption}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#0D0F12] p-3">
          <img
            src={src}
            alt={caption}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}
