import React from 'react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="w-full space-y-6">
        {children}
      </div>
    </div>
  );
}
