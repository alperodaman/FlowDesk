import { Fragment, type ReactNode } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { IconX } from './icons';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ open, onClose, title, children, footer, size = 'md' }: ModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-400">
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </TransitionChild>

        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="transition-all duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={`relative w-full rounded-card bg-surface shadow-modal ${sizeClasses[size]}`}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <DialogTitle className="text-base font-semibold text-ink">{title}</DialogTitle>
                  <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-app-bg hover:text-ink"
                    aria-label="Close"
                  >
                    <IconX size={16} />
                  </button>
                </div>
              )}

              {/* Body */}
              <div className="p-5">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
                  {footer}
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
