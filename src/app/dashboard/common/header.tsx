'use client';

import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className='flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm dark:bg-gray-900'>
      {/* Left side: Logo + Menu */}
      <div className='flex items-center gap-3'>
        {/* <Button
          variant='ghost'
          size='icon'
        >
          <Menu className='h-5 w-5' />
        </Button> */}
        <LayoutDashboard className='h-6 w-6 text-primary' />
        <span className='font-bold text-lg'>My Wallet</span>
      </div>

      {/* Right side: Actions */}
      <div className='flex items-center gap-4'>
        {/* Dark mode toggle */}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Sun className='h-5 w-5' />
          ) : (
            <Moon className='h-5 w-5' />
          )}
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='icon'
            >
              <User className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className='text-red-500'>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
