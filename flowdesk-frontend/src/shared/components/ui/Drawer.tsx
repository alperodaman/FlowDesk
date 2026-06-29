import { Fragment, type ReactNode } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { IconX } from './icons';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  width = 'w-80',
}: DrawerProps) {
  const isLeft = side === 'left';

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-300">
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

        <div className={`fixed inset-y-0 flex ${isLeft ? 'left-0' : 'right-0'}`}>
          <TransitionChild
            as={Fragment}
            enter="transition-transform duration-250"
            enterFrom={isLeft ? '-translate-x-full' : 'translate-x-full'}
            enterTo="translate-x-0"
            leave="transition-transform duration-150"
            leaveFrom="translate-x-0"
            leaveTo={isLeft ? '-translate-x-full' : 'translate-x-full'}
          >
            <DialogPanel className={`flex ${width} flex-col bg-surface shadow-modal`}>
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
                {title ? (
                  <DialogTitle className="text-base font-semibold text-ink">{title}</DialogTitle>
                ) : (
                  <span />
                )}
                <button
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-app-bg hover:text-ink"
                  aria-label="Close"
                >
                  <IconX size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="flex shrink-0 justify-end gap-3 border-t border-border px-5 py-4">
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
