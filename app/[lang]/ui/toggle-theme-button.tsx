'use client';

import { Button } from '@/ui/button';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '../theme';

export const ToggleThemeButton = ({ theme }: { theme: 'light' | 'dark' }) => (
  <Button
    variant='ghost'
    onClick={() => toggleTheme()}
    size='icon'
    className='transition-colors duration-500 ease-in-out'>
    {theme === 'light' ? <Sun /> : <Moon />}
  </Button>
);
