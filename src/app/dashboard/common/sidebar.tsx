'use client';

import React from 'react';
import { Home, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // shadcn helper (make sure you have this)
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'flex h-screen w-64 flex-col border-r bg-background px-4 py-6 shadow-sm',
        className
      )}
    >
      {/* Navigation */}
      <nav className='flex-1 space-y-2'>
        <Link href='/dashboard'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-left'
          >
            <Home className='h-5 w-5' />
            Dashboard
          </Button>
        </Link>

        <Link href='/dashboard/sources'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-left'
          >
            <LayoutDashboard className='h-5 w-5' />
            Income Sources
          </Button>
        </Link>

        <Link href='/dashboard/expenses'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-left'
          >
            <LayoutDashboard className='h-5 w-5' />
            Expenses
          </Button>
        </Link>

        <Link href='/dashboard/settings'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-left'
          >
            <Settings className='h-5 w-5' />
            Settings
          </Button>
        </Link>
      </nav>

      {/* Footer (logout) */}
      <div className='mt-auto'>
        <Button
          variant='destructive'
          className='w-full justify-start gap-2 text-left'
        >
          <LogOut className='h-5 w-5' />
          Logout
        </Button>
      </div>
    </aside>
  );
};
