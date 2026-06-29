import { useState, type PropsWithChildren } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileNavigation } from './MobileNavigation';
import { IconX } from '@/shared/components/ui/icons';

export function AppShell({ children }: PropsWithChildren) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-app-bg">
      {/* Desktop + Tablet Sidebar */}
      <Sidebar />

      {/* Mobile drawer */}
      <Transition show={mobileMenuOpen} as="div">
        <Dialog onClose={() => setMobileMenuOpen(false)} className="relative z-300 md:hidden">
          {/* Overlay */}
          <TransitionChild
            enter="transition-opacity duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </TransitionChild>

          {/* Drawer panel */}
          <TransitionChild
            enter="transition-transform duration-200 ease-out"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-150 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 flex w-64 flex-col">
              {/* Close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-control text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <IconX size={18} />
              </button>
              <Sidebar mobileMode onClose={() => setMobileMenuOpen(false)} />
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Desktop header */}
        <TopHeader />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 xl:px-8">{children}</div>
        </main>

        {/* Mobile bottom navigation */}
        <MobileNavigation />
      </div>
    </div>
  );
}
